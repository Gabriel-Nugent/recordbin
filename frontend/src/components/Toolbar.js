import { Link } from "react-router-dom";
import SearchBar from './SearchBar'
import logo from '../img/recordbin.png'
import '../styles/Toolbar.css'

function Toolbar(props) {
  if (props.signedin) {
    return (
      <header>
        <Link to="/" id="logo">
          RecordBin.
        </Link>
        <SearchBar />
        <div id="right_links">
        </div>
      </header>
    );
  }
  else if (props.page === "signin") {
    return (
      <header>
        <Link to="/" id="logo">
          RecordBin.
        </Link>
        <SearchBar />
        <div id="right_links">
          <Link id="create-account" >Create Account</Link>
        </div>
      </header>
    );
  }
  else if (props.page == "create") {
    return (
      <header>
        <Link to="/" id="logo">
          RecordBin.
        </Link>
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
        <Link to="/" id="logo">
          RecordBin.
        </Link>
        <SearchBar />
        <div id="right_links">
          <Link to="/signin" id="sign-in">Sign in</Link>
          <Link id="create-account" >Create Account</Link>
        </div>
      </header>
    );
  }
}

export default Toolbar;