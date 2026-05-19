function HeroContainer() {
    return (
        <section className="hero">
            <div>
                <h1>Pequenas ações, grandes <span>mudanças.</span></h1>
                <p>Descobre causas que te inspiram, participa em eventos e faz a diferença na tua comunidade.</p>
                <div className="hero-actions">
                    <button className="btn btn-primary">Explorar causas</button>
                    <button className="btn btn-secondary">Criar causa</button>
                </div>
            </div>
        </section>
    );
}

export default HeroContainer