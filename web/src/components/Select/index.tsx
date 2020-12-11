import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from "react";

import Title from "components/Title";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
}

const Select: React.FC<InputProps> = ({ name, options, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <div>
      <Title>{name}</Title>
      <Container isErrored={false} isFilled={isFilled} isFocused={isFocused}>
        <select onFocus={handleInputFocus} onBlur={handleInputBlur} {...props}>
          {options.map((option, indx) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Container>
    </div>
  );
};

export default Select;
