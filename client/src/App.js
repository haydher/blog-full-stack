import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import { Posts } from "./components/Posts";

function App() {
 const [loggedIn, setLoggedIn] = useState(false);

 return (
  <div className="App">
   {!loggedIn ? <Auth setLoggedIn={setLoggedIn} /> : <Posts loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
  </div>
 );
}

export default App;
