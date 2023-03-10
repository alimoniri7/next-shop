import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PanoramaIcon from "@mui/icons-material/Panorama";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box } from "@mui/system";
import DarkBlueBtn from "./buttons/darkBlueBtn";
// import { useMutation } from '@apollo/client';
// import { PUBLISH_AVATAR } from '../../../GraphQL/gqls';

// dropzone component
const DndBox = ({ dragStatus, uploadedFile }) => {
  return (
    <Box
      height="300px"
      borderRadius={10}
      sx={{ cursor: "pointer" }}
      display="flex"
      px={2}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      backgroundColor={
        uploadedFile.error
          ? "error.main"
          : uploadedFile.loading
          ? "info.main"
          : uploadedFile.data
          ? "success.main"
          : dragStatus
          ? "secondary.main"
          : "#4C7C71"
      }
    >
      {uploadedFile.error ? (
        <>
          <ErrorOutlineIcon sx={{ fontSize: "150px", color: "white" }} />
          <Typography color="white" textAlign="center">
            ارسال عکس انجام نشد! لطفا مجدد تلاش نمایید
          </Typography>
        </>
      ) : uploadedFile.loading ? (
        <>
          <CircularProgress color="warning" size={70} />
          <Typography color="white" textAlign="center">
            {uploadedFile.data
              ? "در حال انتشار تصویر"
              : "در حال ارسال تصویر، لصفا صبر کنید"}
          </Typography>
        </>
      ) : uploadedFile.data ? (
        <>
          <CheckCircleOutlineIcon sx={{ fontSize: "150px", color: "white" }} />
          <Typography color="white" textAlign="center">
            ارسال عکس با موفقیت انجام شد!
          </Typography>
        </>
      ) : (
        <>
          <PanoramaIcon sx={{ fontSize: "150px", color: "skyblue" }} />
          <Typography color="white" textAlign="center">
            {dragStatus
              ? "حالا عکس خود را رها کنید"
              : "روی این باکس کلیک کنید یا عکس خود را درون این باکس رها کنید"}{" "}
          </Typography>
        </>
      )}
    </Box>
  );
};

// Main component -------------------------------------------------------------------------
const UploadImage = ({ onUploadDone }) => {
  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({
    error: false,
    data: null,
    loading: false,
  });
  console.log(uploadedFile);

  // send data of uploaded file to parent component
  // useEffect(() => {}, [uploadedFile.data]);

  // publish uploaded file
  // const [publishAvatar, publishRes] = useMutation(PUBLISH_AVATAR,{
  //   variables: {id: uploadedFile.data && uploadedFile.data.id}
  // })
  // useEffect(()=>{
  //   if(uploadedFile.data) publishAvatar()
  // }, [uploadedFile.data])
  // console.log(publishRes);

  // useEffect(()=>{
  //   if(publishRes.data){
  //     setUploadedFile(prev=>({
  //       ...prev,
  //       loading: false,
  //       error: false,
  //       published: true
  //     }))
  //   } else if(publishRes.error){
  //     setUploadedFile(prev=>({
  //       ...prev,
  //       loading: false,
  //       error: true,
  //       published: false
  //     }))
  //   }
  // }, [publishRes.data, publishRes.error])

  // fetch file ...
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      // console.log(acceptedFiles);
      if(acceptedFiles.length===0){
        alert('your file is too big!')
        return
      }
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      let form = new FormData();
      form.append("fileUpload", acceptedFiles[0]);

      setUploadedFile({
        error: false,
        data: null,
        loading: true,
      });

      fetch(`${process.env.NEXT_PUBLIC_HYGRAPH_URI}/upload`, {
        method: "POST",
        headers: { "gcms-stage": "PUBLISHED" },
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadedFile({
            error: false,
            data: { ...data },
            loading: false,
          });
        })
        .catch((err) => {
          setUploadedFile({
            error: true,
            data: null,
            loading: false,
          });
        });
    },
    [setFiles]
  );

  // upload avatar ui functions -------------------------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // after recieving data: send uploaded file to parent component , clear all states for upload new file
  useEffect(() => {

    if (uploadedFile.data) onUploadDone(prev=>[
      ...prev,
      uploadedFile.data
    ]);

    setTimeout(() => {
      if (uploadedFile.data) setUploadedFile(prev=> ({
        ...prev,
        loading: false,
        data: null,
        error: false
      }));
    }, 1000);
  }, [uploadedFile.data]);

  // config file type that can accept in react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      
    },
    minSize: 0,
    maxSize: 1000000,
    multiple: false
  });

  //-------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Box display="flex" gap={2} alignItems="center">
        <Typography>آواتار :</Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: 0,
              width: "100px",
              height: "100px",
              borderRadius: "1000px",
              flexDirection: "column",
            }}
            variant="contained"
            color="green"
            onClick={handleClickOpen}
          >
            <Typography color="white" fontSize={14}>
              ارسال عکس
            </Typography>
            <AddAPhotoIcon
              fontSize="small"
              color="white"
              sx={{ color: "white" }}
            />
          </Button>
        
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>ارسال آواتار</DialogTitle>
        <DialogContent width="100%">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DndBox dragStatus={true} uploadedFile={uploadedFile} />
            ) : (
              <DndBox dragStatus={false} uploadedFile={uploadedFile} />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
          variant="outlined"
          color="error"
            fullWidth            
            disabled={uploadedFile.loading || uploadedFile.data ? true : false}
            onClick={handleClose}
          >
            بیخیال
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadImage;
