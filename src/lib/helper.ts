import axios from "axios";

export async function getItemById(itemId: string) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/items/${itemId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(userId: string)  {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/user?userId=${userId}`)
    return data;
  } catch (error) {
    console.log(error)
  }
}