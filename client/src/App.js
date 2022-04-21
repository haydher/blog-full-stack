import { useEffect } from "react";
import { Auth } from "./components/Auth";
import "./App.css";
import { Posts } from "./components/Posts";

function App() {
 const loggedIn = false;

 useEffect(() => {
  return () => {};
 }, []);

 return <div className="App">{!loggedIn ? <Auth /> : <Posts />}</div>;
}

export default App;
