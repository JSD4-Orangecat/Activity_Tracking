import axios from "axios"


const PORT = 3001;
const HOSTNAME = "http://127.0.0.1";
const SERVER = `${HOSTNAME}:${PORT}`;



export const createUser = async (body) => {
  const response = await axios.post(`${SERVER}/auth/register`, body);
  alert(response.data);
};