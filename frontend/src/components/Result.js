import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

import "../styles/Result.css"


function Result(props) {

  const navigate = useNavigate();

  const goto = () => {
    navigate(`/release/${props.artist}/${props.name}`);
  }

  return(
    <div className="result">
      <div className="result-container">
        <button className="result-overlay" onClick={goto} />
        <div className="result-cover" onClick={goto} />
        {props.image === "No Cover!" ?
            <FontAwesomeIcon icon={faCompactDisc} size="10x"/>
            :
            <img className="result-cover" src={props.image} />
        }
      </div>
      <div className="result-details" id={props.id}>
        <h1>
          {props.name}
        </h1>
        <h2>
          {props.artists}
        </h2>
        <p>
          {props.date}
        </p>
      </div>
    </div>
  )
}

export default Result;