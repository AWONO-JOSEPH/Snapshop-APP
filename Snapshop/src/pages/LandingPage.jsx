import React, { useState } from 'react';
import Header from '../components/LandingComponents/Header';
import Sidebar from '../components/LandingComponents/Sidebar';
import TrendingItems from '../components/LandingComponents/TrendingItems';
import ItemDetail from '../components/LandingComponents/ItemDetail';
import '../PagesStyle/LandingPage.css';
import FloatingButton from '../components/LandingComponents/FloatingButton';
import image from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/robe.jpg';
import image1 from'/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/kaba.jpg';
import image2 from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/kaba2.jpg';
import image3 from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/image4.jpg';
import image4 from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/image5.jpg';
import image5 from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/image9.jpeg';
import image6 from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/image8.jpg';
// import ProfilePage from '/Users/klinch/Desktop/Snapshop APP/Snapshop/src/assets/';

const items = [
  { id: 1, name: 'Robe', description: 'Description of Item', town: 'Yaounde', images: [image], price: '$50', availability: 'In Stock', location: 'Yaounde' },
  { id: 2, name: 'Kaba', description: 'Description of Item', town: 'Yaounde', images: [image1, image, image2], price: '$60', availability: 'In Stock', location: 'Yaounde' },
  { id: 3, name: 'Dress', description: 'Description of Item', town: 'Yaounde', images: [image2, image, image1], price: '$55', availability: 'In Stock', location: 'Yaounde' },
  { id: 4, name: 'Suit', description: 'Description of Item', town: 'Yaounde', images: [image3, image2, image1], price: '$70', availability: 'In Stock', location: 'Yaounde' },
  { id: 5, name: 'Skirt', description: 'Description of Item', town: 'Yaounde', images: [image4, image1, image], price: '$45', availability: 'In Stock', location: 'Yaounde' },
  { id: 6, name: 'Blouse', description: 'Description of Item', town: 'Yaounde', images: [image5, image2, image], price: '$40', availability: 'In Stock', location: 'Yaounde' },
  { id: 7, name: 'Jacket', description: 'Description of Item', town: 'Yaounde', images: [image6, image1, image2], price: '$65', availability: 'In Stock', location: 'Yaounde' },
  { id: 8, name: 'Pants', description: 'Description of Item', town: 'Yaounde', images: [image1, image, image2], price: '$55', availability: 'In Stock', location: 'Yaounde' },
  { id: 9, name: 'Shirt', description: 'Description of Item', town: 'Yaounde', images: [image2, image1, image], price: '$45', availability: 'In Stock', location: 'Yaounde' },
  { id: 10, name: 'Coat', description: 'Description of Item', town: 'Douala', images: [image, image2, image1], price: '$75', availability: 'In Stock', location: 'Douala' },
  { id: 11, name: 'Sweater', description: 'Description of Item', town: 'Douala', images: [image1, image, image2], price: '$50', availability: 'In Stock', location: 'Douala' },
  { id: 12, name: 'Scarf', description: 'Description of Item', town: 'Douala', images: [image2, image1, image], price: '$25', availability: 'In Stock', location: 'Douala' },
  { id: 13, name: 'Hat', description: 'Description of Item', town: 'Douala', images: [image, image1, image2], price: '$30', availability: 'In Stock', location: 'Douala' },
  { id: 14, name: 'Gloves', description: 'Description of Item', town: 'Douala', images: [image1, image2, image], price: '$20', availability: 'In Stock', location: 'Douala' },
  { id: 15, name: 'Socks', description: 'Description of Item', town: 'Douala', images: [image2, image, image1], price: '$15', availability: 'In Stock', location: 'Douala' },
  { id: 16, name: 'Tie', description: 'Description of Item', town: 'Douala', images: [image, image2, image1], price: '$35', availability: 'In Stock', location: 'Douala' },
];

function LandingPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header onSearchToggle={handleSearchToggle} />
        {showSearch && <input type="text" placeholder="Search..." className="search-bar" />}
        <TrendingItems items={items} onItemClick={handleItemClick} />
        {selectedItem && <ItemDetail item={selectedItem} onClose={handleCloseDetail} />}
      </div>
      <FloatingButton />
    </div>
  );
}

export default LandingPage;