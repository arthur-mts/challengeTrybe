import styled, { css } from "styled-components";
import Button from "components/Button";

const flex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  width: 400px;
  @media (max-width: 420px) {
    width: 260px;
  }
  margin: 0;
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

export const Container = styled.div`
  width: 70vw;
  @media (max-width: 375px) {
    width: 90vw;
  }
  ${flex}
`;
export const CurrenciesGroup = styled.div`
  /* ${flex}
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between; */
  display: grid;
  row-gap: 2rem;
  column-gap: 1rem;
  grid-template-columns: 200px 200px 200px 200px;
  margin: 2rem 0;
  @media (max-width: 900px) {
    grid-template-columns: 200px;
  }
`;

export const Wrapper = styled.section`
  max-width: 100vw;
  min-height: 100vh;
  ${flex}
`;
