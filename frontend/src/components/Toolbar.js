import { Link } from "react-router-dom";
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import '../styles/Toolbar.css'

function Toolbar(props) {
  if (props.signedin) {
    return (
      <header>
        <div id="logo-container">
          <Link to="/" id="logo">
            RecordBin.
          </Link>
        </div>
        <SearchBar />
        <div id="right_links">
          <Link to="/profile/me" className="pfp" id="pfp-link"> 
            <FontAwesomeIcon icon={faCircleUser} size="2xl"/>
            Username
          </Link>
        </div>
    </header>
    );
  }
  else if (props.page === "signin") {
    return (
      <header>
        <div id="logo-container">
          <Link to="/" id="logo">
            RecordBin.
          </Link>
        </div>
        <SearchBar />
        <div id="right_links">
        <Link to="/create-account" id="create-account" >Create Account</Link>
        </div>
      </header>
    );
  }
  else if (props.page == "CreateAcc") {
    return (
      <header>
        <div id="logo-container">
          <Link to="/" id="logo">
            RecordBin.
          </Link>
        </div>
        <SearchBar />
        <div id="right_links">
          <Link to="/signin" id="sign-in">Sign in</Link>
        </div>
      </header>
    );
  }
  else {
    return (
      <header>
        <div id="logo-container">
          <Link to="/" id="logo">
            RecordBin.
          </Link>
        </div>
        <SearchBar />
        <div id="right_links">
          <Link to="/signin" id="sign-in">Sign in</Link>
          <Link to="/create-account" id="create-account" >Create Account</Link>
        </div>
      </header>
    );
  }
}

export default Toolbar;