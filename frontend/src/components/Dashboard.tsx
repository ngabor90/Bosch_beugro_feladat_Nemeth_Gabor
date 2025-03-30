import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const defaultInterval = { from: '2025-01-01 00:00:00', to: '2025-04-01 23:59:59' };
  const [paretoData, setParetoData] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);
  const [interval, setInterval] = useState(defaultInterval);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; id: number } | null>(null);
  const [selectedProductState, setSelectedProductState] = useState<any>(null);
  const [selectedMachine, setSelectedMachine] = useState<number | null>(null);

  // API hívások
  const fetchData = useCallback(async () => {
    try {
      const [paretoResponse, productResponse, machineResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/pareto-success', { params: { from: interval.from, to: interval.to, machine: selectedMachine || undefined } }),
        axios.get('http://127.0.0.1:8000/api/products'),
        axios.get('http://127.0.0.1:8000/api/machines'),
      ]);

      setParetoData(paretoResponse.data);
      setProducts(productResponse.data);
      setMachines(machineResponse.data);
    } catch (error) {
      console.error('Hiba történt az adatok lekérése közben:', error);
    }
  }, [interval, selectedMachine]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Termék kiválasztása
  const handleProductSelect = (productName: string, productId: number) => {
    setSelectedProduct({ name: productName, id: productId });
  };

  // Kiválasztott termék adatainak lekérése
  useEffect(() => {
    const fetchProductData = async () => {
      if (!selectedProduct) return;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pareto/${selectedProduct.id}`, {
          params: { from: interval.from, to: interval.to, machine: selectedMachine || undefined },
        });
        setSelectedProductState(response.data || { success: 0, warning: 0, error: 0 });
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

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-5'>Pareto Leaderboard - Üdítők listája</h2>

      <div className="row bg-primary py-3 mt-3 rounded">
        {/* Szűrők */}
        <div className="col-md-6">
          <label className='form-label'>
            Időszak intervallum:
            <input className='form-control mt-2' type="datetime-local" value={interval.from} onChange={(e) => setInterval({ ...interval, from: e.target.value })} />
            <input className='form-control mt-2' type="datetime-local" value={interval.to} onChange={(e) => setInterval({ ...interval, to: e.target.value })} />
          </label>
        </div>

        {/* Gépszűrő */}
        <div className='col-md-6'>
          <label className='form-label'>
            Válasszon gépet:
            <select className='form-select mt-2' onChange={(e) => setSelectedMachine(e.target.value ? parseInt(e.target.value) : null)} value={selectedMachine || ''}>
              <option value="">Összes gép</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>{machine.machine_name}</option>
              ))}
            </select>
          </label>
          {/* Reset gomb */}
          <div className="mt-1">
            <button className="btn btn-light" onClick={resetToDefault}>Alapállapot</button>
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
                  <div key={product.id} className={`leaderboard-card ${selectedProduct?.name === product.product_name ? 'selected' : ''}`} onClick={() => handleProductSelect(product.product_name, product.id)}>
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
          <h3 className='mb-3 text-center'>Kiválasztott termék: {selectedProduct.name}</h3>
          <div className="row text-center">
            <div className="col-md-4 mt-2">
              <h5>Visszavitt:</h5>
              <p>{selectedProductState.success} db</p>
            </div>
            <div className="col-md-4 mt-2">
              <h5>Figyelmeztetés:</h5>
              <p>{selectedProductState.warning} db</p>
            </div>
            <div className="col-md-4 mt-2">
              <h5>Hiba:</h5>
              <p>{selectedProductState.error} db</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
