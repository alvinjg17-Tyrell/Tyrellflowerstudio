import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = {
  // Get all content
  getContent: () => axios.get(`${API}/content`).then(r => r.data),

  // Update site content (brand, hero, about, contact)
  updateContent: (data) => axios.put(`${API}/content`, data).then(r => r.data),

  // Services CRUD
  getServices: () => axios.get(`${API}/services`).then(r => r.data),
  createService: (data) => axios.post(`${API}/services`, data).then(r => r.data),
  updateService: (id, data) => axios.put(`${API}/services/${id}`, data).then(r => r.data),
  deleteService: (id) => axios.delete(`${API}/services/${id}`).then(r => r.data),

  // Testimonials CRUD
  getTestimonials: () => axios.get(`${API}/testimonials`).then(r => r.data),
  createTestimonial: (data) => axios.post(`${API}/testimonials`, data).then(r => r.data),
  updateTestimonial: (id, data) => axios.put(`${API}/testimonials/${id}`, data).then(r => r.data),
  deleteTestimonial: (id) => axios.delete(`${API}/testimonials/${id}`).then(r => r.data),
};
