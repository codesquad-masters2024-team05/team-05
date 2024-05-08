import { useState } from "react";
import styled, { css } from "styled-components";

interface LoginFormProps {
  type: "id" | "password";
}

const LABEL_TEXT = {
  id: "아이디",
  password: "비밀번호",
};

function LoginForm({ type }: LoginFormProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputType = type === "password" ? type : "text";

  return (
    <Form isFocused={isFocused}>
      <StyledParagraph>
        <StyledInput type={inputType} required onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
        <StyledLabel>
          <span>{LABEL_TEXT[type]}</span>
        </StyledLabel>
      </StyledParagraph>
    </Form>
  );
}

const Form = styled.div<{ isFocused: boolean }>`
  width: 288px;
  height: 56px;
  display: flex;
  padding: 0 1em;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eceef5;
  border-radius: 16px;
  background-color: #eceef5;
  transition: all 0.5s ease;

  ${(props) =>
    props.isFocused &&
    css`
      background-color: white;
      outline: 1.6px solid black;
    `}
`;

const StyledParagraph = styled.p`
  position: relative;
  width: 100%;
  height: 24px;
  margin: 0;
`;

const StyledInput = styled.input`
  position: relative;
  top: 35%;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0 none;
  background-color: transparent;
  color: #595f63;
  outline: none;

  &:focus + label span,
  &:valid + label span {
    transform: translateY(-60%);
    font-size: 12px;
    color: #595f63;
  }

  &:focus + label::after,
  &:valid + label::after {
    width: 100%;
    transform: translateX(0);
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -50%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 100%;
    border: none;
    transition: all 0.3s ease;
  }

  span {
    position: absolute;
    top: 1em;
    left: 0;
    bottom: 5px;
    transition: all 0.3s ease;
  }
`;

export default LoginForm;