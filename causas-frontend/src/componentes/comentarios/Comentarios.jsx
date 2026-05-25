import {useEffect, useState} from "react";
import axios from "axios";

function Comentarios({tipo, id}) {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [erro, setErro] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const getCSRFToken = () => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    const getUrlComentarios = () => {
        if (tipo === "causa") {
            return `http://localhost:8000/causas/causa/${id}/comentarios/`;
        }

        return `http://localhost:8000/causas/eventos/${id}/comentarios/`;
    };

    useEffect(() => {
        axios.get(getUrlComentarios(), {withCredentials: true})
            .then((response) => {
                setComentarios(response.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar comentários:", err.response?.data || err);
            });
    }, [tipo, id]);

    const adicionarComentario = (e) => {
        e.preventDefault();

        if (!novoComentario.trim()) {
            setErro("O comentário não pode estar vazio.");
            return;
        }

        axios.post(
            getUrlComentarios(),
            {
                comentario_texto: novoComentario
            },
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }
            }
        )
            .then((response) => {
                setComentarios((comentariosAtuais) => [
                    response.data,
                    ...comentariosAtuais
                ]);

                setNovoComentario("");
                setErro("");
            })
            .catch((err) => {
                console.error("Erro ao comentar:", err.response?.data || err);
                setErro(err.response?.data?.msg || "Erro ao adicionar comentário.");
            });
    };

    const apagarComentario = (comentarioId) => {
        if (!window.confirm("Tens a certeza que queres apagar este comentário?")) {
            return;
        }

        axios.delete(
            `http://localhost:8000/causas/comentarios/${comentarioId}/apagar/`,
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }
            }
        )
            .then(() => {
                setComentarios((comentariosAtuais) =>
                    comentariosAtuais.filter((comentario) => comentario.id !== comentarioId)
                );
            })
            .catch((err) => {
                console.error("Erro ao apagar comentário:", err.response?.data || err);
                alert(err.response?.data?.msg || "Erro ao apagar comentário.");
            });
    };

    const gostarComentario = (comentarioId) => {
        axios.post(
            `http://localhost:8000/causas/comentarios/${comentarioId}/like/`,
            {},
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }
            }
        )
            .then((response) => {
                setComentarios((comentariosAtuais) =>
                    comentariosAtuais.map((comentario) =>
                        comentario.id === comentarioId
                            ? {
                                ...comentario,
                                liked: response.data.liked,
                                total_likes: response.data.total_likes
                            }
                            : comentario
                    )
                );
            })
            .catch((err) => {
                console.error("Erro ao gostar do comentário:", err.response?.data || err);
                alert(err.response?.data?.msg || "Erro ao gostar do comentário.");
            });
    };

    const podeApagarComentario = (comentario) => {
        if (!user) return false;

        return user.is_admin || user.id === comentario.comentario_user;
    };

    return (
        <section className="comentarios-section">
            <h3>Comentários</h3>

            {user ? (
                <form className="comentario-form" onSubmit={adicionarComentario}>
                    <textarea
                        value={novoComentario}
                        onChange={(e) => setNovoComentario(e.target.value)}
                        placeholder="Escreve um comentário..."
                    />

                    {erro && <p className="form-error">{erro}</p>}

                    <button type="submit" className="btn btn-primary">
                        Comentar
                    </button>
                </form>
            ) : (
                <p>Inicia sessão para poderes comentar.</p>
            )}

            <div className="comentarios-lista">
                {comentarios.length === 0 ? (
                    <p>Ainda não existem comentários.</p>
                ) : (
                    comentarios.map((comentario) => (
                        <article key={comentario.id} className="comentario-card">
                            <p>
                                <strong>{comentario.comentario_user_nome}</strong>
                            </p>

                            <p>{comentario.comentario_texto}</p>

                            <small>
                                {new Date(comentario.comentario_dataComentario).toLocaleString("pt-PT")}
                            </small>

                            <div className="card-actions">
                                {user && (
                                    <button
                                        className={`btn-voto ${comentario.liked ? "votado" : ""}`}
                                        onClick={() => gostarComentario(comentario.id)}
                                    >
                                        ♥ {comentario.total_likes}
                                    </button>
                                )}

                                {podeApagarComentario(comentario) && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => apagarComentario(comentario.id)}
                                    >
                                        Apagar
                                    </button>
                                )}
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default Comentarios;