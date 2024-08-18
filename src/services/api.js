import axios from "axios";

export const URL = "http://localhost:5000/api";

const getSongs = async () => {
  try {
    const { data } = await axios.get(`${URL}/songs`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error getting songs");
  }
};

const getUserPlaylist = async ( )=>{
  try{
const {data}=await axios.get(`${URL}/playlist`)
  }catch{
    console.log(error);
    throw new Error("error getting playlist");
  }
}

export { getSongs };
