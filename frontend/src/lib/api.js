import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = {
  // Get all content
  getContent: () => axios.get(`${API}/content`).then(r => r.data),

  // Update site content (brand, hero, about, services section, contact)
  updateContent: (data) => axios.put(`${API}/content`, data).then(r => r.data),

  // Services CRUD
  getServices: () => axios.get(`${API}/services`).then(r => r.data),
  createService: (data) => axios.post(`${API}/services`, data).then(r => r.data),
  updateService: (id, data) => axios.put(`${API}/services/${id}`, data).then(r => r.data),
  deleteService: (id) => axios.delete(`${API}/services/${id}`).then(r => r.data),

  // Catalog Links CRUD
  getCatalogLinks: () => axios.get(`${API}/catalog-links`).then(r => r.data),
  createCatalogLink: (data) => axios.post(`${API}/catalog-links`, data).then(r => r.data),
  updateCatalogLink: (id, data) => axios.put(`${API}/catalog-links/${id}`, data).then(r => r.data),
  deleteCatalogLink: (id) => axios.delete(`${API}/catalog-links/${id}`).then(r => r.data),
};
