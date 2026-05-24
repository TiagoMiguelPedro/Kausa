import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CriarCausa() {
    const [causaNome, setCausaNome] = useState("");
    const [causaDescricao, setCausaDescricao] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const URL_CAUSAS = "http://localhost:8000/causas/causas/";

    const handleSubmit = (e) => {
        e.preventDefault();

        const novaCausa = {
            causa_nome: causaNome,
            causa_descricao: causaDescricao,
            causa_nrVotos: 0,
            causa_estado: 0
        };

        axios.post(URL_CAUSAS, novaCausa)
            .then(() => {
                navigate("/causas");
            })
            .catch((err) => {
                console.error("Erro ao criar causa:", err.response?.data || err);
                setErro("Não foi possível criar a causa.");
            });
    };

    return (
        <div className="page">
            <h1>Criar Causa</h1>

            <form className="form-container" onSubmit={handleSubmit}>
                <label>Nome da causa:</label>
                <input
                    type="text"
                    value={causaNome}
                    onChange={(e) => setCausaNome(e.target.value)}
                    required
                />

                <label>Descrição:</label>
                <textarea
                    value={causaDescricao}
                    onChange={(e) => setCausaDescricao(e.target.value)}
                    required
                />

                {erro && <p className="form-error">{erro}</p>}

                <button type="submit" className="btn btn-primary">
                    Criar causa
                </button>
            </form>
        </div>
    );
}

export default CriarCausa;