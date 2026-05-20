import axios from "axios";

const API = axios.create({
  baseURL: "https://mindcare-ai-3l53.onrender.com",
});

export const predictMentalHealth = (data) =>
  API.post("/predict", data);
