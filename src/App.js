import { AutoComplete } from "./AutoComplete";
import styled from "styled-components";
import { useState } from "react";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Roboto Slab", serif;
  font-family: "Source Code Pro", monospace;
  /* box-sizing: "content-box"; */
`;

const AutoCompleteContainer = styled.div`
  flex-direction: column;
  height: 150px;
`;

const AutoCompleteWrapper = styled.div`
  display: flex;
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
        </AutoCompleteWrapper>
      </AutoCompleteContainer>
    </MainContainer>
  );
}

export default App;
