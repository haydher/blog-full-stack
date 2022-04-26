import React, { Component } from "react";

export default class NewPost extends Component {
 state = {
  post: {
   title: "",
   post: "",
  },
 };

 handleChange = (e) => {
  this.setState({ post: { ...this.state.post, [e.target.name]: e.target.value } });
 };

 handleSubmit = async () => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:5500/posts`;

  const options = {
   method: "POST",
   headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token,
   },
   body: JSON.stringify(this.state.post),
  };

  const res = await fetch(url, options);
  const data = await res.json();

  if (res.status === 200) this.props.handlePosts(data.response);
  console.log("data in new post", data);
 };

 render() {
  return (
   <div>
    <input type="text" name="title" placeholder="Title" onChange={this.handleChange} />
    <br />
    <textarea name="post" placeholder="Post" onChange={this.handleChange} />
    <br />
    <button onClick={this.handleSubmit}>Post</button>
   </div>
  );
 }
}

// import React, { useState } from "react";

// export const NewPost = ({ posts, setPosts }) => {
//  const [post, setPost] = useState({
//   title: "",
//   post: "",
//  });

//  const handleChange = (e) => {
//   setPost({ ...post, [e.target.name]: e.target.value });
//  };

//  const handleSubmit = async () => {
//   const token = localStorage.getItem("token");

//   const url = `http://localhost:5500/posts`;

//   const options = {
//    method: "POST",
//    headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: token,
//    },
//    body: JSON.stringify(post),
//   };

//   const res = await fetch(url, options);
//   const data = await res.json();

//   if (res.status === 200) setPosts(data.response);
//  };

//  return (
//   <div>
//    <input type="text" name="title" placeholder="Title" onChange={handleChange} />
//    <br />
//    <textarea name="post" placeholder="Post" onChange={handleChange} />
//    <br />
//    <button onClick={handleSubmit}>Post</button>
//   </div>
//  );
// };
