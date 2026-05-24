import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CriarEvento() {
    const [causas, setCausas] = useState([]);

    const [eventoCausa, setEventoCausa] = useState("");
    const [eventoNome, setEventoNome] = useState("");
    const [eventoDescricao, setEventoDescricao] = useState("");
    const [eventoLocalizacao, setEventoLocalizacao] = useState("");
    const [eventoDataHora, setEventoDataHora] = useState("");
    const [eventoLimiteParticipantes, setEventoLimiteParticipantes] = useState("");

    const navigate = useNavigate();

    const URL_CAUSAS = "http://localhost:8000/causas/causas/";
    const URL_EVENTOS = "http://localhost:8000/causas/eventos/";

    useEffect(() => {
        axios.get(URL_CAUSAS)
            .then((request) => {
                setCausas(request.data);
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

        axios.post(URL_EVENTOS, novoEvento)
            .then(() => {
                navigate("/eventos");
            })
            .catch((err) => {
                console.error("Erro ao criar evento:", err.response?.data || err);
            });
    };

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

                <button type="submit" className="btn btn-primary">
                    Criar evento
                </button>
            </form>
        </div>
    );
}

export default CriarEvento;