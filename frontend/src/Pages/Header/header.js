import './header.css'
import { Link } from "react-router-dom"
import logo from "../../assets/icons/logo.png"

export const Header = () => {
    return <header>
    <div className="header-container">
        <div className="logo">
            <Link to="/dashboard">
                <img src={logo} alt="DERC Logo"/>
            </Link>
        </div>
        <div className="gov-logo">
            {/* <img src={govLogo} alt="Government Logo"/> */}
        </div>
    </div>
</header>
}