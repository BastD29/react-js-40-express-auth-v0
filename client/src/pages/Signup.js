import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = { ...formData };
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      console.log("created data:", data);
      alert("User added with success!");
      navigate("/login");
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
      <p>Signup</p>
      <label>
        Name:
        <input type="text" name="name" onChange={handleInputChange} />
      </label>
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

export default Signup;
