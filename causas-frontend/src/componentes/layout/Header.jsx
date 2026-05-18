import {Link} from "react-router-dom";
import imgLogo from "../../imagens/logo_kausa.png"
import Navbar from "./Navbar.jsx";


function Header(){

    return(
        <header className="site-header">
          <div className="header-container">
            <div className="brand">
              <div className="brand-icon">♡</div>
              <span className="brand-name">Kausa</span>
            </div>

            <nav className="nav-links">
              <a href="#inicio">Início</a>
              <a href="#causas">Causas</a>
              <a href="#sobre">Sobre</a>
              <a href="#contactos">Contactos</a>
            </nav>

            <div className="header-actions">
              <button className="btn-login">Entrar</button>
              <button className="btn-primary">Criar conta</button>
            </div>
          </div>
        </header>
    );
}

export default Header;