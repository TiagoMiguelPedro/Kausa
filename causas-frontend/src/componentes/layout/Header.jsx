import {Link, useNavigate} from "react-router-dom";
import imgLogo from "../../imagens/logo_kausa.png"
import Navbar from "./Navbar.jsx";
import axios from "axios";


function Header() {

    const user = JSON.parse(localStorage.getItem("user"));

    const LOGOUT_URL = "http://localhost:8000/causas/api/logout/";

    const navigate = useNavigate();

    const getCSRFToken = () => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    function handleLogout() {
        axios.post(LOGOUT_URL, {}, {
            withCredentials: true,
            headers: {
                "X-CSRFToken": getCSRFToken()
            }
        })
            .then(() => {
                localStorage.removeItem("user");
                navigate("/");
            })
            .catch((err) => {
                console.error("Erro ao fazer logout:", err.response?.data || err);
            });
    }

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="brand">
                    <img src={imgLogo} alt="Kausa Logo" className="brand-logo"/>
                    <span className="brand-name">Kausa</span>
                </div>
                <Navbar/>
                <div className="header-actions">
                    {user ? (
                        <div className="user-menu">
                            <span>Bem vindo à Kausa, {user.first_name || user.username}</span>
                            <button className="btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn-login">Entrar</Link>
                            <Link to="/register" className="btn-primary">Criar conta</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;