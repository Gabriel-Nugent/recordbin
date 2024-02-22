import SearchBar from './SearchBar'
import logo from '../img/recordbin.png'
import '../styles/Toolbar.css'

function Toolbar(props) {
  if (!props.signedin) {
    return (
      <header>
        <img src={logo} alt='RecordBin Logo'/>
        <div id="right_links">
          <SearchBar />
          <a id="create_account" href="">Create Account</a>
          <a id="sign_in" href="">Sign in</a>
        </div>
      </header>
    );
  }
  else {
    return (
      <header>
        <img src={logo} alt='RecordBin Logo'/>
        <div id="right_links">
          <SearchBar />
        </div>
      </header>
    );
  }
}

export default Toolbar;