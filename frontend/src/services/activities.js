import axios from "axios";
import { API_URL } from "../helpers/constants";

export const fetchActivitiesApi = async (search, sortBy, order, projects) => {
  const { data } = await axios.get(`${API_URL}/activities`, {
    params: {
      search: search,
      sortBy: sortBy,
      order,
      projects: projects ? projects.join(",") : projects,
    },
  });
  return data.payload;
};

export const fetchActivityById = async (id) => {
  const { data } = await axios.get(`${API_URL}/activities/${id}`);

  return data.payload;
};

export const addActivity = async (newData) => {
  const { data } = await axios.post(`${API_URL}/activities/create`, newData);

  return data;
};

export const updateActivyApi = async (id, newData) => {
  const { data } = await axios.put(`${API_URL}/activities/${id}`, newData);

  return data;
};

export const deleteActivityApi = async (id) => {
  await axios.delete(`${API_URL}/activities/${id}`);
};
