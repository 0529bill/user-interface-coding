import { AutoComplete } from "./AutoComplete";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AutoCompleteContainer = styled.div`
  flex-direction: column;
  height: 150px;
`;

const AutoCompleteWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  height: 25px;
  margin-left: 16px;
`;

function App() {
  return (
    <MainContainer className="App">
      <AutoCompleteContainer>
        <h1>AutoComplete</h1>
        <AutoCompleteWrapper>
          <AutoComplete />
          <StyledButton>Submit</StyledButton>
        </AutoCompleteWrapper>
      </AutoCompleteContainer>
    </MainContainer>
  );
}

export default App;
