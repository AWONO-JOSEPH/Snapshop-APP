import React, { useEffect, useMemo, useState } from "react";
import { useGetSoldProductsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../components/store/store/api/ProductApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/LandingComponents/Sidebar";
import Header from "../components/LandingComponents/Header"; // <-- Import Header
import ItemDetail from "../components/LandingComponents/ItemDetail";
import "../PagesStyle/Articles.css";

const ArticlesSold = () => {
  const { data: products = [], isLoading, error, refetch } = useGetSoldProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "" });
  const [submitting, setSubmitting] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [viewing, setViewing] = useState(null); // product being viewed in modal

  const backendBaseUrl = useMemo(() => {
    const raw = import.meta.env.VITE_BACKEND_API_URL || "";
    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
  }, []);

  const buildImageUrl = (url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    // ensure leading slash
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${backendBaseUrl}${path}`;
  };

  const onEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name || "",
      price: String(product.price || ""),
      description: product.description || "",
      category: product.category || "",
    });
  };

  const onDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      setSubmitting(true);
      await deleteProduct(product.id).unwrap();
      await refetch();
    } catch (e) {
      console.error("Delete failed", e);
      alert("Failed to delete product");
    } finally {
      setSubmitting(false);
    }
  };

  const onView = (product) => {
    setViewing(product);
  };

  useEffect(() => {
    const handle = () => setMenuOpenId(null);
    if (menuOpenId) {
      document.addEventListener('click', handle);
      return () => document.removeEventListener('click', handle);
    }
  }, [menuOpenId]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      setSubmitting(true);
      await updateProduct({ id: editing.id, data: { ...form, price: parseFloat(form.price) } }).unwrap();
      setEditing(null);
      await refetch();
    } catch (e) {
      console.error("Update failed", e);
      alert("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles.</div>;

  return (
    <div className="app">
      <Sidebar /> {/* Sidebar remains constant */}
      <div className="main-content">
        <Header /> {/* Header remains constant */}
        <div className="articles-container">
          <h2 className="articles-header">Articles Sold</h2>
          <button className="return-btn" onClick={() => navigate(-1)}>Return</button>
          {products && products.length > 0 ? (
            <ul className="articles-list">
              {products.map((product) => (
                <li className="article-item" key={product.id}>
                  <div className="article-info" onClick={() => onView(product)} role="button" tabIndex={0}>
                    {product.images && product.images.length > 0 ? (
                      <img className="article-image" src={buildImageUrl(product.images[0])} alt={product.name} />
                    ) : (
                      <div className="article-image placeholder">No image</div>
                    )}
                    <div className="article-details">
                      <span className="article-title">{product.name}</span>
                      <span className="article-price">{product.price} FCFA</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="article-menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === product.id ? null : product.id);
                    }}
                    aria-label="Item menu"
                  >
                    ⋯
                  </button>
                  {menuOpenId === product.id && (
                    <div className="article-menu-popover" onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="menu-item" onClick={() => { setMenuOpenId(null); onView(product); }}>View</button>
                      <button type="button" className="menu-item" onClick={() => { setMenuOpenId(null); onEdit(product); }}>Update</button>
                      <button type="button" className="menu-item danger" onClick={() => { setMenuOpenId(null); onDelete(product); }} disabled={submitting}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>No articles sold yet.</div>
          )}
        </div>
        {viewing && (
          <ItemDetail
            item={{
              id: viewing.id,
              name: viewing.name,
              description: viewing.description,
              price: viewing.price,
              images: (viewing.images || []).map(buildImageUrl),
            }}
            onClose={() => setViewing(null)}
          />
        )}
        {editing && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit product</h3>
                <button className="modal-close" onClick={() => setEditing(null)} aria-label="Close">×</button>
              </div>
              <form className="modal-form" onSubmit={onSubmitEdit}>
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  <span>Price (FCFA)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  <span>Category</span>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  <span>Description</span>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </label>
                <div className="modal-actions">
                  <button type="button" className="article-btn" onClick={() => setEditing(null)}>Cancel</button>
                  <button type="submit" className="article-btn update" disabled={submitting}>{submitting ? 'Saving…' : 'Save changes'}</button>
                </div>
                <p className="modal-hint">Image updates are not supported here. To change images, create a new product with the desired images.</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default ArticlesSold;