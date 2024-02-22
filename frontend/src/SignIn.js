import './styles/SignIn.css'

import Toolbar from "./components/Toolbar.js";
import Footer from "./components/Footer.js"

function SignIn() {
  return (
    <div className="SignIn">
      <Toolbar />
      <main id='signin_content'>
        <div id='content'>
          <h1>Login to your Account</h1>
          <form>
            <label> Username
              <input type='text'/>
            </label>
            <label> Password
              <input type='text'/>
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