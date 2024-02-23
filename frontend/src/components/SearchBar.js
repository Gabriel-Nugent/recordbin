import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

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
    navigate(`/search/${search_param}`);
  }

  const handleEnter = (e) => {
    if(e.keyCode == 13) {
      search.call();
    }
  }

  return(
    <form onSubmit={search}>
      <input 
        type='search'
        autoComplete='on'
        minLength={3}
        placeholder='Search here'
        onKeyDown={handleEnter}
        onChange={handle_change}
      />
      <input 
        type='submit' 
        value={'search'}
      />
    </form>
  )
};

export default SearchBar;