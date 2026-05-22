function Login() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1>Entrar na Kausa</h1>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label>Utilizador</label>
            <input type="user" placeholder="O teu nome de utilizador" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="A tua password" />
          </div>

          <button type="submit" className="btn btn-primary auth-button">
            Entrar
          </button>
        </form>

        <p className="auth-footer">
          Ainda não tens conta? <a href="/register">Criar conta</a>
        </p>
      </section>
    </main>
  );
}

export default Login;