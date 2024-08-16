import axios from "axios";

const URL = "http://localhost:5000/api";

const getSongs = async () => {
  try {
    const { data } = await axios.get(`${URL}/songs`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error getting songs");
  }
};

export { getSongs };
