import "./Loading.css";
import LoadingIcon from "../../assets/loading-blue.svg"

function Loading() {
    return(
        <img src={LoadingIcon} alt="" className="loading-icon" />
    )
}

export default Loading;