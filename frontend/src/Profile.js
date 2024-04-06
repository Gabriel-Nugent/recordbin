import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

import "./styles/Profile.css"

function Profile() {
  return (
    <div className="profile">
      <Toolbar signedin={true}/>
      <main className="profile-page">
        <h1 className="profile-page">Username</h1>
        <div className="profile-content">
          <div className="profile-bio">
            <img></img>
            <section></section>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Profile;