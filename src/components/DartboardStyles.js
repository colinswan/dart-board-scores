import styled, { css } from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(
    100% - 60px
  ); // Adjust this value as needed to fit your desired layout
`;

export const ScoreboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;
export const PlayerSetupContainer = styled.div`
  height: 150px; // Adjust this value as needed to fix the height of the container
  overflow: hidden;
`;

export const DartboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const PlayerScore = styled.div`
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 150px;

  h1,
  h3,
  h4 {
    color: #c0c0c0;
  }

  ${(props) =>
    props.active &&
    css`
      h1 {
        color: #008000;
      }
    `}

  @media (max-width: 768px) {
    margin-top: 0;

    h1,
    h3 {
      font-size: 1.2em;
    }
  }
`;

export const ScoreTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 300px;
  font-size: 1.1em;

  th,
  td {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    color: #c0c0c0;
  }

  th {
    background-color: #eee;
    color: #000;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;
export const GameOverTable = styled(ScoreTable)`
  // Add any additional styling if necessary
`;

export const NewGameButton = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  margin-top: 20px;
  cursor: pointer;
  /* margin-left: auto; */

  &:hover {
    background-color: #006400;
  }
`;

export const ResetGameButton = styled(NewGameButton)`
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #006400;
  }
`;
