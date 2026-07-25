import "./App.css";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./components/Login";
import Dashboard from "./Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");

const sendMessage = async () => {
  try {
    console.log("Send clicked");

    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    const data = await response.json();
    alert(data.message);

  } catch (error) {
    console.log(error);
    alert("Error");
  }
};
   
  
 
    
    return (
  <BrowserRouter>
    <Routes>
      <Route
  path="/"
  element={
    <div className="container">

    
      
      <nav>
        <h2>CodeFolio</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <Signup />
      <Login/>

      <section id="home" className="home">
        <h1>Hello, I'm Prachi 👋</h1>
        <h3>full stack developer</h3>
        <h2>Computer & IoT Student</h2>
        <p>
          Welcome to my CodeFolio. I create Web Development and IoT projects.
        </p>
        <button>View My Work</button>
      
       
      </section>
      <section id="about">
  <h2>About Me</h2>
  <p>
    I am a passionate developer interested in Web Development, React,
    Python and Artificial Intelligence.
  </p>
</section>

      <section id="projects">
        <h2>My Projects</h2>

        <div className="cards">
          <div className="card">
            <h3>Student Management System</h3>
            <p>Python + Database project.</p>
          </div>

          <div className="card">
            <h3>Snake Game</h3>
            <p>HTML, CSS and JavaScript game.</p>
          </div>

          <div className="card">
            <h3>AI Study Assistant</h3>
            <p>AI based learning project.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
  <h2>Contact Me</h2>

 <input 
  type="text" 
  placeholder="Enter your name"
  onChange={(e) => setName(e.target.value)}
/>
  <br /><br />

  <input 
  type="email" 
  placeholder="Enter your email"
  onChange={(e) => setEmail(e.target.value)}
/>
  <br /><br />
<textarea 
  placeholder="Enter your message"
  onChange={(e) => setMessage(e.target.value)}
></textarea>
  <br /><br />

  <button onClick={sendMessage}>Send</button>
</section>


      <footer>
        <p>© 2026 Prachi CodeFolio</p>
      </footer>

    </div>
  }
      />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  </BrowserRouter>
);
}

export default App;