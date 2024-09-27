import React, { useState, useEffect, useRef } from 'react';
import '../LandingStyles/ItemDetail.css';
import { FaChevronLeft, FaChevronRight, FaBookmark, FaShare, FaEllipsisH, FaTimes } from 'react-icons/fa';

function ItemDetail({ item, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapInitialized && mapRef.current) {
      initMap();
    }
  }, [mapInitialized]);

  const initMap = () => {
    const script1 = document.createElement('script');
    script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
    script1.async = true;
    document.body.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
      script2.async = true;
      document.body.appendChild(script2);

      script2.onload = () => {
        const script3 = document.createElement('script');
        script3.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js';
        script3.async = true;
        document.body.appendChild(script3);

        script3.onload = () => {
          const platform = new H.service.Platform({
            apikey: '_r0tiu26IQdG7fLyLet7YeQZZn5PpRNatHw3d-qdLUY'
          });
          const defaultLayers = platform.createDefaultLayers();

          const map = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
              center: { lat: 0, lng: 0 },
              zoom: 2,
            }
          );

          const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

          // Search for the item's location and add a marker
          searchLocation(item.location, map);

          setMapInitialized(true);
        };
      };
    };
  };

  const searchLocation = (location, map) => {
    const geocoder = new H.service.GeocodingService();
    geocoder.geocode({ searchText: location }, (result) => {
      if (result.Response.View[0] && result.Response.View[0].Result[0]) {
        const position = result.Response.View[0].Result[0].Location.DisplayPosition;
        const marker = new H.map.Marker({ lat: position.Latitude, lng: position.Longitude });
        map.addObject(marker);
        map.setCenter({ lat: position.Latitude, lng: position.Longitude });
        map.setZoom(14);
      }
    }, (error) => {
      console.error('Geocoding error:', error);
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % (item.images ? item.images.length : 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + (item.images ? item.images.length : 1)) % (item.images ? item.images.length : 1)
    );
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail">
        <div className="image-gallery">
          {item.images && item.images.length > 0 ? (
            <>
              <img src={item.images[currentImageIndex]} alt={item.name} />
              <button className="nav-button left" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="nav-button right" onClick={nextImage}>
                <FaChevronRight />
              </button>
              <div className="image-indicators">
                {item.images.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="item-info">
          <h2>{item.name}</h2>
          <p className="price">{item.price} • {item.availability}</p>
          <p className="location">Published in {item.location}</p>
          <div className="actions">
            <button className="primary-button">Send a message</button>
            <button className="icon-button"><FaBookmark /></button>
            <button className="icon-button"><FaShare /></button>
            <button className="icon-button"><FaEllipsisH /></button>
          </div>
          <div className="details">
            <h3>Details</h3>
            <p>{item.description}</p>
          </div>
          <div className="location-map">
            <h3>{item.location}</h3>
            <div ref={mapRef} className="map-container"></div>
            <p>Location is approximate</p>
          </div>
          <div className="seller-message">
            <h3>Send a message to the seller</h3>
            <input type="text" placeholder="Type your message here" />
            <button className="send-button">Send</button>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
