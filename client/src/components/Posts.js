import React from "react";

export const Posts = ({ setLoggedIn }) => {
 return (
  <div>
   <button onClick={() => setLoggedIn(false)}>Log out</button>

   <h1>Title</h1>
   <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni reiciendis explicabo tenetur, amet, corrupti minima
    rem fuga excepturi cumque commodi veniam porro inventore necessitatibus placeat consequatur illo est! Laboriosam,
    adipisci.
   </p>
  </div>
 );
};
