import "./ReturnArrow.css";
import ReturnArrowIcon from "../../assets/return-arrow.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ReturnArrow({ lastEndpoint, sidebar }) {
  const navigate = useNavigate();

  const [haveSidebar, setSidebar] = useState(false);

  useEffect(() => {
    if(!sidebar) {
      return;
    }

    setSidebar(sidebar);
  })
  
  const navigateBack = () => {
    navigate(lastEndpoint);
  };

  return (
      <img
        className={`return-arrow ${haveSidebar ? "sidebar" : ""}`}
        src={ReturnArrowIcon}
        alt="Seta de retorno"
        onClick={navigateBack}
      />
  );
}

export default ReturnArrow;
