import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const BackLink = styled(Link)`
  font-weight: bold;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  svg {
    margin-right: 4px;
  }
`;

export const Container = styled.div`
  align-self: center;
  width: 30vw;
  padding: 2rem;
  @media (max-width: 1024px) {
    width: 70vw;
  }
  @media (max-width: 425px) {
    width: 100%;
    border: none;
  }
`;

export const ActualValueContainer = styled.div`
  h2 {
    margin: 0;
    margin-right: 12px;
  }
  p {
    font-size: 24px;
  }
  display: flex;
  align-items: center;
`;
