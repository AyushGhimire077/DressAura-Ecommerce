import React, { useContext, useState } from "react";
import "./dash.css";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthRoute } from "../../context/authContext";
import { toast } from "react-hot-toast";

const data = [
  { month: "Jan", sales: 40000, users: 24000 },
  { month: "Feb", sales: 35000, users: 22000 },
  { month: "Mar", sales: 50000, users: 28000 },
  { month: "Apr", sales: 45000, users: 26000 },
  { month: "May", sales: 47000, users: 29000 },
  { month: "Jun", sales: 48000, users: 31000 },
  { month: "Jul", sales: 42000, users: 27000 },
  { month: "Aug", sales: 49000, users: 33000 },
  { month: "Sep", sales: 46000, users: 32000 },
  { month: "Oct", sales: 51000, users: 35000 },
  { month: "Nov", sales: 52000, users: 34000 },
];

const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
const totalUsers = data.reduce((sum, item) => sum + item.users, 0);

const Dashboard = () => {
  const { backendURI } = useContext(AuthRoute);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !image || !category || !stock) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("stock", stock);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendURI}/api/admin/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setCategory("");
        setStock("");
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dash-container">
      <div className="content-wrapper">
        <h2 className="chart-title">Sales and Users Statistics</h2>
        <div className="chat-container">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#007bff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="total-box">
              <h4>Total Sales</h4>
              <p>${totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
            <div className="total-box">
              <h4>Total Users:</h4>
              <p>{totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="more-wrapper">
        <div className="addPro">
          <h1>Add Product</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={description}
              placeholder="Product Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              value={price}
              placeholder="Product Price"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input
              type="number"
              value={stock}
              placeholder="Stock"
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
            <input
              type="file"
              accept="image/*"
              className="img"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="select-cat"
            >
              <option value="">Select Category</option>
              <option value="Upper">Upper</option>
              <option value="Lower">Lower</option>
              <option value="Accessories">Accessories</option>
              <option value="Shoes">Shoes</option>
            </select>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Adding Product..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="more-info-box">
          <h1>THE DRESS AURA</h1>
          <h2>Admin Pannel</h2>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
