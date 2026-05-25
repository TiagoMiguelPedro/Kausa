import { Link } from "react-router-dom";

function HeroCard() {
    return (
        <section className="hero">
            <div>
                <h1>Pequenas ações, grandes <span>mudanças.</span></h1>
                <p>Descobre causas que te inspiram, participa em eventos e faz a diferença na tua comunidade.</p>
                <div className="hero-actions">
                    <Link to="/causas" className="btn btn-primary">Explorar causas</Link>
                    <Link to="/criar-causa" className="btn btn-secondary">Criar causa</Link>
                </div>
            </div>
        </section>
    );
}

export default HeroCard