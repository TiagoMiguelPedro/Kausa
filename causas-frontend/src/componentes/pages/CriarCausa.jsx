import "../../CriarCausa.css";

function CriarCausa() {
    return (
        <main className="criar-causa-page">
            <section className="criar-causa-hero">
                <div className="criar-causa-hero-text">
                    <span>Nova causa</span>
                    <h1>Cria uma causa e começa a fazer a diferença.</h1>
                    <p>
                        Preenche as informações principais da tua causa para que outras
                        pessoas possam conhecê-la, apoiar e participar.
                    </p>
                </div>

                <div className="criar-causa-side-card">
                    <h3>Antes de publicar</h3>
                    <ul>
                        <li>Escolhe um título claro.</li>
                        <li>Explica o objetivo da causa.</li>
                        <li>Indica a categoria e localização.</li>
                        <li>Adiciona uma imagem apelativa.</li>
                    </ul>
                </div>
            </section>

            <section className="criar-causa-layout">
                <form className="criar-causa-form">
                    <div className="form-title">
                        <h2>Dados da causa</h2>
                        <p>Esta página é apenas visual. O formulário ainda não envia dados.</p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Título da causa</label>
                            <input type="text" placeholder="Ex: Apoio a famílias carenciadas"/>
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <select defaultValue="">
                                <option value="" disabled>
                                    Selecionar categoria
                                </option>
                                <option>Ambiente Sustentável</option>
                                <option>Bem-estar Animal</option>
                                <option>Educação para Todos</option>
                                <option>Apoio à Comunidade</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Localização</label>
                            <input type="text" placeholder="Ex: Lisboa"/>
                        </div>

                        <div className="form-group">
                            <label>Meta de participantes</label>
                            <input type="number" placeholder="Ex: 50"/>
                        </div>

                        <div className="form-group full-width">
                            <label>Descrição</label>
                            <textarea
                                rows="5"
                                placeholder="Explica o objetivo da causa e como as pessoas podem ajudar."
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Imagem da causa</label>
                            <div className="upload-box">
                                <strong>+</strong>
                                <p>Clica para adicionar uma imagem</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary">
                            Cancelar
                        </button>

                        <button type="button" className="btn-primary">
                            Criar causa
                        </button>
                    </div>
                </form>

                <aside className="cause-preview">
                    <h3>Pré-visualização</h3>

                    <div className="preview-card">
                        <div className="preview-image"></div>

                        <div className="preview-content">
                            <span>Rascunho</span>
                            <h4>Nome da tua causa</h4>
                            <p>A descrição da causa aparecerá aqui como exemplo de cartão.</p>

                            <div className="progress-bar">
                                <div></div>
                            </div>

                            <small>0 participantes</small>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}

export default CriarCausa;