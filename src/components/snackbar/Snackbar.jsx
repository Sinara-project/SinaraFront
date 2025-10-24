import { useEffect } from "react"
import "./Snackbar.css"
import ErrorIcon from "../../assets/err1-snackbar-icon.svg"
import SuccessIcon from "../../assets/sucs1-snackbar-icon.svg"

function Snackbar({ type, title, message, isVisible }) {

    return (
            <div className={`snackbar-container ${isVisible ? "show" : ""}`}>
                <div className="snackbar-text">
                    <h1 className="snackbar-title">{title}</h1>
                    <h2 className="snackbar-message">{message}</h2>
                </div>
                <div className="snackbar-icon-container">
                    {type === "error" && (
                        <img src={ErrorIcon} alt="Ícone de erro" className="snackbar-icon" />
                    )}
                    {type === "success" && (
                        <img src={SuccessIcon} alt="Ícone de sucesso" className="snackbar-icon" />
                    )}
                </div>
            </div>
    )
}

export default Snackbar