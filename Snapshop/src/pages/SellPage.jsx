import React, { useState } from 'react';
import '../PagesStyle/SellPage.css';
import { useCreateProductMutation } from '../components/store/store/api/ProductApi';
import { useNavigate } from 'react-router-dom'; // Add this import

function SellPage() {
  const [productImages, setProductImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate(); // Add this line

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'fashion_clothing', label: 'Fashion - Clothing' },
    { value: 'fashion_accessories', label: 'Fashion - Accessories' },
    { value: 'fashion_shoes', label: 'Fashion - Shoes' },
    { value: 'home_decor', label: 'Home Decoration' },
    { value: 'artisanal_jewelry', label: 'Artisanal - Jewelry' },
    { value: 'artisanal_pottery', label: 'Artisanal - Pottery' },
    { value: 'artisanal_textiles', label: 'Artisanal - Textiles' },
  ];

  const handleImageChange = (e) => {
    setProductImages([...e.target.files]);
  };

  const removeImage = (index) => {
    const newImages = productImages.filter((_, imgIndex) => imgIndex !== index);
    setProductImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("category", productCategory);

    // Append all images
    productImages.forEach((img, idx) => {
      formData.append("images", img); // 'images' should match your backend field name
    });

    try {
      await createProduct(formData).unwrap();

      alert('Product posted successfully!');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductCategory('');
      setProductImages([]);
      navigate('/articles-sold');
    } catch (error) {
      console.error('Error posting product:', error);
      alert('Failed to post product. Please try again.');
    }
  };

  return (
    <div className="sp-container">
      <div className="sp-content">
        <h1 className="sp-title">Sell Your Product</h1>
        {/* Return Button */}
        <button
          className="sp-return-button"
          style={{ marginBottom: '1rem' }}
          onClick={() => navigate(-1)}
        >
          Return
        </button>
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
            <select
              id="productCategory"
              className="sp-select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
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
