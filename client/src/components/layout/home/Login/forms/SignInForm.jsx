import React from "react";

export const SignInForm = () => {
  return (
    <form className="form-signin">
      <label for="username">Username</label>
      <input class="form-styling" type="text" name="username" placeholder="" />
      <label for="password">Password</label>
      <input class="form-styling" type="text" name="password" placeholder="" />
      <input type="checkbox" id="checkbox" />
      <label for="checkbox">
        <span class="ui"></span>Keep me signed in
      </label>
      <div class="btn-animate">
        <a class="btn-signin">Sign in</a>
      </div>
    </form>
  );
}
