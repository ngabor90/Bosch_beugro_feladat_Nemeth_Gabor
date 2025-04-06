import axios from 'axios';

// API alap URL beállítása Vite környezetben
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Axios alapértelmezett beállítások
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API hívás
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Hiba történt a termékek lekérése közben:', error);
    throw error;
  }
};

export const fetchMachines = async () => {
  try {
    const response = await axiosInstance.get('/machines');
    return response.data;
  } catch (error) {
    console.error('Hiba történt a gépek lekérése közben:', error);
    throw error;
  }
};

export const fetchParetoData = async (from: string, to: string, selectedMachine: number | null) => {
  try {
    const response = await axiosInstance.get('/pareto-success', {
      params: { from, to, machine: selectedMachine || undefined },
    });
    return response.data;
  } catch (error) {
    console.error('Hiba történt a pareto adatok lekérése közben:', error);
    throw error;
  }
};

export const fetchProductState = async (productId: number, from: string, to: string, selectedMachine: number | null) => {
  try {
    const response = await axiosInstance.get(`/pareto/${productId}`, {
      params: { from, to, machine: selectedMachine || undefined },
    });
    return response.data;
  } catch (error) {
    console.error('Hiba történt a termék állapotának lekérése közben:', error);
    throw error;
  }
};
