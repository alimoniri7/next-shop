import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import { ClickAwayListener, Dialog } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

// components
const MainBox = styled.div`
  max-width: 1200px;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Slider = styled.div`
  max-width: 90%;
  margin: auto auto;
  /* background-color: red; */
  /* justify-content: space-between; */
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const LeftArrow = styled.button`
  position: absolute;
  left: 1%;
  color: #fff;
  background-color: #00000098;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  top: 48%;
  border: none;
  transform: rotate(180deg);
  cursor: pointer;
`;
const RightArrow = styled.button`
  position: absolute;
  right: 1%;
  color: #fff;
  background-color: #00000098;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  top: 48%;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10%;
  color: #500000;
  background-color: #ffffffa0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  top: 5%;
  border: none;
  cursor: pointer;
`;

const Imagebar = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 90%;
  overflow-x: scroll;
  background-color: #00000077;
  position: absolute;
  bottom: 1rem;
  border-radius: 10px;
  padding: 0.3rem;

  &::-webkit-scrollbar {
    /* width: 80%; */
    height: 8px;
    border-radius: 100px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 100px;
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
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const LightBox = ({ width, imageURLs, open, setOpen,defaultImage }) => {
  const [images, setImages] = useState([...imageURLs]);
  //   const [images, setImages] = useState(() => {
  //     if (imageURLs.length === 1) return [...imageURLs, "", "", ""];
  //     if (imageURLs.length === 2) return [...imageURLs, "", ""];
  //     if (imageURLs.length === 3) return [...imageURLs, ""];
  //     if (imageURLs.length >= 1) return [...imageURLs];
  //   });

  const [selectedImage, setselectedImage] = useState();

  useEffect(()=>{
    let index = images.findIndex(image=> image === defaultImage)
    setselectedImage(images[index])
  }, [])

  const selectImage = (clickedImage) => {
    let index = images.findIndex((image) => image === clickedImage);
    setselectedImage(images[index]);
  };

  const nextImage = () => {
    let index = images.findIndex((image) => image === selectedImage);
    index - 1 === images.length - 2
      ? setselectedImage(images[0])
      : setselectedImage(images[index + 1]);

    // setselectedImage(images[index+1])
  };
  const previousImage = () => {
    let index = images.findIndex((image) => image === selectedImage);
    index - 1 === -1
      ? setselectedImage(images[images.length - 1])
      : setselectedImage(images[index - 1]);
  };

  const closeLightBox = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClickAwayListener onClickAway={closeLightBox}>
        <MainBox open={open} width={width}>
          <CloseButton onClick={closeLightBox} >
            <CloseIcon />
          </CloseButton>

          <LeftArrow onClick={nextImage}>
            <ArrowForwardIosIcon />
          </LeftArrow>

          <Slider>
            <img src={selectedImage} />
          </Slider>

          <RightArrow onClick={previousImage}>
            <ArrowForwardIosIcon />
          </RightArrow>

          <Imagebar>
            {images.map((image) => (
              <img key={image} src={image} onClick={() => selectImage(image)} />
            ))}
          </Imagebar>

          {/* <div>
          {images.length !== 0 &&
            images.map((image) => {
              <SmallImageBox key={image}>
                <img src={image} onClick={() => selectImage(image)} />
              </SmallImageBox>;
            })}
        </div> */}
        </MainBox>
      </ClickAwayListener>
    </Dialog>
  );
};

export default LightBox;
{
  /* <SmallImageBox key={image} onClick={() => selectImage(image)}>
<img src={image} />
</SmallImageBox> */
}
