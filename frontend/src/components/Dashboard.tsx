import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchMachines, fetchParetoData, fetchProductState } from '../services/api';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCashRegister, faTrashArrowUp, faCheck, faExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Típusok
interface Product {
  id: number;
  product_name: string;
}

interface Machine {
  id: number;
  machine_name: string;
}

interface ParetoData {
  [key: number]: number;
}

interface ProductState {
  success: number;
  warning: number;
  error: number;
}

const Dashboard = () => {
  const defaultInterval = { from: '2025-01-01 00:00:00', to: '2025-04-01 23:59:59' };
  const [paretoData, setParetoData] = useState<ParetoData>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [interval, setInterval] = useState(defaultInterval);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductState, setSelectedProductState] = useState<ProductState | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<number | null>(null);

  const navigate = useNavigate(); // A navigate hook inicializálása

  // API hívások
  const fetchData = useCallback(async () => {
    try {
      const paretoResponse = await fetchParetoData(interval.from, interval.to, selectedMachine);
      const productResponse = await fetchProducts();
      const machineResponse = await fetchMachines();

      setParetoData(paretoResponse);
      setProducts(productResponse);
      setMachines(machineResponse);
    } catch (error) {
      console.error('Hiba történt az adatok lekérése közben:', error);
    }
  }, [interval, selectedMachine]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Termék kiválasztása
  const handleProductSelect = (productId: number) => {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
    }
  };

  // Kiválasztott termék adatainak lekérése
  useEffect(() => {
    const fetchProductData = async () => {
      if (!selectedProduct) return;

      try {
        const productState = await fetchProductState(selectedProduct.id, interval.from, interval.to, selectedMachine);
        setSelectedProductState(productState || { success: 0, warning: 0, error: 0 });
      } catch (error) {
        console.error('Hiba történt a termék adatok lekérése közben:', error);
      }
    };

    fetchProductData();
  }, [selectedProduct, interval, selectedMachine]);

  // Alapállapot visszaállítása
  const resetToDefault = () => {
    setInterval(defaultInterval);
    setSelectedProduct(null);
    setSelectedProductState(null);
    setSelectedMachine(null);
  };

  // Kijelentkezés
  const handleLogout = () => {
    // Token törlés a localStorage-ból
    localStorage.removeItem("auth_token");

    // Navigálás a login oldalra
    navigate("/login");
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-5'>Pareto Leaderboard - Üdítők listája</h2>

      <div className="row bg-primary py-3 mt-3 rounded text-white">
        {/* Szűrők */}
        <div className="col-md-6">
          <label className='form-label'>
            Időszak intervallum:
            <FontAwesomeIcon className='px-2' icon={faCalendarDays} />
            <input className='form-control mt-2' type="datetime-local" value={interval.from} onChange={(e) => setInterval({ ...interval, from: e.target.value })} />
            <input className='form-control mt-2' type="datetime-local" value={interval.to} onChange={(e) => setInterval({ ...interval, to: e.target.value })} />
          </label>
        </div>

        {/* Gépszűrő */}
        <div className='col-md-6'>
          <label className='form-label text-white'>
            Válasszon gépet:
            <FontAwesomeIcon className='px-2' icon={faCashRegister} />
            <select className='form-select mt-2' onChange={(e) => setSelectedMachine(e.target.value ? parseInt(e.target.value) : null)} value={selectedMachine || ''}>
              <option value="">Összes gép</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>{machine.machine_name}</option>
              ))}
            </select>
          </label>
          {/* Reset gomb */}
          <div className="mt-1">
            <button className="btn btn-warning" onClick={resetToDefault}>Alapállapot
              <FontAwesomeIcon className='px-3' icon={faTrashArrowUp} />
            </button>

            {/* Kijelentkezés gomb */}
            <button className="btn btn-danger custom-logout-btn" onClick={handleLogout}>
              Kijelentkezés
            </button>

          </div>
        </div>
      </div>

      {/* Pareto Leaderboard */}
      <div className="col-12 my-4">
        <h3>Visszavitt Termékek Darabszámai</h3>
        <div className="leaderboard text-center mt-5">
          {products.length > 0 && (
            <div className="leaderboard-cards">
              {products.map((product) => {
                const quantity = paretoData[product.id] || 0;

                return (
                  <div key={product.id} className={`leaderboard-card ${selectedProduct?.id === product.id ? 'selected' : ''}`} onClick={() => handleProductSelect(product.id)}>
                    <h4 className='product-name'>{product.product_name}</h4>
                    <p>{quantity} db</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Kiválasztott termék részletei külön containerben */}
      {selectedProduct && selectedProductState && (
        <div className="container bg-primary text-white py-5 mt-5 rounded">
          <h3 className='mb-3 text-center'>Kiválasztott termék: {selectedProduct.product_name}</h3>
          <div className="row text-center">
            <div className="col-md-4 mt-4">
              <h5>Visszavitt</h5>
              <p>{selectedProductState.success} db</p>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="col-md-4 mt-4">
              <h5>Figyelmeztetés</h5>
              <p>{selectedProductState.warning} db</p>
              <FontAwesomeIcon icon={faExclamation} />
            </div>
            <div className="col-md-4 mt-4">
              <h5>Hiba</h5>
              <p>{selectedProductState.error} db</p>
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Dashboard;
