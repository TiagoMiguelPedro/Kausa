function CriarVagaCard() {
  return (
    <section className="criar-vaga-card">
      <div className="criar-vaga-header">
        <span>Vagas</span>
        <h2>Criar vagas para voluntários</h2>
        <p>
          Define as vagas associadas à causa, indicando o tipo de ajuda
          necessário, o número de participantes e os detalhes principais.
        </p>
      </div>

      <form className="criar-vaga-form">
        <div className="criar-vaga-grid">
          <div className="criar-vaga-field">
            <label>Título da vaga</label>
            <input
              type="text"
              placeholder="Ex: Apoio na recolha de alimentos"
            />
          </div>

          <div className="criar-vaga-field">
            <label>Número de vagas</label>
            <input type="number" placeholder="Ex: 10" />
          </div>

          <div className="criar-vaga-field">
            <label>Data</label>
            <input type="date" />
          </div>

          <div className="criar-vaga-field">
            <label>Hora</label>
            <input type="time" />
          </div>

          <div className="criar-vaga-field">
            <label>Localização</label>
            <input
              type="text"
              placeholder="Ex: Centro Comunitário de Lisboa"
            />
          </div>

          <div className="criar-vaga-field">
            <label>Tipo de ajuda</label>
            <select defaultValue="">
              <option value="" disabled>
                Selecionar tipo de ajuda
              </option>
              <option>Recolha de bens</option>
              <option>Apoio logístico</option>
              <option>Acompanhamento</option>
              <option>Divulgação</option>
              <option>Outro</option>
            </select>
          </div>

          <div className="criar-vaga-field full-width">
            <label>Descrição da vaga</label>
            <textarea
              rows="4"
              placeholder="Explica o que os voluntários terão de fazer nesta vaga."
            />
          </div>

          <div className="criar-vaga-field full-width">
            <label>Requisitos</label>
            <textarea
              rows="3"
              placeholder="Ex: Disponibilidade no horário indicado, vontade de ajudar, capacidade para transportar bens..."
            />
          </div>
        </div>

        <div className="criar-vaga-actions">
          <button type="button" className="btn btn-secondary">
            Cancelar
          </button>

          <button type="button" className="btn btn-primary">
            Adicionar vaga
          </button>
        </div>
      </form>
    </section>
  );
}

export default CriarVagaCard;