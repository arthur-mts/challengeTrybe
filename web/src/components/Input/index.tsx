import React, { InputHTMLAttributes, useState, useCallback } from "react";

import Title from "components/Title";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validateInput?: (value: string) => boolean;
  errored?: boolean;
  setIsErrored?: (value: boolean) => any;
}

const Input: React.FC<InputProps> = ({
  name,
  errored = false,
  setIsErrored,
  validateInput,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);

    if (value && setIsErrored && validateInput) {
      setIsErrored(!validateInput(String(value)));
    }
  }, [setIsFocused, setIsFilled, setIsErrored, validateInput, value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  return (
    <div>
      <Title>{name}</Title>
      <Container isErrored={errored} isFilled={isFilled} isFocused={isFocused}>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          type="text"
          {...props}
        />
      </Container>
    </div>
  );
};

export default Input;
