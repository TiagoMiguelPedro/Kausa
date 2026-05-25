function DestaqueCard({
                          titulo,
                          subtitulo,
                          descricao,
                          textoBotao = "Ver detalhes",
                          onClick,
                          podeVotar = false,
                          votado = false,
                          onVote,
                          podeEliminar,
                          onDelete,
                          podeEditar,
                          onEdit,
                          podeInscrever,
                          onInscrever
                      }) {
    return (
        <article className="listagem-card">
            <h2>{titulo}</h2>

            {subtitulo && (
                <p className="listagem-card-subtitulo">{subtitulo}</p>
            )}

            <p className="listagem-card-descricao">{descricao}</p>
            <div className="card-actions">
                <button className="btn btn-primary" onClick={onClick}>
                    {textoBotao}
                </button>

                {podeVotar && (
                    <button className={`btn-voto ${votado ? "votado" : ""}`} onClick={onVote}>
                        ♥
                    </button>
                )}
                {podeInscrever && (
                    <button
                        className="btn btn-secondary"
                        onClick={onInscrever}
                    >
                        Inscrever-me
                    </button>
                )}
                {podeEditar && (
                    <button
                        className="btn btn-secondary"
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                )}
                {podeEliminar && (
                    <button
                        className="btn btn-danger"
                        onClick={onDelete}
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </article>
    )
        ;
}

export default DestaqueCard;