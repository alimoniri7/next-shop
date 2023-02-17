import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Select = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 1.1rem 0.5rem;
  background-color: ${props=> props.isOpen? "#cbcbcb" : "#e6e6e6"};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  * {
    cursor: pointer;
  }
  div {
    position: absolute;
    top: 100%;
    left: 0;
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: 0.2s ease-out;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0 0 7px 7px;
    max-height: 150px;
    overflow: scroll;
    /* width */
    &::-webkit-scrollbar {
      width: 6px;
      height: 100%;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;

    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #acacac;
      border-radius: 100px;

    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #8f8f8f;
      
    }
  }
  .placeholder {
    opacity: 0.5;
  }
  .selectBoxArrow {
    opacity: 0.8;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: 0.3s ease-out;
    border-right: 1px solid #00000052;
  }

  .selectOptions {
    background-color: #e8e8e8;
    border: none;
    text-align: right;
    padding: 0.5rem 0.5rem;
    min-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover{
        background-color: #f4f4f4;
    }
  }
`;

const CustomSelectBox = ({
  width = "180px",
  height = "30px",
  onChange,
  name,
  id,
  placehodler = "گزینه ها",
  options=['option 1', 'option 2']
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectBox = useRef();
  let input = useRef();

//   const options = ["علی", "نیما", "میلاد","مهران","سارا","مهسا","هانیه  "];

  // opne options by clicking on selectBox
  const openOptions = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  // End

  // handel clicks on clicking selct items
  const selectItem = (e) => {
    setSelectedValue(() => {
      return e.target.value;
    });
    input.current.setAttribute("value", e.target.value);
    input.current.focus();
  };
  // End

  // close dropdown with clicking outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isOpen &&
        selectBox.current &&
        !selectBox.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isOpen]);
  // End

  console.log(input.current);
  console.log(selectedValue);

  return (
    <>
      {/* <select name={name} id={id} value={selectedValue} onChange={onChange} >
        {
            options.map(option=><option key={option} value={option}>{option}</option>)
        }
    </select> */}
      <Select
        onClick={openOptions}
        width={width}
        height={height}
        isOpen={isOpen}
        ref={selectBox}
      >
        <input
          ref={input}
          name={name}
          id={id}
          onChange={onChange}
          onFocus={onChange}
          onBlur={onChange}
          style={{
            width: "0px",
            height: "0px",
            outline: "none",
            border: "none",
            position: "absolute",
          }}
        />

        {/* handle placeholder and selected option */}
        {selectedValue ? (
          <p>{selectedValue}</p>
        ) : (
          <p className="placeholder">{placehodler}</p>
        )}

        <ArrowDropUpIcon className="selectBoxArrow" />

        {/* create list of options */}
        <div>
          {options.map((option, index) => (
            <input
              key={option}
              type="button"
              value={option}
              onClick={selectItem}
              className="selectOptions"
              style={
                options.length === index + 1
                  ? { borderBottom: "none" }
                  : { borderBottom: "1px solid #93939328" }
              }
            />
          ))}
        </div>
      </Select>
    </>
  );
};

export default CustomSelectBox;
