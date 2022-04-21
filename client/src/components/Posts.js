import React, { useState, useEffect } from "react";
import { NewPost } from "./NewPost";

export const Posts = ({ loggedIn, setLoggedIn }) => {
 const [posts, setPosts] = useState(null);
 const [error, setError] = useState(false);

 // fetch data from the server if user is logged in
 useEffect(() => {
  const fetchPosts = async () => {
   const url = `http://localhost:5500/posts`;

   const res = await fetch(url);
   const data = await res.json();

   res.status === 200 ? setPosts(data) : setError(true);
  };

  loggedIn && fetchPosts();

  return () => {};
 }, [loggedIn, error]);

 // loop over the returned data and show them on the page
 const userPosts =
  posts &&
  posts.map((elem) => {
   return (
    <div key={elem.id}>
     <h1>{elem.title}</h1>
     <p>{elem.post}</p>
    </div>
   );
  });

 return (
  <div>
   <button onClick={() => setLoggedIn(false)}>Log out</button>
   <br />
   <NewPost />
   <br />
   {userPosts ? userPosts : error ? "Error fetching data" : "Loading"}
  </div>
 );
};
