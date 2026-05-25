import {useEffect, useState} from "react";
import axios from "axios";
import DestaqueCard from "../cards/DestaqueCard.jsx";
import ModalDetalhes from "../modal/ModalDetalhes.jsx";

function Causas() {

    const [causas, setCausas] = useState([]);
    const [causaSelecionada, setCausaSelecionada] = useState(null);

    const URL_CAUSAS = "http://localhost:8000/causas/causas/";

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get(URL_CAUSAS)
            .then((request) => {
                setCausas(request.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar causas:", err);
            });
    }, []);

    const getCSRFToken = () => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    const eliminarCausa = (causaId) => {
        if (!window.confirm("Tens a certeza que queres eliminar esta causa?")) {
            return;
        }

        axios.delete(`http://localhost:8000/causas/causa/${causaId}`, {
            withCredentials: true,
            headers: {
                "X-CSRFToken": getCSRFToken()
            }
        })
            .then(() => {
                setCausas((causasAtuais) =>
                    causasAtuais.filter((causa) => causa.id !== causaId)
                );

                if (causaSelecionada?.id === causaId) {
                    setCausaSelecionada(null);
                }
            })
            .catch((err) => {
                console.error("Erro ao eliminar causa:", err.response?.data || err);
                alert(err.response?.data?.msg || "Erro ao eliminar causa.");
            });
    };

    const mostrarEstado = (estado) => {
        if (estado === 0) return "Em votação";
        if (estado === 1) return "Ativa";
        if (estado === 2) return "Concluída";
        return "Desconhecido";
    };

    const votarCausa = async (causaId) => {
        try {
            const csrftoken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("csrftoken="))
                ?.split("=")[1];

            const response = await axios.post(
                `http://localhost:8000/causas/${causaId}/votar/`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": csrftoken,
                    },
                }
            );

            setCausas((causasAtuais) =>
                causasAtuais.map((causa) =>
                    causa.id === causaId
                        ? {
                            ...causa,
                            causa_nrVotos: response.data.causa_nrVotos,
                            causa_estado: response.data.causa_estado,
                            votado: response.data.votado,
                        }
                        : causa
                )
            );

        } catch (err) {
            console.error("Erro ao votar:", err);
            alert(err.response?.data?.erro || "Erro ao votar na causa.");
        }
    };

    return (
        <div className="page">
            <h1>Causas</h1>

            <div className="listagem-grid">
                {causas.length === 0 ? (
                    <p>Ainda não existem causas registadas.</p>
                ) : (
                    causas.map((causa) => (
                        <DestaqueCard
                            key={causa.id}
                            titulo={causa.causa_nome}
                            subtitulo={`Responsável: ${causa.causa_responsavel_nome}`}
                            descricao={causa.causa_descricao}
                            textoBotao="Ver detalhes"
                            onClick={() => setCausaSelecionada(causa)}
                            podeVotar={causa.causa_estado === 0}
                            votado={causa.votado}
                            onVote={() => votarCausa(causa.id)}
                            podeEliminar={user?.is_admin}
                            onDelete={() => eliminarCausa(causa.id)}
                        />
                    ))
                )}
            </div>

            {causaSelecionada && (
                <ModalDetalhes
                    titulo={causaSelecionada.causa_nome}
                    onClose={() => setCausaSelecionada(null)}
                >
                    <p>
                        <strong>Responsável:</strong>{" "}
                        {causaSelecionada.causa_responsavel_nome}
                    </p>

                    <p>
                        <strong>Descrição:</strong> {causaSelecionada.causa_descricao}
                    </p>

                    <p>
                        <strong>Número de votos:</strong> {causaSelecionada.causa_nrVotos}
                    </p>

                    <p>
                        <strong>Estado:</strong>{" "}
                        {mostrarEstado(causaSelecionada.causa_estado)}
                    </p>
                    {user?.is_admin && (
                        <button
                            className="btn btn-danger"
                            onClick={() => eliminarCausa(causaSelecionada.id)}
                        >
                            Eliminar causa
                        </button>
                    )}
                </ModalDetalhes>
            )}
        </div>
    );
}

export default Causas;