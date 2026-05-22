import { Link } from "react-router-dom";

function DestaqueCard({
  titulo,
  descricao,
  imagem,
  textoBotao = "Ver detalhes",
  link = "#",
}) {
  return (
    <section className="destaque-card">
      <img className="destaque-card-img" src={imagem} alt={titulo} />

      <div className="destaque-card-content">
        <h2>{titulo}</h2>
        <p>{descricao}</p>

        <Link to={link} className="btn btn-primary">
          {textoBotao}
        </Link>
      </div>
    </section>
  );
}

export default DestaqueCard;