import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const getEvents = () => {
  return axios.get(`${API_URL}/events`);
};

const createEvent = (eventData) => {
  return axios.post(`${API_URL}/event`, eventData);
};

const getEventById = (id) => {
  return axios.get(`${API_URL}/event/${id}`);
};

const submitVote = (id, participantData) => {
  return axios.post(`${API_URL}/event/${id}/votes`, participantData);
};
const getResultEvent = (id) => {
  return axios.get(`${API_URL}/event/${id}/results`);
};

export default {
  getEvents,
  createEvent,
  getEventById,
  submitVote,
  getResultEvent,
};
