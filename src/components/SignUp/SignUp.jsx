import React from "react";
import { Link } from "react-router-dom";

import handleSubmit from "../../services/handleSubmit";

import "./SignUp.scss";

export default function SignUp() {
  return (
    <div className="sign-up">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Create new account</h2>

        <div className="form__field">
          <label htmlFor="username" className="form__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form__input"
            placeholder="Username"
            autoComplete="username"
            minLength="4"
            maxLength="15"
            required
            autoFocus
          />
        </div>

        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form__input"
            placeholder="Email address"
            autoComplete="email"
            maxLength="254"
            required
          />
        </div>

        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form__input"
            placeholder="Password"
            minLength="6"
            maxLength="30"
            required
          />
        </div>

        <div className="form__field">
          <label htmlFor="repeat-password" className="form__label">
            Repeat Password
          </label>
          <input
            type="password"
            id="repeat-password"
            name="repeat-password"
            className="form__input"
            placeholder="Password"
            required
          />
        </div>

        <div className="form__field--checkbox">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            className="form__checkbox"
            required
          />
          <label htmlFor="agreement" className="form__label--checkbox">
            I agree to the processing of my personal information
          </label>
        </div>

        <div className="form__field--submit">
          <button type="submit" className="form__submit">
            Create
          </button>
        </div>

        <p className="form__footer">
          Already have an account?{" "}
          <Link className="form__footer--link" to="/sign-in">
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
}
