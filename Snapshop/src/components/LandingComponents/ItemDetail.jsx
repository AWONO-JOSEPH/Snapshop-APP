import React, { useState, useEffect, useRef } from 'react';
import '../LandingStyles/ItemDetail.css';
import { FaChevronLeft, FaChevronRight, FaBookmark, FaShare, FaEllipsisH, FaTimes } from 'react-icons/fa';
import { useAddToWishlistMutation } from '../store/store/api/SiteApi';
import { useMarkSoldMutation, useMarkAvailableMutation } from '../store/store/api/ProductApi';

function ItemDetail({ item, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  let loggedInUserId = null;
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      loggedInUserId = parsed?.user?.id || parsed?.id || null;
    }
  } catch (_) {}
  const isViewingOwnItem = Boolean(item?.seller?.id && loggedInUserId && String(item.seller.id) === String(loggedInUserId));
  const [addToWishlist] = useAddToWishlistMutation();
  const [markSold] = useMarkSoldMutation();
  const [markAvailable] = useMarkAvailableMutation();

  // Helper to load a script only once
  const loadScript = (src) => {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadMap = async () => {
      const hereApiKey = import.meta.env.VITE_HERE_MAPS_API_KEY;
      if (!hereApiKey) {
        if (isMounted) setMapError('Map unavailable: missing HERE Maps API key');
        return;
      }
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
      if (isMounted && mapRef.current && userLocation) {
        mapRef.current.innerHTML = "";
        const platform = new window.H.service.Platform({
          apikey: hereApiKey
        });
        const defaultLayers = platform.createDefaultLayers();
        const map = new window.H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            center: userLocation,
            zoom: 14,
          }
        );
        new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
        // Add marker at user's location
        const marker = new window.H.map.Marker(userLocation);
        map.addObject(marker);
      }
    };
    if (userLocation) loadMap();
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, [userLocation]);

  // Handle images: support both item.image (single) and item.images (array)
  let images = [];
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    images = item.images;
  }
  else if (item.image) {
    images = [item.image];
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail">
        <div className="image-gallery">
          {images.length > 0 ? (
            <>
              <img src={images[currentImageIndex]} alt={item.name} loading="lazy" />
              {images.length > 1 && (
                <>
                  <button className="nav-button left" onClick={prevImage} aria-label="Previous image" title="Previous image">
                    <FaChevronLeft />
                  </button>
                  <button className="nav-button right" onClick={nextImage} aria-label="Next image" title="Next image">
                    <FaChevronRight />
                  </button>
                  <div className="image-indicators">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="item-info">
          <h2>{item.name}</h2>
          <p className="price">
            {item.price}
            {item.availability && (
              <span className="availability-badge" aria-label={`Availability: ${item.availability}`}>{item.availability}</span>
            )}
          </p>
          <p className="location">Published in {item.location}</p>
          <div className="actions">
            {!isViewingOwnItem && (
              <button className="primary-button" onClick={() => document.getElementById('seller-message-input')?.focus()}>
                Send a message
              </button>
            )}
            {!isViewingOwnItem && (
              <button
                className="icon-button"
                aria-label="Save"
                title="Save"
                onClick={async () => {
                  try {
                    await addToWishlist(item.id).unwrap();
                    alert('Saved to wishlist');
                  } catch (_) {
                    alert('Failed to save');
                  }
                }}
              >
                <FaBookmark aria-hidden="true" />
              </button>
            )}
            <button className="icon-button" aria-label="Share" title="Share"><FaShare aria-hidden="true" /></button>
            <button className="icon-button" aria-label="More options" title="More options"><FaEllipsisH aria-hidden="true" /></button>
            {isViewingOwnItem && (
              <>
                {item.status === 'sold' ? (
                  <button
                    className="primary-button"
                    onClick={async () => {
                      try {
                        await markAvailable(item.id).unwrap();
                        alert('Marked available');
                      } catch (_) {
                        alert('Failed to update');
                      }
                    }}
                  >
                    Mark Available
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    onClick={async () => {
                      try {
                        await markSold(item.id).unwrap();
                        alert('Marked sold');
                      } catch (_) {
                        alert('Failed to update');
                      }
                    }}
                  >
                    Mark Sold
                  </button>
                )}
              </>
            )}
          </div>
          <div className="details">
            <h3>Details</h3>
            <p>{item.description}</p>
          </div>
          <div className="location-map">
            <h3>Your Location</h3>
            <div ref={mapRef} className="map-container"></div>
            {!userLocation && <p>Fetching your location…</p>}
            {mapError && <p role="status" style={{ color: '#b91c1c' }}>{mapError}</p>}
            <p>Location is approximate</p>
          </div>
          {!isViewingOwnItem ? (
            <div className="seller-message">
              <h3>Send a message to the seller</h3>
              <SellerMessage productId={item.id} />
            </div>
          ) : (
            <div className="seller-message">
              <h3>Seller messaging unavailable</h3>
              <p>You are viewing your own item.</p>
            </div>
          )}
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close item details" title="Close">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

import { useStartConversationMutation, useSendMessageMutation } from '../store/store/api/MessagingApi';

function SellerMessage({ productId }) {
  const [text, setText] = useState('');
  const [startConversation] = useStartConversationMutation();
  const [sendMessage] = useSendMessageMutation();
  const [error, setError] = useState('');

  const onSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      // Start or get existing conversation for product
      const convo = await startConversation({ data: { product_id: productId } }).unwrap();
      // Send the message
      await sendMessage({ data: { conversation: convo.id, content: trimmed } }).unwrap();
      setText('');
      setError('');
      alert('Message sent');
    } catch (e) {
      console.error('Failed to send message', e);
      const message = e?.data?.detail || (Array.isArray(e?.data?.non_field_errors) ? e.data.non_field_errors[0] : '') || 'Failed to send message';
      setError(message);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="seller-message-form">
      <input
        id="seller-message-input"
        type="text"
        placeholder="Type your message here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="send-button" onClick={onSend}>Send</button>
      {error && <p style={{ color: '#b91c1c', marginTop: 6 }}>{error}</p>}
    </div>
  );
}

export default ItemDetail;
