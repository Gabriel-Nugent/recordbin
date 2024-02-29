import { useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

import './styles/Search.css';

import Toolbar from './components/Toolbar'
import Footer from './components/Footer';

function Search() {
  
  const { params, pagenum } = useParams();

  function load_results() {
    
  }

  return (
    <div className="App">
      <Toolbar signedin = {false} page = {"search"}/>
      <main id='results'>
        <Bars
          height="80"
          width="80"
          color="#6052ff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Search;
