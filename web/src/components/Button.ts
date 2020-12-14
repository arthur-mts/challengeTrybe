import styled from "styled-components";
import { shade } from "polished";
import themeFile from "styles/theme";

export default styled.button`
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};

  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  height: 56px;
  margin-top: 16px;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.1, themeFile.colors.secondary)};
    cursor: pointer;
  }
`;
