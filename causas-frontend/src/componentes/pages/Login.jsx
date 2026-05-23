import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const LOGIN_URL = "http://localhost:8000/causas/api/login/";

    function handleLogin(e) {
        e.preventDefault();

        console.log("Cliquei no login");
        console.log("Username enviado:", username);
        console.log("Password enviada:", password);

        axios
            .post(
                LOGIN_URL,
                {username, password},
                {withCredentials: true}
            )
            .then((response) => {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
                setErro(err.response?.data?.msg || "Erro ao iniciar sessão.");
            });
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <h1>Entrar na Kausa</h1>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="O teu nome de utilizador"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="A tua password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {erro && <p className="auth-error">{erro}</p>}

                    <button type="submit" className="btn btn-primary auth-button">
                        Entrar
                    </button>
                </form>

                <p className="auth-footer">
                    Ainda não tens conta? <Link to="/register">Criar conta</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;