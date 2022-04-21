import React from "react";

export const NewPost = () => {
 return (
  <div>
   <input type="text" name="title" />
   <br />
   <input type="textarea" name="post" />
   <br />
   <button>Post</button>
  </div>
 );
};
