import "./SignupPage.scss";

export default function SignUpPage() {
  return (
    <main className="signup">
      <h2 className="signup-title">Sign up</h2>
      <form className="signup-form">
        <input
          className="signup-form__input"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="signup-form__input"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="signup-form__input"
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="signup-form__btn" type="submit">
          Sign up
        </button>
      </form>
    </main>
  );
}
