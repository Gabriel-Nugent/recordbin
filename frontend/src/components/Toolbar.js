import { Link } from "react-router-dom";
import SearchBar from './SearchBar'
import logo from '../img/recordbin.png'
import '../styles/Toolbar.css'

function Toolbar(props) {
  if (props.signedin) {
    return (
      <header>
        <Link to="/" id="logo">
          <img src={logo} alt='RecordBin Logo'/>
        </Link>
        <div id="right_links">
          <SearchBar />
        </div>
      </header>
    );
  }
  else if (props.page === "signin") {
    return (
      <header>
        <Link to="/" id="logo">
          <img src={logo} alt='RecordBin Logo'/>
        </Link>
        <div id="right_links">
          <SearchBar />
          <Link id="create_account" >Create Account</Link>
        </div>
      </header>
    );
  }
  else if (props.page == "create") {
    return (
      <header>
        <Link to="/" id="logo">
          <img src={logo} alt='RecordBin Logo'/>
        </Link>
        <div id="right_links">
          <SearchBar />
          <Link to="/signin" id="sign in">Sign in</Link>
        </div>
      </header>
    );
  }
  else {
    return (
      <header>
        <Link to="/" id="logo">
          <img src={logo} alt='RecordBin Logo'/>
        </Link>
        <div id="right_links">
          <SearchBar />
          <Link id="create_account" >Create Account</Link>
          <Link to="/signin" id="sign in">Sign in</Link>
        </div>
      </header>
    );
  }
}

export default Toolbar;