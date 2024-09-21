import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../ComponentStyles/TrendingProducts.css';

const TrendingProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 'product1',
      name: 'Smartphone XYZ',
      seller: 'Tech Store',
      price: 65000,
      image: '/src/assets/product1.jpg', 
    },
    {
      id: 'product2',
      name: 'Stylish Headphones',
      seller: 'Audio Hub',
      price: 8125,
      image: '/src/assets/product2.jpg',
    },
    {
      id: 'product3',
      name: 'Gaming Laptop',
      seller: 'Gaming World',
      price: 70000,
      image: '/src/assets/product3.jpg',
    },
    {
      id: 'product4',
      name: 'Wireless Mouse',
      seller: 'Office Supplies',
      price: 8500,
      image: '/src/assets/product4.jpg',
    },
    {
      id: 'product5',
      name: 'Bluetooth Speaker',
      seller: 'Audio Hub',
      price: 6000,
      image: '/src/assets/product5.jpg',
    },
    {
      id: 'product6',
      name: 'Smartwatch',
      seller: 'Wearable Tech',
      price: 9000,
      image: '/src/assets/product6.jpg',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="body4">
      <div className="catalogue">
        <header className="catalogue-header">        
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found for your search.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className={`product-card ${product.id}`}>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="seller">{product.seller}</p>
                  <p className="price">{product.price.toLocaleString()} FCFA</p>
                  <div className="action-buttons">
                    <Link to={`./Login`}>
                      <button className="action-button view">View</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;