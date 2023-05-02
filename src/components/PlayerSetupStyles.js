import styled from "styled-components";

export const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  min-height: 300px;
  margin-top: 20px;
`;

export const SetupLabel = styled.label`
  margin-bottom: 10px;
`;

export const PlayerNameContainer = styled.div`
  margin-bottom: 10px;

  input {
    border-radius: 5px;
    border: none;
  }
`;

export const StartGameButton = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #006400;
  }
`;
