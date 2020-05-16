import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Attachments() {
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.authReducer.token);
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER}/api/cards/upload`,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token
        },
        data: { user: "1", card: "1", item: "1", files: acceptedFiles }
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setFiles(acceptedFiles);
    }
  });
  // const style = useMemo(
  //   () => ({
  //     ...(isDragActive ? activeStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {})
  //   }),
  //   [isDragActive, isDragReject, isDragAccept]
  // );
  return (
    <div className="item-attachments-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        dołącz plik
      </div>
      <p className="card-description-title">załączniki</p>
      {files.map((file, index) => {
        return file.path;
      })}
    </div>
  );
}
