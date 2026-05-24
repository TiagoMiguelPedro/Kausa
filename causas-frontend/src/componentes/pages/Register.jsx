import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const SIGNUP_URL = "http://localhost:8000/causas/api/signup/";

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmarPassword) {
            setErro("A password não coincide.");
            return;
        }

        axios
            .post(SIGNUP_URL, {
                username,
                first_name: nome,
                last_name: apelido,
                email,
                password,
            })
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                setErro(err.response?.data?.msg || "Erro ao criar conta.");
            });
    }

    return (
        <main className="auth-page">
            <section className="register-card">
                <div className="auth-header">
                    <h1>Criar conta</h1>
                    <p>Começa a apoiar causas com impacto.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            required
                            placeholder="Username de login"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            required
                            placeholder="O teu nome primeiro nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Apelido</label>
                        <input
                            type="text"
                            required
                            placeholder="O teu nome primeiro nome"
                            value={apelido}
                            onChange={(e) => setApelido(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="Cria uma password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar password</label>
                        <input
                            type="password"
                            placeholder="Repete a password"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                        />
                        {erro && <p className="auth-error">{erro}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Criar conta
                    </button>
                </form>
                <p className="auth-footer">

                    <p></p>
                    Já tens conta? <Link to="/login">Entrar</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;