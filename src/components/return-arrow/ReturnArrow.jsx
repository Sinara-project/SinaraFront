import "./ReturnArrow.css";
import ReturnArrowIcon from "../../assets/return-arrow.svg";
import { useNavigate } from "react-router-dom";

function ReturnArrow({ lastEndpoint }) {
  const navigate = useNavigate();
  
  const navigateBack = () => {
    navigate(lastEndpoint);
  };

  return (
      <img
        className="return-arrow"
        src={ReturnArrowIcon}
        alt="Seta de retorno"
        onClick={navigateBack}
      />
  );
}

export default ReturnArrow;
