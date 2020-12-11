import styled, { css } from "styled-components";

const flex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  ${flex}
`;

export const LoginForm = styled.form`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
  width: 30vw;
  @media (max-width: 1024px) {
    width: 70vw;
  }
  @media (max-width: 425px) {
    width: 100%;
    border: none;
  }

  div + div {
    margin-top: 2rem;
  }
`;
