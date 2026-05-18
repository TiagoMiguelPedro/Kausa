import {Link} from "react-router-dom";
import imgLogo from "../../imagens/hero.png"
import Navbar from "./Navbar.jsx";


function Header(){

    return(
        <header>
            <nav>
                <Link to="/">
                    <img src={imgLogo} alt="Logo"/>
                </Link>
            </nav>
            <Navbar/>
        </header>
    );
}

export default Header;