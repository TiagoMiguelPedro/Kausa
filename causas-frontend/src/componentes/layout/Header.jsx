import {Link} from "react-router-dom";
import imgLogo from "../../imagens/logo_kausa.png"
import Navbar from "./Navbar.jsx";


function Header(){

    return(
        <header className="site-header">
            <div className="header-container">
                <div className="brand">
                    <img src={imgLogo} alt="Kausa Logo" className="brand-logo"/>
                    <span className="brand-name">Kausa</span>
                </div>

                <Navbar/>

                <div className="header-actions">
                    <button className="btn-login">Entrar</button>
                    <button className="btn-primary">Criar conta</button>
                </div>
            </div>
        </header>
    );
}

export default Header;