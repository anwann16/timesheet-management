import axios from "axios";
import { API_URL } from "../helpers/constants";

export const fetchUserApi = async () => {
  const { data } = await axios.get(`${API_URL}/user`);

  return data.payload;
};

export const updatedUserApi = async (rate) => {
  await axios.put(`${API_URL}/user/update`, { rate });
};
