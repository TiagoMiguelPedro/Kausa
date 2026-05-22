function Register() {
  return (
    <main className="auth-page">
      <section className="register-card">
        <div className="auth-header">
          <h1>Criar conta</h1>
          <p>Começa a apoiar causas com impacto.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" placeholder="O teu nome" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="exemplo@email.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Cria uma password" />
          </div>

          <div className="form-group">
            <label>Confirmar password</label>
            <input type="password" placeholder="Repete a password" />
          </div>

            <p></p>

          <button type="submit" className="btn btn-primary">
            Criar conta
          </button>
        </form>

        <p className="auth-footer">
          Já tens conta? <a href="/login">Entrar</a>
        </p>
      </section>
    </main>
  );
}

export default Register;