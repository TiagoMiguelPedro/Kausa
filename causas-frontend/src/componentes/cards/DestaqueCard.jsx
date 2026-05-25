function DestaqueCard({titulo, subtitulo, descricao, textoBotao = "Ver detalhes", onClick, podeVotar = false, onVote}) {
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
                    <button className="btn btn-primary" onClick={onVote}>
                        Votar
                    </button>
                )}
            </div>
        </article>
    )
        ;
}

export default DestaqueCard;