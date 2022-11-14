import { Trans } from "@lingui/react";
import React, { useEffect, useRef, useState } from "react";
import { Media, Button, Label } from "reactstrap";
import logoDefault from "src/assets/images/no-image.png";
import { isBase64 } from "src/utils/genPassword";

function ImageField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue },
  name,
  displayName,
  mode,
  model,
  width = 280,
  height = 280,
  imageSource,
  display="column",
  enableRemove = false,
  hint,
  ...props
}) {

  // const imageFixUrl =
  //   (imageSource &&
  //     imageSource !== "" &&
  //     `${imageSource}?w=${width}&h=${height}`) ||
  //   logoDefault;

  const [defaultLogo, setDefaultLogo] = useState(logoDefault);
  const logo = useRef(null);
  isBase64(field.value)
  useEffect(() => {

    if (imageSource && imageSource !== "" )
      setDefaultLogo(`${imageSource}?w=${width}&h=${height}`);
  }, [imageSource]);

  useEffect(() => {
    setFieldValue(field.name, "");
  }, [])
  
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let imgFile = e.target.files[0];
    let validImg = isValidImage(imgFile);
    if (validImg && validImg !== null) {
      reader.onloadend = () => {
        setDefaultLogo(URL.createObjectURL(imgFile));
        setFieldValue(field.name, reader.result);
      };
      reader.readAsDataURL(imgFile);

      return;
    }
  };

  const isValidImage = (file) => {
    return file?.type?.match("image.*") || false;
  };

  const resetHandle = (e) => {
    e.preventDefault();
    // setDefaultLogo(logoDefault)
  };
  useEffect(()=>{
    console.log("filed",field?.name);
  console.log("value",field?.value);

},[field])


  return (
    <Media className={`mb-2 avatar-field d-flex ${display==="column"?"flex-column":""} `}>
      <img
        tag="img"
        className="avatar-shadow rounded"
        src={defaultLogo}
        alt="user profile image"
        height={height}
        width={width}
        style={{ border: `${mode === "add" ? "dashed" : ""}` }}
        onClick={() => {
          logo.current.click();
        }}
      />
      {/* {errors ? <div className="invalid-feedback">{errors}</div> : null} */}
      <div className={`mt-1 ${display==="column"?" ":"ml-1"} `}>
        {/* <Button.Ripple
        tag={Label} className='mr-1' size='sm' color='primary'
          // color="flat-dark"
          // className={"ml-5"}
          onClick={() => {
            logo.current.click();
          }}
        >
          <Trans id="upload"/>
        </Button.Ripple> */}

        {enableRemove && (
          <Button tag={Label}
          color='secondary' size='sm' 
          onClick={resetHandle} outline>
            <Trans id="remove"/>{" "}
          </Button>
        )}
         {hint &&<p>{hint}</p>}
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


