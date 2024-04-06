import { useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import Axios from 'axios'

import './styles/Search.css';

import Toolbar from './components/Toolbar'
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import { useState, useEffect } from 'react';

function Search() {
  
  const { params, pagenum } = useParams();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  async function get_results() {
    return Axios({
      method: "get",
      url: `https://musicbrainz.org/ws/2/release-group/?query=release:${params}`,
      headers: {
        "Accept": "application/json",
      },

      })
      .then(res => res.data);
  }

  async function get_image(release) {
      return Axios({
        method: "get",
        url: `https://coverartarchive.org/release/${release.id}`,
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
      const data = await get_results();
      const release_groups = data["release-groups"];
      
      console.log(release_groups);

      //let found = [];
      let releases = [];
      for (let i = 0; i < release_groups.length; i++) {
        
        const group = release_groups[i];
        const release_data = group.releases[0]
        
        if (group.score < 60) {
          break;
        }

        // get artists of release
        let artists = []
        for (let j = 0; j < group["artist-credit"].length; j++) {
          artists.push(group["artist-credit"][j].name)
        }

        const release = {
          "id": release_data.id,
          "name": release_data.title,
          "artists": artists,
          "date": group["first-release-date"],
        }

        releases.push(release)
      }

      for (let i in releases) {
        const images = await get_image(releases[i]);

        if (images == undefined) {
          releases[i]["image"] = "No Cover!";
        }
        else {
          releases[i]["image"] = images[0].image;
        }
      }

      setResults(releases);
      setLoading(false);
    }

    fetch_data()
      .catch(console.error);

  }, []);

  return (
    <div className="App">
      <Toolbar signedin = {false} page = {"search"}/>
      {loading ?
        <main id='loading-page'>
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
        :
        <main id='results-page'>
          <h2 className='search-header'>Results for "{params}"</h2>
          <SearchResults 
            data={results}
            pagenum={pagenum}
          />
        </main>
      }
      <Footer />
    </div>
  );
}

export default Search;
