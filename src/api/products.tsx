import axios from 'axios';

const GetProducts = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/getProducts`);
        console.log('Product Data From DB:', response.data);
        return response.data; 
      } catch (error) {
        console.error('Error validating user:', error);
        return null; 
      }
    };
    
export default GetProducts;

