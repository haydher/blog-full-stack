import React, { Component } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { Posts } from "./components/Posts";

export default class App extends Component {
 state = {
  loggedIn: localStorage.getItem("token") ? true : false,
 };

 handleLoggedIn = (val) => this.setState({ loggedIn: val });

 render() {
  return (
   <div className="App">
    {!this.state.loggedIn ? (
     <Auth handleLoggedIn={this.handleLoggedIn} />
    ) : (
     <Posts loggedIn={this.state.loggedIn} setLoggedIn={this.setState} />
    )}
   </div>
  );
 }
}

// import { useState } from "react";
// import { Auth } from "./components/Auth";
// import "./App.css";
// import { Posts } from "./components/Posts";

// function App() {
//  const auth = localStorage.getItem("token") ? true : false;
//  const [loggedIn, setLoggedIn] = useState(auth);

//  return (
//   <div className="App">
//    {!loggedIn ? <Auth setLoggedIn={setLoggedIn} /> : <Posts loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
//   </div>
//  );
// }

// export default App;
