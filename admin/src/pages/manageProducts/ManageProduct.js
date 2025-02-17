import { useContext, useEffect, useState } from "react";
import { AuthRoute } from "../../context/authContext";
import toast from "react-hot-toast";
import "./style.css";

const ManageProductsPage = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    updateProduct,
    loading,
    error,
  } = useContext(AuthRoute);

  const [editProduct, setEditProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product!");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product._id);
    setUpdatedData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleUpdate = async (productId) => {
    try {
      await updateProduct(productId, updatedData);
      toast.success("Product updated successfully!");
      setEditProduct(null);
    } catch (err) {
      toast.error("Failed to update product!");
    }
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="product-item">
              {editProduct === product._id ? (
                <div>
                  <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, name: e.target.value })
                    }
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={updatedData.price}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, price: e.target.value })
                    }
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={updatedData.stock}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, stock: e.target.value })
                    }
                    className="edit-input"
                  />
                  <button
                    className="chanage-btn"
                    onClick={() => handleUpdate(product._id)}
                  >
                    Save
                  </button>
                  <button
                    className="chanage-btn"
                    onClick={() => setEditProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="product-info">
                  <p>{product.name}</p>
                  <p>Rs{product.price}</p>
                  <p>Stock - {product.stock}</p>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageProductsPage;
