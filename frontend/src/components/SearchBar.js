import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import '../styles/SearchBar.css'

const SearchBar = () => {
  const [search_input, set_search_input] = useState("");
  const navigate = useNavigate();

  const handle_change = (e) => {
    e.preventDefault();
    set_search_input(e.target.value);
  };

  const search = () => {
    let search_param = search_input;
    search_param = search_param.trim().replace(/\s+/g, '-').toLowerCase();
    navigate(`/search/${search_param}/1`);
  }

  const handleEnter = (e) => {
    if(e.keyCode == 13) {
      search.call();
    }
  }

  return(
    <form onSubmit={search} className='searchbar'>
      <input className='bar'
        type='search'
        autoComplete='on'
        minLength={3}
        placeholder='Search for albums here...'
        autoCorrect="off" 
        autoCapitalize="off" 
        spellCheck="false"
        onKeyDown={handleEnter}
        onChange={handle_change}
      />
      <button className='button'
        type='submit' 
        value={'Search'}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </button>
    </form>
  )
};

export default SearchBar;