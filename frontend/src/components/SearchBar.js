import React, {useState} from 'react'

const SearchBar = () => {
  const [search_input, set_search_input] = useState("");

  const handle_change = (e) => {
    e.preventDefault();
    set_search_input(e.target.value);
  };

  async function retrieve_results() {

  }

  return(
    <form>
      <input 
      type='search'
      autoComplete='on'
      minLength={3}
      placeholder='Search here'
      >
      </input>
      <button onClick={retrieve_results}>
        Submit
      </button>
    </form>
  )
};

export default SearchBar;