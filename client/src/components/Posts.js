import React, { Component } from "react";
import NewPost from "./NewPost";

export default class Posts extends Component {
 state = {
  posts: [],
  error: null,
 };

 fetchPosts = async () => {
  // fetch data from the server if user is logged in
  const token = localStorage.getItem("token");
  const url = this.props.loggedIn ? `http://localhost:5500/posts` : `http://localhost:5500/posts/all`;

  try {
   const res = await fetch(url, {
    headers: {
     Authorization: token,
    },
   });
   const data = await res.json();

   res.status === 200 ? this.setState({ posts: data.response }) : this.setState({ error: true });
  } catch (error) {}
 };

 componentDidMount = async () => {
  this.fetchPosts();
 };

 componentDidUpdate = (prevProp, preState) => {
  if (prevProp.loggedIn !== this.props.loggedIn) this.fetchPosts();
 };

 handlePosts = (posts) => this.setState({ posts });

 render() {
  // loop over the returned data and show them on the page
  const userPosts =
   this.state.posts &&
   this.state.posts.length > 0 &&
   this.state.posts.map((elem) => {
    return (
     <div key={elem._id}>
      <h1>{elem.title}</h1>
      <p>{elem.post}</p>
     </div>
    );
   });

  return (
   <div>
    {this.props.loggedIn && <NewPost handlePosts={this.handlePosts} />}
    {userPosts ? userPosts : this.state.error ? "Error fetching data" : "No Posts yet"}
   </div>
  );
 }
}

// import React, { useState, useEffect } from "react";
// import { NewPost } from "./NewPost";

// export const Posts = ({ loggedIn, setLoggedIn }) => {
//  const [posts, setPosts] = useState(null);
//  const [error, setError] = useState(false);

//  // fetch data from the server if user is logged in
//  useEffect(() => {
//   const fetchPosts = async () => {
//    const token = localStorage.getItem("token");
//    const url = `http://localhost:5500/posts`;

//    const res = await fetch(url, {
//     headers: {
//      Authorization: token,
//     },
//    });

//    const data = await res.json();

//    console.log("data", data);
//    res.status === 200 ? setPosts(data.response) : setError(true);
//   };

//   loggedIn && !posts && fetchPosts();
//   console.log("posts", posts);
//   return () => {};
//  }, [loggedIn, error, posts]);

//  // loop over the returned data and show them on the page
//  const userPosts =
//   posts &&
//   posts.length > 0 &&
//   posts.map((elem) => {
//    return (
//     <div key={elem._id}>
//      <h1>{elem.title}</h1>
//      <p>{elem.post}</p>
//     </div>
//    );
//   });

//  const handleLogout = () => {
//   setLoggedIn(false);
//   localStorage.removeItem("token");
//  };

//  return (
//   <div>
//    <button onClick={handleLogout}>Log out</button>
//    <br />
//    <NewPost posts={posts} setPosts={setPosts} />
//    <br />
//    {userPosts ? userPosts : error ? "Error fetching data" : "No Posts yet"}
//   </div>
//  );
// };
