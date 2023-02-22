import styled from "@emotion/styled";
import React from "react";

const MainBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => `calc(125/100 * ${props.width})`};
  /* background-color: red; */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    &:first-child {
      width: ${(props) => props.width};
      height: ${(props) => props.width};
      background-color: blue;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
    &:last-child {
      flex-grow: 1;
      /* background-color: green; */
      display: flex;
      justify-content: space-between;
    }
  }
`;

const SmallImageBox = styled.div`
  width: calc(100% / 4.761);
  /* background-color: yellow; */
  /* position: relative; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 8px;
  }
`;

const GalleryBox = ({ width }) => {
  return (
    <MainBox width={width}>
      <div>
        <img src="https://media.graphassets.com/OXTlrGVATbupsxS6E4mT" />
      </div>
      <div>
        <SmallImageBox>
          <img src="https://media.graphassets.com/OXTlrGVATbupsxS6E4mT" />
        </SmallImageBox>
        <SmallImageBox>
          <img src="https://media.graphassets.com/OXTlrGVATbupsxS6E4mT" />
        </SmallImageBox>
        <SmallImageBox>
          <img src="https://media.graphassets.com/OXTlrGVATbupsxS6E4mT" />
        </SmallImageBox>
        <SmallImageBox>
          <img src="https://media.graphassets.com/OXTlrGVATbupsxS6E4mT" />
        </SmallImageBox>
      </div>
    </MainBox>
  );
};

export default GalleryBox;
