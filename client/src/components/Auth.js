import React, { useState } from "react";

export const Auth = () => {
 const [user, setUser] = useState({
  username: "",
  password: "",
 });

 const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
 };

 const handleSubmit = async () => {
  console.log("user", user);
  const url = `http://localhost:5500/login`;

  const options = {
   method: "POST", // *GET, POST, PUT, DELETE, etc.
   body: JSON.stringify(user), // body data type must match "Content-Type" header
  };

  const res = await fetch(url, options);
  const data = await res.json();

  console.log(data);
 };

 return (
  <div>
   <input type="text" name="username" placeholder="Username" onChange={handleChange} />
   <br />
   <input type="text" name="password" placeholder="password" onChange={handleChange} />
   <br />
   <button onClick={handleSubmit}>Login</button>
  </div>
 );
};
