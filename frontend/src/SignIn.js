import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/SignIn.css';

import Toolbar from "./components/Toolbar.js";
import Footer from "./components/Footer.js"

function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The username you entered was: ${username}`);
    alert(`The password you entered was: ${password}`);

    navigate("/");
  }

  return (
    <div className="SignIn">
      <Toolbar signedin = {false} page = {"signin"}/>
      <main id='signin_content'>
        <div id='content'>
          <h1>Login to your Account</h1>
          <form onSubmit={handleSubmit}>
            <label> Username
              <input 
                type='text' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label> Password
              <input 
                type='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <input type='submit' value={"login"}/>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn