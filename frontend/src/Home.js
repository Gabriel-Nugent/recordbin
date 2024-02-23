import './styles/Home.css';

import Toolbar from './components/Toolbar'
import HomeBody from './components/HomeBody'
import Footer from './components/Footer';

function Home() {
  return (
    <div className="App">
      <Toolbar signedin = {false} page = {"home"}/>
      <HomeBody />
      <Footer />
    </div>
  );
}

export default Home;
