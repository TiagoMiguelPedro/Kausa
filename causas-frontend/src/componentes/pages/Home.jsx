import HeroCard from "../homepage/HeroCard.jsx";
import DestaqueCard from "./destaques/DestaqueCard.jsx";
import homeContainerBckg from "../../imagens/home_container_bckg.png";

function Home() {

    return (
        <>
            <div className="page">
                <HeroCard/>
                <DestaqueCard
                    titulo="Crie uma Causa"
                    descricao="Descobre causas que precisam de apoio e participa na mudança!"
                    imagem={homeContainerBckg}
                    textoBotao="Criar Causa"
                    link="/criar-causa"
                />
                <DestaqueCard
                    titulo="Crie um Evento"
                    descricao="Descobre causas que precisam de apoio e participa na mudança!"
                    imagem={homeContainerBckg}
                    textoBotao="Criar evento"
                    link="/criar-evento"
                />
            </div>
        </>
    );
}

export default Home