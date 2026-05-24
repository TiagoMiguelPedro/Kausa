import App from "../../App.jsx";
import HeroCard from "../homepage/HeroCard.jsx";
import DestaqueCard from "./destaques/DestaqueCard.jsx";
import homeContainerBckg from "../../imagens/home_container_bckg.png";

function Home() {

    return (
        <>
            <div className="page">
                <HeroCard/>
                <DestaqueCard
                    titulo="Criar Causa"
                    descricao="Descobre causas que precisam de apoio e participa na mudança!"
                    imagem={homeContainerBckg}
                    textoBotao="Ver detalhes"
                    link="/criar-causa"
                />
                <DestaqueCard
                    titulo="Criar evento"
                    descricao="Descobre causas que precisam de apoio e participa na mudança!"
                    imagem={homeContainerBckg}
                    textoBotao="Ver detalhes"
                    link="/criar-evento"
                />
            </div>
        </>
    );
}

export default Home