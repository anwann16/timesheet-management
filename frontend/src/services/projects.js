import axios from "axios";
import { API_URL } from "../helpers/constants";

export const fetchProjectApi = async () => {
  const { data } = await axios.get(`${API_URL}/projects`);

  return data.payload;
};

export const addProjectApi = async (data) => {
  await axios.post(`${API_URL}/projects`, data);
};
