import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

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
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input 
                type='text' 
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              /> 
            </div>
            <div className='input-container'>
              <div>
                <FontAwesomeIcon icon={faKey} />
              </div>
              <input 
                type='password' 
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input className='button' type='submit' value={"Sign in"}/>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn