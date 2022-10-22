import { AutoComplete } from "./AutoComplete";
import styled from "styled-components";
import { useState } from "react";

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

const StyledHeader = styled.div`
  font-size: 2rem;
`;

function App() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <MainContainer className="App">
      <AutoCompleteContainer>
        <StyledHeader>AutoComplete</StyledHeader>
        <AutoCompleteWrapper>
          <AutoComplete
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />
          <div style={{ margin: "10px" }}>
            <span>Current Selected Value:</span>
            <span>{selectedValue}</span>
          </div>
          {/* <StyledButton>Submit</StyledButton> */}
        </AutoCompleteWrapper>
      </AutoCompleteContainer>
    </MainContainer>
  );
}

export default App;
