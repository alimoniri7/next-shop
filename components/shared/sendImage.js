import React, {useCallback,useState,useEffect} from 'react'
import {useDropzone} from 'react-dropzone'


const SendImage = ({childred}) => {
    const [files, setFiles] = useState([]);

    useEffect(
        () => () => {
          files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
      );
    
      const onDrop = useCallback(
        (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
    
      
          let form = new FormData()
          form.append("fileUpload", acceptedFiles[0])
    
          fetch(`${process.env.NEXT_PUBLIC_HYGRAPH_URI}/upload`, {
          method: 'POST',
          headers:{"gcms-stage":"PUBLISHED"},
          body: form,
        })
          .then((res) => res.json())
          .then((data) => { console.log(data) })
          .catch((err) => { err })
    
        },
        [setFiles]
      );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default SendImage;
