import {useEffect, useState} from "react";
import axios from "axios";
import DestaqueCard from "../cards/DestaqueCard.jsx";
import ModalDetalhes from "../modal/ModalDetalhes.jsx";

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventoEmEdicao, setEventoEmEdicao] = useState(null);

    const URL_EVENTOS = "http://localhost:8000/causas/eventos/";

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get(URL_EVENTOS)
            .then((request) => {
                setEventos(request.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar eventos:", err);
            });
    }, []);

    const getCSRFToken = () => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    const podeEliminarEvento = (evento) => {
        if (!user) return false;

        if (user.is_admin) return true;

        return user.id === evento.evento_criador && evento.numero_participantes === 0;
    };

    const eliminarEvento = (eventoId) => {
        if (!window.confirm("Tens a certeza que queres eliminar este evento?")) {
            return;
        }

        axios.delete(`http://localhost:8000/causas/eventos/${eventoId}`, {
            withCredentials: true,
            headers: {
                "X-CSRFToken": getCSRFToken()
            }
        })
            .then(() => {
                setEventos((eventosAtuais) =>
                    eventosAtuais.filter((evento) => evento.id !== eventoId)
                );

                if (eventoSelecionado?.id === eventoId) {
                    setEventoSelecionado(null);
                }
            })
            .catch((err) => {
                console.error("Erro ao eliminar evento:", err.response?.data || err);
                alert(err.response?.data?.msg || "Erro ao eliminar evento.");
            });
    };

    const podeInscreverEvento = (evento) => {
        if (!user) return false;

        return (
            evento.evento_ativo &&
            !evento.evento_lotado &&
            evento.numero_participantes < evento.evento_limiteParticipantes
        );
    };

    const inscreverEvento = (eventoId) => {
        axios.post(
            `http://localhost:8000/causas/eventos/${eventoId}/participantes/`,
            {},
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }
            }
        )
            .then((response) => {
                alert(response.data.msg);

                setEventos((eventosAtuais) =>
                    eventosAtuais.map((evento) =>
                        evento.id === eventoId
                            ? {
                                ...evento,
                                numero_participantes: response.data.numero_participantes,
                                evento_lotado: response.data.evento_lotado
                            }
                            : evento
                    )
                );

                if (eventoSelecionado?.id === eventoId) {
                    setEventoSelecionado((eventoAtual) => ({
                        ...eventoAtual,
                        numero_participantes: response.data.numero_participantes,
                        evento_lotado: response.data.evento_lotado
                    }));
                }
            })
            .catch((err) => {
                console.error("Erro ao inscrever no evento:", err.response?.data || err);
                alert(err.response?.data?.msg || "Erro ao inscrever no evento.");
            });
    };

    const podeEditarEvento = (evento) => {
        if (!user) return false;

        if (user.is_admin) return true;

        return user.id === evento.evento_criador;
    };

    const editarEvento = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:8000/causas/eventos/${eventoEmEdicao.id}`,
                {
                    evento_causa: eventoEmEdicao.evento_causa,
                    evento_nome: eventoEmEdicao.evento_nome,
                    evento_descricao: eventoEmEdicao.evento_descricao,
                    evento_localizacao: eventoEmEdicao.evento_localizacao,
                    evento_dataHora: eventoEmEdicao.evento_dataHora,
                    evento_limiteParticipantes: eventoEmEdicao.evento_limiteParticipantes,
                    evento_lotado: eventoEmEdicao.evento_lotado,
                    evento_ativo: eventoEmEdicao.evento_ativo
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCSRFToken()
                    }
                }
            );

            setEventos((eventosAtuais) =>
                eventosAtuais.map((evento) =>
                    evento.id === eventoEmEdicao.id ? response.data : evento
                )
            );

            if (eventoSelecionado?.id === eventoEmEdicao.id) {
                setEventoSelecionado(response.data);
            }

            setEventoEmEdicao(null);

        } catch (err) {
            console.error("Erro ao editar evento:", err.response?.data || err);
            alert(err.response?.data?.msg || "Erro ao editar evento.");
        }
    };


    return (
        <div className="page">
            <h1>Eventos</h1>

            <div className="listagem-grid">
                {eventos.length === 0 ? (
                    <p>Ainda não existem eventos registados.</p>
                ) : (
                    eventos.map((evento) => (
                        <DestaqueCard
                            key={evento.id}
                            titulo={evento.evento_nome}
                            subtitulo={`Causa: ${evento.causa_nome}`}
                            descricao={evento.evento_descricao}
                            textoBotao="Ver detalhes"
                            onClick={() => setEventoSelecionado(evento)}
                            podeEliminar={podeEliminarEvento(evento)}
                            onDelete={() => eliminarEvento(evento.id)}
                            podeInscrever={podeInscreverEvento(evento)}
                            onInscrever={() => inscreverEvento(evento.id)}
                            podeEditar={podeEditarEvento(evento)}
                            onEdit={() => setEventoEmEdicao(evento)}
                        />
                    ))
                )}
            </div>

            {eventoSelecionado && (
                <ModalDetalhes
                    titulo={eventoSelecionado.evento_nome}
                    onClose={() => setEventoSelecionado(null)}
                >
                    <p>
                        <strong>Causa:</strong> {eventoSelecionado.causa_nome}
                    </p>
                    <p>
                        <strong>Criador:</strong>{" "}
                        {eventoSelecionado.evento_criador_nome || "N/A"}
                    </p>

                    <p>
                        <strong>Descrição:</strong> {eventoSelecionado.evento_descricao}
                    </p>

                    <p>
                        <strong>Localização:</strong> {eventoSelecionado.evento_localizacao}
                    </p>

                    <p>
                        <strong>Data e hora:</strong>{" "}
                        {new Date(eventoSelecionado.evento_dataHora).toLocaleString("pt-PT")}
                    </p>

                    <p>
                        <strong>Limite de participantes:</strong>{" "}
                        {eventoSelecionado.evento_limiteParticipantes}
                    </p>
                    <p>
                        <strong>Participantes inscritos:</strong>{" "}
                        {eventoSelecionado.numero_participantes}
                    </p>

                    <p>
                        <strong>Lotado:</strong>{" "}
                        {eventoSelecionado.evento_lotado ? "Sim" : "Não"}
                    </p>

                    <p>
                        <strong>Ativo:</strong>{" "}
                        {eventoSelecionado.evento_ativo ? "Sim" : "Não"}
                    </p>
                    {podeEliminarEvento(eventoSelecionado) && (
                        <button
                            className="btn btn-danger"
                            onClick={() => eliminarEvento(eventoSelecionado.id)}
                        >
                            Eliminar evento
                        </button>
                    )}
                </ModalDetalhes>
            )}
            {eventoEmEdicao && (
                <ModalDetalhes
                    titulo="Editar evento"
                    onClose={() => setEventoEmEdicao(null)}
                >
                    <form className="form-container" onSubmit={editarEvento}>
                        <label>Nome do evento:</label>
                        <input
                            type="text"
                            value={eventoEmEdicao.evento_nome}
                            onChange={(e) =>
                                setEventoEmEdicao({
                                    ...eventoEmEdicao,
                                    evento_nome: e.target.value
                                })
                            }
                            required
                        />

                        <label>Descrição:</label>
                        <textarea
                            value={eventoEmEdicao.evento_descricao}
                            onChange={(e) =>
                                setEventoEmEdicao({
                                    ...eventoEmEdicao,
                                    evento_descricao: e.target.value
                                })
                            }
                            required
                        />

                        <label>Localização:</label>
                        <input
                            type="text"
                            value={eventoEmEdicao.evento_localizacao}
                            onChange={(e) =>
                                setEventoEmEdicao({
                                    ...eventoEmEdicao,
                                    evento_localizacao: e.target.value
                                })
                            }
                            required
                        />

                        <label>Data e hora:</label>
                        <input
                            type="datetime-local"
                            value={eventoEmEdicao.evento_dataHora?.slice(0, 16)}
                            onChange={(e) =>
                                setEventoEmEdicao({
                                    ...eventoEmEdicao,
                                    evento_dataHora: e.target.value
                                })
                            }
                            required
                        />

                        <label>Limite de participantes:</label>
                        <input
                            type="number"
                            min={eventoEmEdicao.numero_participantes || 1}
                            value={eventoEmEdicao.evento_limiteParticipantes}
                            onChange={(e) =>
                                setEventoEmEdicao({
                                    ...eventoEmEdicao,
                                    evento_limiteParticipantes: e.target.value
                                })
                            }
                            required
                        />

                        <p>
                            <strong>Participantes inscritos:</strong>{" "}
                            {eventoEmEdicao.numero_participantes}
                        </p>

                        <button type="submit" className="btn btn-primary">
                            Guardar alterações
                        </button>
                    </form>
                </ModalDetalhes>
            )}
        </div>
    );
}

export default Eventos;