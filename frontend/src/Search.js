import './styles/Search.css';

import Toolbar from './components/Toolbar'
import Footer from './components/Footer';

function Search() {

  return (
    <div className="App">
      <Toolbar signedin = {false} page = {"search"}/>
      <main id='results'>

      </main>
      <Footer />
    </div>
  );
}

export default Search;
