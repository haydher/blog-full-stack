import React, { useState, useEffect } from "react";
import { NewPost } from "./NewPost";

export const Posts = ({ loggedIn, setLoggedIn }) => {
 const [posts, setPosts] = useState(null);
 const [error, setError] = useState(false);

 // fetch data from the server if user is logged in
 useEffect(() => {
  const fetchPosts = async () => {
   const token = localStorage.getItem("token");
   const url = `http://localhost:5500/posts`;

   const res = await fetch(url, {
    headers: {
     Authorization: token,
    },
   });

   const data = await res.json();

   console.log("data", data);
   res.status === 200 ? setPosts(data.response) : setError(true);
  };

  loggedIn && !posts && fetchPosts();
  console.log("posts", posts);
  return () => {};
 }, [loggedIn, error, posts]);

 useEffect(() => {
  console.log("posts", posts);
 }, [posts]);

 // loop over the returned data and show them on the page
 const userPosts =
  posts &&
  posts.length > 0 &&
  posts.map((elem) => {
   return (
    <div key={elem._id}>
     <h1>{elem.title}</h1>
     <p>{elem.post}</p>
    </div>
   );
  });

 const handleLogout = () => {
  setLoggedIn(false);
  localStorage.removeItem("token");
 };

 return (
  <div>
   <button onClick={handleLogout}>Log out</button>
   <br />
   <NewPost posts={posts} setPosts={setPosts} />
   <br />
   {userPosts ? userPosts : error ? "Error fetching data" : "No Posts yet"}
  </div>
 );
};
