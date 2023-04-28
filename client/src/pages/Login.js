import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = { ...formData };
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      console.log("submitted data:", data);
      alert("User logged in with success!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Login</p>
      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
