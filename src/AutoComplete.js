import {
  ClockCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";

import { getMockData } from "./mockData";
import { useEffect, useState, useCallback } from "react";

const StyledUl = styled.ul`
  display: flex;
  padding: 0;
  list-style-type: none;
  margin: 0;
  :hover {
    background-color: #f5f7f5;
  }
`;

const StyledLi = styled.li`
  padding-left: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid black;
  padding-left: 40px;

  :focus-visible {
    outline: none;
  }

  ${({ dropDownData, openDropdown, selectedValue }) => {
    if (selectedValue)
      return css`
        border-radius: none;
      `;
    else if (openDropdown && dropDownData && dropDownData.length > 0)
      return css`
        /* border-radius: 0px; */
        outline: none;
        border-radius: 15px 15px 0px 0px;
        border-bottom: none;
      `;
  }}
`;

const StyledDropDown = styled.div`
  ${({ openDropdown, dropDownData, selectedValue }) => {
    if (selectedValue) return null;
    else if (openDropdown && dropDownData && dropDownData.length > 0)
      return css`
        cursor: pointer;
        border: 1px solid black;
        border-top: none;
        color: #808080c9;
        overflow: hidden;
        border-radius: 0px 0px 15px 15px;
      `;
  }}
`;

const InputWrapper = styled.div`
  position: relative;
`;

function AutoComplete({ setSelectedValue, selectedValue }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [onClickedValue, setOnClickedValue] = useState("");

  const handleChangeInputState = ({ target: { value } }) => {
    setOnClickedValue(value);
    setSelectedValue("");
  };

  const handleGetMockData = async (inputState) => {
    let data = await getMockData({ keyword: inputState });
    setDropDownData(data);
  };

  const handleRemoveSingleData = (index) => {
    setDropDownData((dropDownData) =>
      dropDownData.filter((t, i) => i !== index)
    );
  };

  const handleSelectedValue = (name) => {
    setOnClickedValue(name);
    setSelectedValue(name);
  };

  useEffect(() => {
    handleGetMockData(onClickedValue);
  }, [onClickedValue]);

  return (
    <div
      style={{ width: "500px", margin: "15px 0" }}
      onFocus={() => setOpenDropdown(true)}
      //   onBlur={() => setOpenDropdown(false)}
    >
      <InputWrapper>
        <SearchOutlined
          style={{ position: "absolute", top: "30%", left: "10px" }}
        />
        <StyledInput
          value={onClickedValue}
          openDropdown={openDropdown}
          dropDownData={dropDownData}
          onChange={handleChangeInputState}
          selectedValue={selectedValue}
        />
      </InputWrapper>
      <StyledDropDown
        openDropdown={openDropdown}
        dropDownData={dropDownData}
        selectedValue={selectedValue}
      >
        {openDropdown &&
          dropDownData &&
          dropDownData?.length > 0 &&
          dropDownData.map((inputData, index) => {
            let firstChar = onClickedValue;
            let secondChar = inputData?.name.slice(onClickedValue?.length);
            return (
              firstChar &&
              secondChar && (
                <StyledUl key={index}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 2,
                      padding: "4px 8px 4px 8px",
                    }}
                    onClick={() => handleSelectedValue(inputData?.name)}
                  >
                    <span
                      style={{ display: "flex" }}
                      //   onClick={() => handleSelectedValue(inputData?.name)}
                    >
                      <ClockCircleOutlined style={{ color: "#808080c9" }} />
                      <StyledLi>
                        {/* {inputData?.name} */}
                        <span style={{ fontWeight: "bold" }}>{firstChar}</span>
                        <span>{secondChar}</span>
                      </StyledLi>
                    </span>
                  </span>
                  <CloseOutlined
                    style={{
                      color: "#808080c9",
                      zIndex: "100",
                      margin: "10px",
                    }}
                    onClick={(e) => handleRemoveSingleData(index)}
                  />
                </StyledUl>
              )
            );
          })}
      </StyledDropDown>
    </div>
  );
}

export { AutoComplete };
