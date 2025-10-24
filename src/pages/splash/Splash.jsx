import "./Splash.css"
import Logo from '../../assets/logo-transparent.svg'
import LogoEnd from '../../assets/logo-end-transparent.svg'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Splash() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate();

    const currentUser = localStorage.getItem("user");

    const [changeElements, setChange] = useState(false);

    async function startScreen(params) {
        await sleep(1000);
        setChange(true);
        await sleep(1500);
        if (currentUser) {
            navigate("/home");
        } else {
            navigate("/cadastrar");
        }
    }

    useEffect(() => {
        startScreen();
    }, [])
    
    return (
        <section className="splash-section">
            <div className={`splash-content ${changeElements ? "change" : ""}`}>
                <img src={Logo} alt="" className={`splash-logo ${changeElements ? "change" : ""}`} />
                <img src={LogoEnd} alt="" className={`splash-text ${changeElements ? "change" : ""}`} />
            </div>
        </section>
    )
}

export default Splash;