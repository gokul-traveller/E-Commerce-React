
interface ProductCardProps {
    image: Blob; 
    title: string; 
    price: number; 
  }
  interface Product {
    productId: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageName: string;
    imageType: string;
    imageData: Blob;
  }
  
  interface ShoppingHomeProps {
    productss: Product[];
  }

  const ShoppingHome: React.FC<ShoppingHomeProps> = ({ productss }) => {

  // const productss = [
  //   { id: 1, image: "../../src/assets/abstractWallpaper.jpg", title: "Product 1", price: 29.99 },
  //   { id: 2, image: "../../src/assets/LoginPage.jpg", title: "Product 2", price: 49.99 },
  //   { id: 3, image: "../../src/assets/abstractWallpaper.jpg", title: "Product 3", price: 19.99 },
  //   { id: 4, image: "../../src/assets/abstractWallpaper.jpg", title: "Product 4", price: 29.99 },
  //   { id: 5, image: "../../src/assets/abstractWallpaper.jpg", title: "Product 5", price: 49.99 },
  //   { id: 6, image: "../../src/assets/LoginPage.jpg", title: "Product 6", price: 19.99 },
  //   { id: 7, image: "../../src/assets/LoginPage.jpg", title: "Product 7", price: 49.99 },
  //   { id: 8, image: "../../src/assets/abstractWallpaper.jpg", title: "Product 8", price: 19.99 },
  // ];
  const productElements = [];
  for (let i = 0; i < 5; i++) {
    productElements.push(
      <ProductCard
        key={1} 
        image={new Blob(["hello world"], { type: "text/plain" })}
        title={"product"}
        price={120}
      />
    );
  }

  return (
    <div className="font-sans">
      <header className="bg-gray-800 text-white">
        <div className="flex gap-6 justify-between">
          <div className="flex text-2xl font-serif text-white items-start pl-6 py-3">
            GenzKids
          </div>
          <div className="flex text-2xl font-serif text-white px-6 py-3">
            GenzKids
          </div>
        </div>
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-serif text-gray-800">home</h1>
          <ul className="flex space-x-6 text-gray-600 pl-8">
            <li><a href="#" className="hover:text-gray-800">Home</a></li>
            <li><a href="#" className="hover:text-gray-800">Apparel</a></li>
            <li><a href="#" className="hover:text-gray-800">Lifestyle</a></li>
            <li><a href="#" className="hover:text-gray-800">Accessories</a></li>
            <li><a href="#" className="hover:text-gray-800">Blog</a></li>
            <li><a href="#" className="hover:text-gray-800">About</a></li>
            <li><a href="#" className="hover:text-gray-800">Contact</a></li>
          </ul>
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 border rounded-lg border-gray-300 text-gray-800"
          />
        </nav>
      </header>

      <div>
        <section className="grid grid-cols-3 gap-4 p-6 bg-white">
          <div className="flex items-center justify-center bg-gray-200 p-10 text-xl font-bold text-gray-700 rounded-md">
            LIFESTYLE
          </div>
          <div className="flex items-center justify-center bg-gray-300 p-10 text-xl font-bold text-gray-700 rounded-md">
            SALE
          </div>
          <div className="flex items-center justify-center bg-gray-200 p-10 text-xl font-bold text-gray-700 rounded-md">
            APPAREL
          </div>
        </section>

        <section className="grid grid-cols-3 gap-6 p-6 bg-gray-100">
            {productss ? 
              productss.map((product) => (
                <ProductCard
                  key={product.productId} 
                  image={product.imageData}
                  title={product.name}
                  price={product.price}
                />
              )) : 
              productElements
            }
        {/* <ProductCard
            key={productss[0].productId} 
            image={productss[0].imageData}
            title={productss[0].name}
            price={productss[0].price}
          /> */}
        </section>
      </div>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ image, title, price} ) => {
    return(  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <img
       src=  {`data:image/jpeg;base64,${image}`}
      alt= {title}
      className="w-full h-40 object-cover rounded-t-md mb-4"
    />
    <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2">{price}</p>
  </div>
);}

export default ShoppingHome;
