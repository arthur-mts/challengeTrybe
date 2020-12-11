import styled from "styled-components";

export const Wrapper = styled.div`
  width: 200px;
  text-align: center;

  h2,
  p {
    margin: 0;
  }

  h2 {
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    width: 100%;
    font-size: 2rem;
    margin-top: 1rem;
    padding: 1.5rem 0;
    background-color: rgba(34, 56, 67, 0.7);
    border-radius: 6px;
  }
`;
