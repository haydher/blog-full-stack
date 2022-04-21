import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import { Posts } from "./components/Posts";

function App() {
 const auth = localStorage.getItem("token") ? true : false;
 const [loggedIn, setLoggedIn] = useState(auth);

 return (
  <div className="App">
   {!loggedIn ? <Auth setLoggedIn={setLoggedIn} /> : <Posts loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
  </div>
 );
}

export default App;
