import React, { FormEvent, useCallback, useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import { useAuth } from "hooks/auth";

import validateEmail from "utils/validateEmail";
import { useHistory } from "react-router-dom";
import { Wrapper, LoginForm } from "./styles";

export default function Login() {
  const { push } = useHistory();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [emailErrored, setIsEmailErrored] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrored, setIsPasswordErrored] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      console.log(passwordErrored && emailErrored);
      event.preventDefault();
      try {
        await signIn({ email, password });
        push("/");
      } catch (e) {
        console.log("no");
      }
    },
    [email, password, signIn, push, passwordErrored, emailErrored]
  );

  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          name="Email"
          placeholder="Seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          validateInput={validateEmail}
          errored={emailErrored}
          setIsErrored={setIsEmailErrored}
        />
        <Input
          name="Senha"
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errored={passwordErrored}
          setIsErrored={setIsPasswordErrored}
        />

        <Button type="submit" disabled={passwordErrored || emailErrored}>
          ENTRAR
        </Button>
      </LoginForm>
    </Wrapper>
  );
}
