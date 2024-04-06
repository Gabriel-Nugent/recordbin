import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

import './styles/SignIn.css';

import Toolbar from "./components/Toolbar.js";
import Footer from "./components/Footer.js"
import background from "./images/recordbin.png"

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
    <div className="signin">
      <Toolbar signedin = {false} page = {"signin"}/>
      <div className='signin-area'>
        <main className="signin">
          <div className='signin-input'>
            <h2> Login </h2>
            <form className='signin'>
              <label or="username" className='signin'>
                <h3 className='signin'>Email or Username</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faUser} size='lg'/>
                  <input type='text'
                    className='signin'
                    id='username'
                    placeholder='ex: thomyorke@email.com'
                  />
                </div>
              </label>
              <label for="password" className='signin'>
                <h3 className='signin'>Password</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faKey} size='lg'/>
                  <input type='password'
                    className='signin' 
                    id='password'
                    placeholder='ex: BiggestThief123!'
                  />
                </div>
              </label>
              <button className="signin" type='submit'> Login</button>
            </form>
          </div>
          <section className="signin">
            <h1> Welcome Back to RecordBin. </h1>
            <p> log in using your <strong>Email</strong> and <strong>Password</strong> </p>
            <img className="signin" src={background} />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn