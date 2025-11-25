import axios from "./config";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface CoinPayload {
  coin_name: string;
  symbol: string;
  notes?: string;
  price: any;
  change: any;
}

export const login = (data: LoginPayload) => axios.post("/login", data);
export const signup = (data: SignupPayload) => axios.post("/signup", data);

export const getProfile = () => axios.get("/profile");
export const updateProfile = (data: SignupPayload) => axios.put("/profile", data);

export const fetchWatchlist = () => axios.get("/watchlist/");
export const addCoin = (data: CoinPayload) => axios.post("/watchlist/", data);
export const updateCoin = (id: number, data: CoinPayload) =>
  axios.put(`/watchlist/${id}`, data);
export const deleteCoin = (id: number) => axios.delete(`/watchlist/${id}`);

