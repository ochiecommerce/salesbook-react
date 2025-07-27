import { apiClient } from "./auth";
import { parseParams } from "./core";

export const createMarket = (data) =>
  apiClient.post("/api/market/markets/", data);

export const getMarkets = (filters)=>apiClient.get('/api/market/markets/?'+parseParams(filters))
export const createStore = (data) =>
  apiClient.post("/api/market/orders/", data);


export const getStores = (filters)=>apiClient.get('/api/market/stores/?'+parseParams(filters))

export const createProduct = (data)=>apiClient.post('/api/market/products/',data)

export const getProducts = (filters)=>apiClient.get('/api/market/products/'+parseParams(filters))