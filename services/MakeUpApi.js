import axios from "axios";

async function getMakeup(text) {
  try {
    const response = await axios.get(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=${text}`
    );
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default getMakeup;
