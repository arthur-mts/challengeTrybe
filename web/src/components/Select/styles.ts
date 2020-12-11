import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.background};

  display: flex;
  align-items: center;
  width: 100%;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.error};
    `}
  ${(props) =>
    props.isFocused &&
    css`
      transition: border-color 0.2s ease-in;
      border-color: ${({ theme }) => theme.colors.secondary};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.secondary};
    `}
  select {
    padding: 16px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    flex: 1;
    border: none;
    outline: none;
  }
  svg {
    margin-right: 16px;
  }
  & + div {
    margin-top: 8px;
  }
`;
