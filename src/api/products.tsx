import axios from 'axios';

const GetProducts = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found. Please login first.');
      return null;
    }

    const response = await axios.post(
      `http://localhost:8080/getProducts`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach Bearer token
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Product Data From DB:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export default GetProducts;
