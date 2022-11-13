// import { Trans } from "@lingui/react";
// import React, { useEffect, useRef, useState } from "react";
// import { Media, Button, Label } from "reactstrap";
// import logoDefault from "src/assets/images/no-image.png";
// import { isBase64 } from "src/utils/genPassword";

// function ImageField({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors, setFieldValue },
//   name,
//   displayName,
//   mode,
//   model,
//   width = 280,
//   height = 280,
//   imageSource,
//   display = "column",
//   enableRemove = false,
//   hint,
//   ...props
// }) {
//   // const imageFixUrl =
//   //   (imageSource &&
//   //     imageSource !== "" &&
//   //     `${imageSource}?w=${width}&h=${height}`) ||
//   //   logoDefault;

//   const [defaultLogo, setDefaultLogo] = useState(logoDefault);
//   const logo = useRef(null);
//   isBase64(field.value);
//   useEffect(() => {
//     if (imageSource && imageSource !== "")
//       setDefaultLogo(`${process.env.REACT_APP_BASE_API_URL}/${imageSource}?w=${width}&h=${height}`);
//   }, [imageSource]);

//   useEffect(() => {
//     setFieldValue(field.name, "");
//   }, []);

//   const handleImageChange = (e) => {
//     e.preventDefault();
//     let reader = new FileReader();
//     let imgFile = e.target.files[0];
//     let validImg = isValidImage(imgFile);
//     if (validImg && validImg !== null) {
//       reader.onloadend = () => {
//         setDefaultLogo(URL.createObjectURL(imgFile));
//         setFieldValue(field.name, reader.result);
//       };
//       reader.readAsDataURL(imgFile);

//       return;
//     }
//   };

//   const isValidImage = (file) => {
//     return file?.type?.match("image.*") || false;
//   };

//   const resetHandle = (e) => {
//     e.preventDefault();
//     // setDefaultLogo(logoDefault)
//   };
//   console.log(process.env.REACT_APP_BASE_API_URL);
//   return (
//     <Media
//       className={`mb-2 avatar-field d-flex ${display === "column" ? "flex-column" : ""
//         } `}
//     >
//       <img
//         tag="img"
//         className="avatar-shadow rounded"
//         src={defaultLogo}
//         alt="user profile image"
//         height={height}
//         width={width}
//         style={{ border: `${mode === "add" ? "dashed" : ""}` }}
//         onClick={() => {
//           logo.current.click();
//         }}
//       />
//       {/* {errors ? <div className="invalid-feedback">{errors}</div> : null} */}
//       <div className={`mt-1 ${display === "column" ? " " : "ml-1"} `}>
//         {/* <Button.Ripple
//         tag={Label} className='mr-1' size='sm' color='primary'
//           // color="flat-dark"
//           // className={"ml-5"}
//           onClick={() => {
//             logo.current.click();
//           }}
//         >
//           <Trans id="upload"/>
//         </Button.Ripple> */}

//         {enableRemove && (
//           <Button
//             tag={Label}
//             color="secondary"
//             size="sm"
//             onClick={resetHandle}
//             outline
//           >
//             <Trans id="remove" />{" "}
//           </Button>
//         )}
//         {hint && <p>{hint}</p>}
//       </div>
//       {mode !== "add" && model && (
//         <Media className="font-medium-1 text-bold-600" tag="p" heading>
//           {displayName}
//         </Media>
//       )}
//       <input
//         ref={logo}
//         accept="image/*"
//         type="file"
//         style={{ display: "none" }}
//         onChange={handleImageChange}
//       />
//     </Media>
//   );
// }

// export default ImageField;
import { useField, useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import { Trash2, Upload } from "react-feather";
import { Media, Button } from "reactstrap";
import logoDefault from "src/assets/images/no-image.png";

function ImageField({
  name,
  displayName,
  mode,
  model,
  width = 280,
  height = 280,
  enableRemove = true,
  ...props
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const { error } = meta;
  const { value } = field;
  const { base64, url, readUrl } = value;

  let imageValue =
    base64 ||
    (readUrl &&
      `${process.env.REACT_APP_BASE_URL}/${readUrl}?w=${width}&h=${height}`) ||
    logoDefault;

  const isValidImage = (file) => {
    return file?.type?.match("image.*") || false;
  };

  const logo = useRef(null);
  const handleRemoveImage = () =>
    setFieldValue(name, {
      ...value,
      base64: null,
      readUrl: null,
      fileStatus: 3,
    });

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let imgFile = e.target.files[0];
    let validImg = isValidImage(imgFile);

    let fileName = imgFile.name.split(".")[0].toLowerCase();
    let extension = imgFile.name.split(".")[1].toLowerCase();

    if (validImg && validImg !== null) {
      reader.onloadend = () => {
        setFieldValue(name, {
          ...value,
          base64: reader.result,
          readUrl: null,
          fileStatus: url ? 2 : 1,
          name: fileName,
          extension,
        });
      };
      reader.readAsDataURL(imgFile);
      return;
    }
  };

  return (
    <Media
      className="mb-2 avatar-field d-flex flex-column image-container"
      style={{ width, height }}
    >
      <img
        tag="img"
        className="avatar-shadow rounded"
        src={imageValue}
        alt="user profile image"
        height={height}
        width={width}
        style={{ border: `${mode === "add" ? "dashed 2px grey" : ""}` }}
      />
      {error ? <div className="mx-auto mt-1 text-danger">{error}</div> : null}

      <div className="image-link">
        {enableRemove && imageValue !== logoDefault && (
          <Button
            className="btn-icon mb-1"
            color="danger"
            outline
            size="sm"
            onClick={handleRemoveImage}
          >
            <Trash2 size={20} />
          </Button>
        )}

        <Button
          color="dark"
          size="sm"
          onClick={() => {
            logo.current.click();
          }}
        >
          Upload
        </Button>
      </div>
      {mode !== "add" && model && (
        <Media className="font-medium-1 text-bold-600" tag="p" heading>
          {displayName}
        </Media>
      )}
      <input
        ref={logo}
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </Media>
  );
}

export default ImageField;
