import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";

import "./styles/Profile.css"
import ListPreview from './components/ListPreview';
import LoadingPage from './components/LoadingPage';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

function Profile() {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUserInfo] = useState({});

  async function get_user_info() {
    try {
      const response = await client.get('/api/profile/',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  useEffect(() => {
    setLoading(true);

    const fetch_data = async () => {
      const user_data = await get_user_info();
      if (user_data) {
        setUserInfo(user_data);
        setLoading(false);
      } else {
        // Handle error or show error message
        setLoading(false);
      }
    };

    fetch_data().catch(console.error);

  }, []);

  return (
    <div className="profile">
      <Toolbar signedin={true}/>
      { loading ?
        <LoadingPage />
        :
        <main className="profile-page">
          <div className="profile-content">
            <div className="profile-bio">
              <h1 className="profile-page">{user.username}</h1>
              <div className='profile-image'>
                <FontAwesomeIcon icon={faCircleUser} size='10x'/>
              </div>
              <section className="profile-bio">
                <h2>{user.name}</h2>
                <h4>{user.dob}</h4>
                <h4>{user.location}</h4>
                <h4>Favorite Artists</h4>
                <div className='profile-artists'>
                  {user.favorite_artists}
                </div>
              </section>
            </div>
            <section className="list-area">
              <h2> Lists </h2>
              <div className='list-previews'>
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
                <ListPreview 
                  image={null}
                  name={"Test List"}
                  description={"This description describes the list in its entirety without leaving anything to the imagination "}
                />
              </div>
            </section>
          </div>
        </main>
      }
      <Footer/>
    </div>
  );
}

export default Profile;