import './styles/Home.css';

import Toolbar from './components/Toolbar'
import Footer from './components/Footer';

function Home() {
  return (
    <div className="App">
      <Toolbar signedin = {true} page = {"home"}/>
      <main className='home-page'>
        Welcome to RecordBin. Search for releases using the search bars above.
      </main>
      <Footer />
    </div>
  );
}

export default Home;
