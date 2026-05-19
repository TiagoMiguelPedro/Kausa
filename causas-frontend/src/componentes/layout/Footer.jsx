import footerItems from "../../data/footer.json"


function Footer(){

    return(
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Legal</h4>
                        <a href="/">Privacidade</a>
                        <a href="/">Termos</a>
                    </div>

                    <div className="footer-column">
                        <h4>Contactos</h4>
                        <span><b>Email: </b>geral@kausa.pt</span>
                        <span><b>Morada: </b>R. da Solidariedade, Nº29 | 1500-001, Lisboa</span>
                        <a href="/">Questões frequentes</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Kausa. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;