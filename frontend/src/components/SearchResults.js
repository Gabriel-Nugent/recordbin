import { useEffect } from "react";
import Result from './Result.js'

function SearchResults(props) {

  const render_results = () => {
    const amt_per_page = 10;
    const current_idx = (props.pagenum - 1) * amt_per_page;
    let results = [];
    const data = props.data;

    for (let i = current_idx; i < amt_per_page && i < data.length; i++) {
      results.push(<Result 
        id={data[i].id}
        image={data[i].image}
        name={data[i].name}
        artists={data[i].artists}
        date={data[i].date}
      />)
    }

    return results
  }

  return (
    <div>
      {render_results()}
    </div>
  )
  
}

export default SearchResults;