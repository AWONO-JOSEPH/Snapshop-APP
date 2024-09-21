import React, { useState } from 'react';
import '../PagesStyle/SellPage.css';
import Header from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/components/LandingComponents/Header';

function SellPage() {
  const [productImages, setProductImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleImageChange = (e) => {
    setProductImages([...e.target.files]);
  };

  const removeImage = (index) => {
    const newImages = productImages.filter((_, imgIndex) => imgIndex !== index);
    setProductImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Submitted:', {
      productImages,
      productName,
      productPrice,
      productDescription,
    });
  };

  return (
    <div className="sp-container">
      <div className="sp-content">
        <h1 className="sp-title">Sell Your Product</h1>
        <form className="sp-form" onSubmit={handleSubmit}>
          <div className="sp-form-group">
            <label htmlFor="images" className="sp-label">Product Images:</label>
            <input
              type="file"
              id="images"
              className="sp-file-input"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="sp-image-preview">
              {productImages.length > 0 && (
                <ul className="sp-image-list">
                  {Array.from(productImages).map((image, index) => (
                    <li key={index} className="sp-image-item">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className="sp-preview-image"
                      />
                      <button
                        type="button"
                        className="sp-remove-image-button"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="sp-form-group">
            <input
              type="text"
              id="productName"
              placeholder='Product Name'
              className="sp-input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="sp-form-group">
            <input
              type="number"
              id="productPrice"
              placeholder='Product Price (FCFA)'
              className="sp-input"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          <div className="sp-form-group">
            <textarea
              id="productDescription"
              placeholder='Product Description:'
              className="sp-textarea"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <center><button type="submit" className="sp-submit-button">Post Product</button></center>
        </form>
      </div>
    </div>
  );
}

export default SellPage;
