import React, { useState } from "react";

export const Auth = ({ setLoggedIn }) => {
 const [error, setError] = useState(null);
 const [user, setUser] = useState({
  username: "",
  password: "",
 });

 const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  if (user.username.length < 8 || user.password.length < 8) {
   setError((oldVal) => (oldVal = "Username and password must be longer than 8 characters"));
   return;
  }

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

  try {
   const res = await fetch(url, options);
   const data = await res.json();

   if (res.status === 200) {
    setLoggedIn(true);
    localStorage.setItem("token", data.token);
   } else setError((oldVal) => (oldVal = data.result));
  } catch (error) {
   console.log("error authenticating user", error);
  }
 };

 return (
  <div>
   <input type="text" name="username" placeholder="Username" onChange={handleChange} />
   <br />
   <input type="text" name="password" placeholder="password" onChange={handleChange} />
   <br />
   {error && <p>{error}</p>}
   <button name="login" onClick={handleSubmit}>
    Login
   </button>
   <button name="signup" onClick={handleSubmit}>
    Sign up
   </button>
  </div>
 );
};
