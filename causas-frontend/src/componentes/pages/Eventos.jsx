import {useEffect, useState} from "react";
import axios from "axios";
import DestaqueCard from "../cards/DestaqueCard.jsx";
import ModalDetalhes from "../modal/ModalDetalhes.jsx";

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const URL_EVENTOS = "http://localhost:8000/causas/eventos/";

    useEffect(() => {
        axios.get(URL_EVENTOS)
            .then((request) => {
                setEventos(request.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar eventos:", err);
            });
    }, []);

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
                        <strong>Lotado:</strong>{" "}
                        {eventoSelecionado.evento_lotado ? "Sim" : "Não"}
                    </p>

                    <p>
                        <strong>Ativo:</strong>{" "}
                        {eventoSelecionado.evento_ativo ? "Sim" : "Não"}
                    </p>
                </ModalDetalhes>
            )}
        </div>
    );
}

export default Eventos;