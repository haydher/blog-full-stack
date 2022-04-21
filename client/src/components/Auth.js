import React, { useState } from "react";

export const Auth = ({ setLoggedIn }) => {
 const [user, setUser] = useState({
  username: "",
  password: "",
 });

 const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  const btnName = e.target.name;
  const url = `http://localhost:5500/auth/${btnName}`;

  const options = {
   method: "POST",
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
   },
   body: JSON.stringify(user),
  };

  const res = await fetch(url, options);
  const data = await res.json();

  if (res.status === 200) {
   setLoggedIn(true);
   localStorage.setItem("token", data.token);
  }
  console.log(data);
 };

 return (
  <div>
   <input type="text" name="username" placeholder="Username" onChange={handleChange} />
   <br />
   <input type="text" name="password" placeholder="password" onChange={handleChange} />
   <br />
   <button name="login" onClick={handleSubmit}>
    Login
   </button>
   <button name="signup" onClick={handleSubmit}>
    Sign up
   </button>
  </div>
 );
};
