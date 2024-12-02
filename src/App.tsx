import { useEffect, useState } from 'react'
import './App.css'
import './main.css'
import GetProducts from './api/products'
import {CardWithForm} from './loginForm/CardWithForm'
import ShoppingHome from './shoppingPage/mainShopping';

interface Product {
  productId: number;
  brand: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageName: string;
  imageType: string;
  imageData: Blob; // Base64-encoded string
}

function App() {
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetProducts(); 
        setProducts(data); 
        console.error(data); 
        console.log(data[0].imageData);
      } catch (error) {
        console.error("Error fetching products:", error); 
      }
    };
  
    fetchProducts(); // Invoke the async function
  }, []);


  const handleLoginSuccess = async(isLoggedIn: boolean) => {
    setProducts(await(GetProducts()));
    setStatus(isLoggedIn);
  };
  const [status, setStatus] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      {status ? (
        <div className="select-none fullw">
          <ShoppingHome productss = {products}/>
        </div>
      ) : (
        <div className="bg-custom-login flex items-center justify-center">
          <CardWithForm setLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </>
  );
  
}

export default App
