import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <main className="login">
      <h2 className="login-title">Log in</h2>
      <form className="login-form">
        <input
          className="login-form__input"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="login-form__input"
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="login-form__btn" type="submit">
          Log in
        </button>
      </form>
    </main>
  );
}
