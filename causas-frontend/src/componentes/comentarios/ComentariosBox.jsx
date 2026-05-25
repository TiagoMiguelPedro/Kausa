import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000/causas";

function ComentariosBox({ tipo, itemId }) {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const endpoint =
    tipo === "evento"
      ? `${API_BASE_URL}/eventos/${itemId}/comentarios/`
      : `${API_BASE_URL}/causa/${itemId}/comentarios/`;

  const getCSRFToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
  };

  async function carregarComentarios() {
    if (!itemId) return;

    try {
      setLoading(true);
      setErro("");

      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os comentários.");
      }

      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarComentario() {
    const textoLimpo = novoComentario.trim();

    if (!textoLimpo) {
      setErro("O comentário não pode estar vazio.");
      return;
    }

    try {
      setErro("");

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({
          comentario_texto: textoLimpo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Não foi possível adicionar o comentário.");
      }

      setComentarios((comentariosAtuais) => [data, ...comentariosAtuais]);
      setNovoComentario("");
    } catch (error) {
      setErro(error.message);
    }
  }

  async function apagarComentario(comentarioId) {
    try {
      setErro("");

      const response = await fetch(
        `${API_BASE_URL}/comentarios/${comentarioId}/apagar/`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );

      if (!response.ok && response.status !== 204) {
        const data = await response.json();
        throw new Error(data.msg || "Não foi possível apagar o comentário.");
      }

      setComentarios((comentariosAtuais) =>
        comentariosAtuais.filter((comentario) => comentario.id !== comentarioId)
      );
    } catch (error) {
      setErro(error.message);
    }
  }

  async function gostarComentario(comentarioId) {
    try {
      setErro("");

      const response = await fetch(
        `${API_BASE_URL}/comentarios/${comentarioId}/like/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Não foi possível gostar do comentário.");
      }

      setComentarios((comentariosAtuais) =>
        comentariosAtuais.map((comentario) =>
          comentario.id === comentarioId
            ? {
                ...comentario,
                liked: data.liked,
                total_likes: data.total_likes,
              }
            : comentario
        )
      );
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    carregarComentarios();
  }, [tipo, itemId]);

  return (
    <section className="comentarios-box">
      <div className="comentarios-header">
        <span>Interação</span>
        <h3>Comentários</h3>
        <p>
          Partilha opiniões, dúvidas ou sugestões relacionadas com esta{" "}
          {tipo === "evento" ? "atividade" : "causa"}.
        </p>
      </div>

      <div className="comentarios-form">
        <textarea
          rows="4"
          value={novoComentario}
          placeholder="Escreve um comentário..."
          onChange={(event) => setNovoComentario(event.target.value)}
        />

        <button
          type="button"
          className="btn-primary"
          onClick={adicionarComentario}
        >
          Comentar
        </button>
      </div>

      {erro && <p className="comentarios-erro">{erro}</p>}

      <div className="comentarios-lista">
        {loading ? (
          <p className="comentarios-vazio">A carregar comentários...</p>
        ) : comentarios.length === 0 ? (
          <p className="comentarios-vazio">
            Ainda não existem comentários. Sê o primeiro a comentar.
          </p>
        ) : (
          comentarios.map((comentario) => (
            <article key={comentario.id} className="comentario-card">
              <div className="comentario-topo">
                <div>
                  <strong>
                    {comentario.comentario_user_nome ||
                      `Utilizador #${comentario.comentario_user}`}
                  </strong>

                  <small>
                    {comentario.comentario_dataComentario
                      ? new Date(
                          comentario.comentario_dataComentario
                        ).toLocaleString("pt-PT")
                      : "Data indisponível"}
                  </small>
                </div>
              </div>

              <p>{comentario.comentario_texto}</p>

              <div className="comentario-acoes">
                <button
                  type="button"
                  onClick={() => gostarComentario(comentario.id)}
                >
                  {comentario.liked ? "Gostaste" : "Gostar"}
                  {comentario.total_likes !== undefined
                    ? ` · ${comentario.total_likes}`
                    : ""}
                </button>

                <button
                  type="button"
                  onClick={() => apagarComentario(comentario.id)}
                >
                  Apagar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ComentariosBox;