import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Importing useSearchParams

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ Correcting async function syntax
  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        navigate("/myorder");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/");
    }
  };

  // ✅ Using useEffect to call verifyPayment when component mounts
  useEffect(() => {
    verifyPayment();
  }, ); // Empty dependency array ensures it runs once

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
