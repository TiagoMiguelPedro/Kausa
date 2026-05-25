import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CriarEvento() {
    const [causas, setCausas] = useState([]);

    const [eventoCausa, setEventoCausa] = useState("");
    const [eventoNome, setEventoNome] = useState("");
    const [eventoDescricao, setEventoDescricao] = useState("");
    const [eventoLocalizacao, setEventoLocalizacao] = useState("");
    const [eventoDataHora, setEventoDataHora] = useState("");
    const [eventoLimiteParticipantes, setEventoLimiteParticipantes] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const URL_CAUSAS = "http://localhost:8000/causas/causas/";
    const URL_EVENTOS = "http://localhost:8000/causas/eventos/";

    const getCSRFToken = () => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    useEffect(() => {
        axios.get(URL_CAUSAS, {withCredentials: true})
            .then((response) => {
                const causasAtivas = response.data.filter(
                    (causa) => causa.causa_estado === 1
                );

                setCausas(causasAtivas);
            })
            .catch((err) => {
                console.error("Erro ao carregar causas:", err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoEvento = {
            evento_causa: eventoCausa,
            evento_nome: eventoNome,
            evento_descricao: eventoDescricao,
            evento_localizacao: eventoLocalizacao,
            evento_dataHora: eventoDataHora,
            evento_limiteParticipantes: eventoLimiteParticipantes,
            evento_lotado: false,
            evento_ativo: true
        };

        axios.post(URL_EVENTOS, novoEvento, {
            withCredentials: true,
            headers: {
                "X-CSRFToken": getCSRFToken()
            }
        })
            .then(() => {
                navigate("/eventos");
            })
            .catch((err) => {
                console.error("Erro ao criar evento:", err.response?.data || err);
                setErro(err.response?.data?.msg || "Não foi possível criar o evento.");
            });
    };

    if (causas.length === 0) {
    return (
        <div className="page">
            <h1>Criar Evento</h1>

            <h2 className="form-error">
                Ainda não existem causas ativas. Só é possível criar eventos para causas ativas.
            </h2>

            <button
                className="btn btn-primary"
                onClick={() => navigate("/causas")}
            >
                Ver causas
            </button>
        </div>
    );
}

    return (
        <div className="page">
            <h1>Criar Evento</h1>

            <form className="form-container" onSubmit={handleSubmit}>
                <label>Causa associada:</label>
                <select
                    value={eventoCausa}
                    onChange={(e) => setEventoCausa(e.target.value)}
                    required
                >
                    <option value="">Seleciona uma causa</option>

                    {causas.map((causa) => (
                        <option key={causa.id} value={causa.id}>
                            {causa.causa_nome}
                        </option>
                    ))}
                </select>

                <label>Nome do evento:</label>
                <input
                    type="text"
                    value={eventoNome}
                    onChange={(e) => setEventoNome(e.target.value)}
                    required
                />

                <label>Descrição:</label>
                <textarea
                    value={eventoDescricao}
                    onChange={(e) => setEventoDescricao(e.target.value)}
                    required
                />

                <label>Localização:</label>
                <input
                    type="text"
                    value={eventoLocalizacao}
                    onChange={(e) => setEventoLocalizacao(e.target.value)}
                    required
                />

                <label>Data e hora:</label>
                <input
                    type="datetime-local"
                    value={eventoDataHora}
                    onChange={(e) => setEventoDataHora(e.target.value)}
                    required
                />

                <label>Limite de participantes:</label>
                <input
                    type="number"
                    min="1"
                    value={eventoLimiteParticipantes}
                    onChange={(e) => setEventoLimiteParticipantes(e.target.value)}
                    required
                />

                {erro && <p className="form-error">{erro}</p>}

                <button type="submit" className="btn btn-primary">
                    Criar evento
                </button>
            </form>
        </div>
    );
}

export default CriarEvento;