import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import './styles/CreateAcc.css'

import Toolbar from "./components/Toolbar.js";
import Footer from "./components/Footer.js"
import background from "./images/recordbin.png"

function CreateAcc() {

  const [email_data, setEmail] = useState("");
  const [username_data, setUsername] = useState("");
  const [password_data, setPassword] = useState("");
  const navigate = useNavigate();

  // called when 'Create Account' button is pressed
  const handleSubmit = (event) => {
    event.preventDefault();

    // values from input fields
    const email = email_data;
    const username = username_data;
    const password = password_data;

    // redirects user to homepage
    // navigate("/");
  }

  return (
    <div className="CreateAcc">
      <Toolbar signedin = {false} page = {"CreateAcc"}/>
      <div className='CreateAcc-area'>
        <main className="CreateAcc">
          <div className='CreateAcc-input'>
            <h2> Create a New Account </h2>
            <form className='CreateAcc'>
              <label htmlFor="email" className='CreateAcc'>
                <h3 className='CreateAcc'>Email</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faEnvelope} size='lg'/>
                  <input type='text'
                    className='CreateAcc'
                    id='email'
                    placeholder='ex: thomyorke@email.com'
                    value={email_data}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete=''
                  />
                </div>
              </label><label htmlFor="username" className='CreateAcc'>
                <h3 className='CreateAcc'>Username</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faUser} size='lg'/>
                  <input type='text'
                    className='CreateAcc'
                    id='username'
                    placeholder='ex: BjorkFan01'
                    value={username_data}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete=''
                  />
                </div>
              </label>
              <label htmlFor="password" className='CreateAcc'>
                <h3 className='CreateAcc'>Password</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faKey} size='lg'/>
                  <input type='password'
                    className='CreateAcc' 
                    id='password'
                    placeholder='ex: BiggestThief123!'
                    value={password_data}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </label>
              <label htmlFor="password-confirmation" className='CreateAcc'>
                <h3 className='CreateAcc'>Confirm Password</h3>
                <div className='input-area'>
                  <FontAwesomeIcon icon={faCheck} size='lg'/>
                  <input type='password'
                    className='CreateAcc' 
                    id='password-confirmation'
                    placeholder='ex: BiggestThief123!'
                  />
                </div>
              </label>
              <button className="CreateAcc" type='submit' onClick={handleSubmit}> Create Account</button>
              <p className='CreateAcc'> Already have an account? Sign in  
                <Link to="/signin" id="signin-link">Here.</Link>
              </p>
            </form>
          </div>
          <section className="CreateAcc">
            <h1> Welcome to RecordBin. </h1>
            <p> Create an account using your <strong>Email</strong> and a strong <strong>Password</strong> </p>
            <img className="CreateAcc" src={background} />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default CreateAcc