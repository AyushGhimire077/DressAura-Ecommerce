import React, { useContext, useState } from "react";
import "./dash.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
import { toast } from "react-toastify";

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
  const [value, onChange] = useState(new Date());

  const today = new Date();

  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { backendURI } = useContext(AuthRoute);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${backendURI}/api/admin/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data) {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Unexpected response structure.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    }
  };

  return (
    <div className="dash-container">
      <div className="content-wrapper">
        <h2 className="chart-title">Sales and Users Statistics</h2>
        <div className="chat-container">
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
              type="file"
              value={image}
              placeholder="Product Image"
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="number"
              value={price}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button class="submit-btn">Submit</button>
          </form>
        </div>

        <div className="more-info-box">
          <div class="total-box">
            <h1>Month Sell - Rs4000</h1>
          </div>
          <div class="total-box">
            <h1>Totel Sell - Rs103000</h1>
          </div>
          <div class="total-box">
            <h1>Totel Users - Rs390</h1>
          </div>
          <div class="total-box">
            <h1>Totel Users - Rs390</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
