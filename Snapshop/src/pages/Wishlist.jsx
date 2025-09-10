import React, { useMemo } from 'react';
import Header from '../components/LandingComponents/Header';
import Sidebar from '../components/LandingComponents/Sidebar';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '../components/store/store/api/SiteApi';

export default function Wishlist() {
  const { data: items = [], isLoading, refetch } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const backendBaseUrl = useMemo(() => {
    const raw = import.meta.env.VITE_BACKEND_API_URL || '';
    return raw.endsWith('/') ? raw.slice(0, -1) : raw;
  }, []);

  const buildImageUrl = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${backendBaseUrl}${path}`;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '16px' }}>
          <h1>My Wishlist</h1>
          {isLoading ? (
            <p>Loading…</p>
          ) : items.length === 0 ? (
            <p>No saved items yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {items.map((it) => {
                const product = it.product || {};
                const image = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null;
                return (
                  <div key={it.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                    {image ? (
                      <img src={buildImageUrl(image)} alt={product.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No image</div>
                    )}
                    <div style={{ padding: 12 }}>
                      <div style={{ fontWeight: 600 }}>{product.name}</div>
                      <div style={{ color: '#374151', marginTop: 4 }}>{product.price}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button
                          className="primary-button"
                          onClick={async () => {
                            try {
                              await removeFromWishlist(it.id).unwrap();
                              refetch();
                            } catch (_) {}
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}



