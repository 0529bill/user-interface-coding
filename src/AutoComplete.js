import {
  ClockCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";

import debounce from "./debounce";
import { getMockData } from "./mockData";
import { useEffect, useState, useCallback, useRef } from "react";

import usePrevious from "./usePrevious";

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

  ${({ dropDownData, openDropdown, selectedValue, clickedValue }) => {
    if (selectedValue) {
      return css`
        border-radius: 15px;
        border: 1px solid black;
      `;
    }
    if (
      openDropdown &&
      dropDownData &&
      dropDownData.length > 0 &&
      clickedValue.length
    )
      return css`
        /* border-radius: 0px; */
        outline: none;
        border-radius: 15px 15px 0px 0px;
        border-bottom: none;
      `;
  }}
`;

const StyledDropDown = styled.div`
  ${({ openDropdown, dropDownData, selectedValue, clickedValue }) => {
    //when there are selected value or no words in the input bar, don't show dropdown's css
    if (selectedValue || !clickedValue.length) return css``;
    if (openDropdown && dropDownData && dropDownData.length > 0)
      return css`
        cursor: pointer;
        border: 1px solid black;
        border-top: none;
        color: #808080c9;
        overflow: hidden;
        border-radius: 0px 0px 15px 15px;
        max-height: 300px;
        overflow: scroll;
      `;
  }}
`;

const InputWrapper = styled.div`
  position: relative;
`;

function AutoComplete({ setSelectedValue, selectedValue }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  //keyword in input
  const [onClickedValue, setOnClickedValue] = useState("");

  const prevClickedValue = usePrevious(onClickedValue);

  const [offset, setOffset] = useState(0);

  const observer = useRef();

  const handleChangeInputState = ({ target: { value } }) => {
    if (value) {
      setOpenDropdown(true);
    } else if (!value) {
      setDropDownData([]);
      setOpenDropdown(false);
    }

    setOnClickedValue(value);
    setOffset(0);
    setSelectedValue("");
  };

  const handleGetMockData = useCallback(
    async (inputState = "", offset = 0) => {
      let MockData = await getMockData({ keyword: inputState, offset });
      console.log("MockData", MockData);

      setHasMore(MockData?.hasMore);

      if (!hasMore) {
        return;
      }

      if (!MockData?.data) {
        setDropDownData([]);
        return;
      }

      if (prevClickedValue === onClickedValue) {
        setDropDownData((data) => [...data, ...MockData?.data]);
      } else {
        setDropDownData(MockData?.data);
      }
    },
    [hasMore, onClickedValue, prevClickedValue]
  );

  const handleRemoveSingleData = (index) => {
    setDropDownData((dropDownData) =>
      dropDownData.filter((t, i) => i !== index)
    );
  };

  // const lastElementRef = useCallback(
  //   (node) => {
  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (!hasMore) return;
  //       if (entries[0].isIntersecting) {
  //         setOffset((t) => t + 20);
  //         handleGetMockData(onClickedValue, offset + 20);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [handleGetMockData, hasMore, offset, onClickedValue]
  // );

  console.log("dropDownData", dropDownData);
  console.log("openDropdown", openDropdown);
  console.log("selectedValue", selectedValue);

  console.log("onClickedValue", onClickedValue);
  const renderInput = () => {
    return (
      <InputWrapper>
        <SearchOutlined
          style={{ position: "absolute", top: "30%", left: "10px" }}
        />
        <StyledInput
          // input display
          value={onClickedValue}
          onChange={handleChangeInputState}
          //for input styling
          openDropdown={openDropdown}
          dropDownData={dropDownData}
          selectedValue={selectedValue}
          clickedValue={onClickedValue}
        />
      </InputWrapper>
    );
  };

  const renderDropDown = useCallback(() => {
    const handleSelectedValue = (name) => {
      setOnClickedValue(name);
      setDropDownData((dropDownData) =>
        dropDownData.filter((t) => t.name === name)
      );
      setSelectedValue(name);
      setOpenDropdown(false);
    };

    console.log("dropDownData", dropDownData);
    return (
      <StyledDropDown
        openDropdown={openDropdown}
        dropDownData={dropDownData}
        selectedValue={selectedValue}
        clickedValue={onClickedValue}
      >
        {openDropdown &&
          dropDownData &&
          dropDownData?.length > 0 &&
          dropDownData.map((inputData, index) => {
            let firstChar = onClickedValue;
            let secondChar = inputData?.name.slice(onClickedValue?.length);

            if (firstChar.length > inputData?.name?.length) {
              setOpenDropdown(false);
              return;
            }
            return (
              <StyledUl
                key={index}
                // ref={
                //   dropDownData?.length === index + 1 ? lastElementRef : null
                // }
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 2,
                    padding: "4px 8px 4px 8px",
                  }}
                  onClick={() => handleSelectedValue(inputData?.name)}
                >
                  <span style={{ display: "flex" }}>
                    <ClockCircleOutlined style={{ color: "#808080c9" }} />
                    <StyledLi>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {firstChar}
                      </span>
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
                  onClick={() => handleRemoveSingleData(index)}
                />
              </StyledUl>
            );
          })}
      </StyledDropDown>
    );
  }, [
    dropDownData,
    onClickedValue,
    openDropdown,
    selectedValue,
    setSelectedValue,
  ]);

  //when input changed
  useEffect(() => {
    let defaultOffset = 0;

    // don't have to fetch data when there's no input
    if (onClickedValue.length && prevClickedValue !== onClickedValue) {
      handleGetMockData(onClickedValue, defaultOffset);
    }
  }, [handleGetMockData, onClickedValue, prevClickedValue]);

  return (
    <div
      style={{ width: "500px", margin: "15px 0" }}
      // onFocus={() => setOpenDropdown(true)}
    >
      {renderInput()}
      {renderDropDown()}
    </div>
  );
}

export { AutoComplete };
