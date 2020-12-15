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
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await signIn({ email, password });
        push("/");
      } catch (e) {
        window.alert("Erro no login! Por favor verifique suas credenciais");
      }
    },
    [email, password, signIn, push]
  );

  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit} data-testid="form">
        <Input
          data-testid="email-input"
          name="Email"
          placeholder="Seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          validateInput={validateEmail}
        />
        <Input
          data-testid="password-input"
          name="Senha"
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" data-testid="submit-login">
          ENTRAR
        </Button>
      </LoginForm>
    </Wrapper>
  );
}
