

function DestaqueCard({ titulo, subtitulo, descricao, textoBotao = "Ver detalhes", onClick }) {
    return (
        <article className="listagem-card">
            <h2>{titulo}</h2>

            {subtitulo && (
                <p className="listagem-card-subtitulo">{subtitulo}</p>
            )}

            <p className="listagem-card-descricao">{descricao}</p>

            <button className="btn btn-primary" onClick={onClick}>
                {textoBotao}
            </button>
        </article>
    );
}

export default DestaqueCard;