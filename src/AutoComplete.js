import {
  ClockCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";

import { getMockData } from "./mockData";
import { useEffect, useState, useCallback } from "react";

const StyledUl = styled.ul`
  padding: 0;
  list-style-type: none;
  margin: 0;
`;

const StyledLi = styled.li`
  padding-left: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 15px;
  border: 1px solid black;
  padding-left: 40px;

  :focus-visible {
    outline: none;
  }

  ${({ dropDownData, openDropdown }) =>
    openDropdown &&
    dropDownData &&
    dropDownData.length > 0 &&
    css`
      /* border-radius: 0px; */
      outline: none;
      border-radius: 15px 15px 0px 0px;
      border-bottom: none;
    `}
`;

const StyledDropDown = styled.div`
  ${({ openDropdown, dropDownData }) =>
    openDropdown &&
    dropDownData &&
    dropDownData.length > 0 &&
    css`
      border: 1px solid black;
      border-top: none;
      color: #808080c9;
      border-radius: 0px 0px 15px 15px;
    `}
`;

const InputWrapper = styled.div`
  position: relative;
`;

function AutoComplete() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputState, setInputState] = useState("");
  const [dropDownData, setDropDownData] = useState([]);

  const handleChangeInputState = ({ target: { value } }) => {
    console.log("value", value);
    setInputState(value);
  };

  const handleGetMockData = async (inputState) => {
    let data = await getMockData({ keyword: inputState });
    console.log("data", data);
    setDropDownData(data);
  };
  console.log("inputState", inputState);

  useEffect(() => {
    console.log("useEffect");
    handleGetMockData(inputState);
  }, [inputState]);

  return (
    <div style={{ width: "300px" }}>
      <InputWrapper>
        <SearchOutlined
          style={{ position: "absolute", top: "20%", left: "10px" }}
        />
        <StyledInput
          openDropdown={openDropdown}
          dropDownData={dropDownData}
          onChange={handleChangeInputState}
          onFocus={() => setOpenDropdown((t) => !t)}
          onBlur={() => setOpenDropdown(false)}
        />
      </InputWrapper>
      <StyledDropDown openDropdown={openDropdown} dropDownData={dropDownData}>
        {openDropdown &&
          dropDownData &&
          dropDownData?.length > 0 &&
          dropDownData.map((inputData) => (
            <StyledUl>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 8px 4px 8px",
                }}
              >
                <span style={{ display: "flex" }}>
                  <ClockCircleOutlined style={{ color: "#808080c9" }} />
                  <StyledLi>{inputData?.name}</StyledLi>
                </span>
                <CloseOutlined style={{ color: "#808080c9" }} />
              </span>
            </StyledUl>
          ))}
      </StyledDropDown>
    </div>
  );
}

export { AutoComplete };
