import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer"
import Track from "./components/Track"

import "./styles/Release.css";
import LoadingPage from './components/LoadingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

function Release() {

  const { group_id, release_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [release_info, setReleaseInfo] = useState();

  async function get_group_info() {
    
    const search_url = `https://musicbrainz.org/ws/2/release-group/${group_id}?inc=artists+genres`;

    return Axios({
      method: "get",
      url: search_url,
      headers: {
        "Accept": "application/json",
      },

      })
      .then(res => res.data);
  }

  async function get_release_info() {
    return Axios({
      method: "get",
      url: `http://musicbrainz.org/ws/2/release/${release_id}?inc=recordings`,
      headers: {
        "Accept": "application/json",
      },
    })
    .then(res => res.data)
    .catch((error) => {
      //try to fix the error or
      //notify the users about somenthing went wrong
      console.log(error.message)
    })
  }

  async function get_image() {
    return Axios({
      method: "get",
      url: `https://coverartarchive.org/release/${release_id}`,
      headers: {
        "Accept": "application/json",
      },
      validateStatus : false,
    })
    .then(res => res.data.images)
    .catch((error) => {
      //try to fix the error or
      //notify the users about somenthing went wrong
      console.log(error.message)
    })
  }

  useEffect(() => {
    setLoading(true)

    const fetch_data = async () => {
      const group_info = await get_group_info();
      const release_info = await get_release_info();
      const cover_info = await get_image();

      console.log(release_info);

      let artists = "";
      for (let i = 0; i < group_info["artist-credit"].length; i++) {
        artists += group_info["artist-credit"][i].name + group_info["artist-credit"][i].joinphrase;
      }

      let genres = "";
      for (let i = 0; i < group_info["genres"].length && i < 4; i++) {
        genres += group_info["genres"][i].name;
        if (i < group_info["genres"].length - 1 && i < 3) {
          genres += ", ";
        }
      }

      let cover = "";
      if (cover_info == undefined) {
        cover = "No Cover!";
      }
      else {
        cover = cover_info[0].image;
      }

      let track_components = [];
      const tracks = release_info.media[0].tracks;
      for (let i = 0; i < tracks.length; i++) {
        // get the length of the track
        let time = (tracks[i]["length"]) / 60000;
        const time_str = parseInt(time).toString() + ":" + parseInt((time % 1)*60).toString();

        track_components.push(<Track 
          position={tracks[i].position}
          title={tracks[i].title}
          length={time_str}
        />)
      }

      const release_data = {
        "title": group_info.title,
        "artists": artists,
        "date": group_info["first-release-date"],
        "genres": genres,
        "type": group_info["primary-type"],
        "cover": cover,
        "tracks": track_components
      }

      setReleaseInfo(release_data);
      setLoading(false);
    }

    fetch_data()
      .catch(console.error);

  }, []);

  return (
    <div className="release-page">
    <Toolbar />
    {loading ?
      <LoadingPage />
      :
      <main className="release-page"> 
        <div className="release-page-upper">
          <div className='release-image-container'>
            { release_info.cover === "No Cover!" ?
              <FontAwesomeIcon icon={faCompactDisc} size='10x'/>
              :
              <img className="release-page" src={release_info.cover}/>
            }
          </div>
          <section className="release-info">
            <h1>{release_info.title}</h1>
            <h2>{release_info.artists}</h2>
            <p>{release_info.type}</p>
            <p>{release_info.date}</p>
            <p>{release_info.genres}</p>
          </section>
        </div>
        <div className="release-page-lower">
          <section className="release-tracks">
            <h2>Tracks</h2>
            <div className="release-track-container">
              {release_info.tracks}
            </div>
          </section>
          <section className="release-actions">
            <button 
              className="release-actions" 
              id="add-to-list">
              Add to List
            </button>
            <button 
              className="release-actions" 
              id="">
              To Be Implemented
            </button>
            <button 
              className="release-actions" 
              id="">
              To Be Implemented
            </button>
          </section>
        </div>
      </main>
    }
    <Footer />
    </div>
  )
}

export default Release;