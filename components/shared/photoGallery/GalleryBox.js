import styled from "@emotion/styled";
import React, { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LightBox from "./LightBox";

const MainBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => `calc(125/100 * ${props.width})`};
  /* background-color: red; */
  position: static;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    width: calc(100% / 4.761);
  }
  > div {
    &:first-child {
      width: ${(props) => props.width};
      height: ${(props) => props.width};
      background: linear-gradient(120deg, #dcbbfa 0%, #d9ecfe 100%);
      cursor: pointer;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center center;
      }
      &:hover {
        opacity: 0.7;
        border: 1px solid #e35a01;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #dcbbfa 0%, #d9ecfe 100%);
  border-radius: 8px;
  overflow: hidden;

  /* background-color: yellow; */
  &:hover {
    opacity: 0.7;
    border: 2px solid #e35a01;
  }
  /* position: relative; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

const GalleryBox = ({ width, imageURLs }) => {
  const [images, setImages] = useState(() => {
    if (imageURLs.length === 1) return [...imageURLs, "", "", ""];
    if (imageURLs.length === 2) return [...imageURLs, "", ""];
    if (imageURLs.length === 3) return [...imageURLs, ""];
    if (imageURLs.length >= 1) return [...imageURLs];
  });

  const [selectedimag, setSelectedImage] = useState(images[0]);
  const [open, setOpen] = useState(false);

  const selectImage = (selectedImage) => {
    let index = images.findIndex((image) => image === selectedImage);
    setSelectedImage(images[index]);
  };

  const openImagesList = () => {
    alert("image list opened");
  };

  const openLightBox = () => {
    setOpen(true);
  };

  return (
    <>
      <MainBox width={width}>
        <div onClick={openLightBox}>
          <img src={selectedimag} />
        </div>
        <div>
          {images.length !== 0 &&
            images.map((image, index) => {
              if (images.length <= 4) {
                return (
                  <React.Fragment key={image}>
                    {image ? (
                      <SmallImageBox key={image}>
                        <img src={image} onClick={() => selectImage(image)} />
                      </SmallImageBox>
                    ) : (
                      <span key={index}></span>
                    )}
                  </React.Fragment>
                );
              } else {
                if (index < 3) {
                  return (
                    <SmallImageBox key={image}>
                      <img src={image} onClick={() => selectImage(image)} />
                    </SmallImageBox>
                  );
                } else if (index === 3) {
                  return (
                    <SmallImageBox key={index} onClick={openLightBox}>
                      <MoreHorizIcon />
                    </SmallImageBox>
                  );
                }
              }
            })}
          <LightBox open={open} defaultImage={selectedimag} setOpen={setOpen} imageURLs={imageURLs} />
        </div>
      </MainBox>
    </>
  );
};

export default GalleryBox;
{
  /* <SmallImageBox key={image} onClick={() => selectImage(image)}>
<img src={image} />
</SmallImageBox> */
}
