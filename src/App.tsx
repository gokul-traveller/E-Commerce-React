import { useEffect, useState } from 'react';
import './App.css';
import './main.css';
import GetProducts from './api/products';
import { CardWithForm } from './loginForm/CardWithForm';
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
  const [status, setStatus] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Function to handle login success
  const handleLoginSuccess = async (isLoggedIn: boolean) => {
    const fetchedProducts = await GetProducts();
    if (fetchedProducts) {
      setProducts(fetchedProducts);
      setStatus(isLoggedIn);
    }
  };

  // Check for valid token on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Optionally validate token with backend here
      handleLoginSuccess(true); // Assuming token is valid
    }
  }, []);

  return (
    <>
      {status ? (
        <div className="select-none fullw">
          <ShoppingHome productss={products} />
        </div>
      ) : (
        <div className="bg-custom-login flex items-center justify-center">
          <CardWithForm setLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </>
  );
}

export default App;
