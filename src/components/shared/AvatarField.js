import { Media, Button, Label } from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { useField, useFormikContext } from "formik";
import Avatar from "@components/avatar";

function AvatarInput({
  name,
  userName,
  mode,
  model,
  width = 90,
  height = 90,
  imageSource,
}) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField();

  const renderUserAvatar = () => {
    if (!field.value[name]) {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary",
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="rounded mr-2 my-25"
          content={field.value[userName] ? field.value[userName] : "User Name"}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: `${height}px`,
            width: `${width}px`,
          }}
        />
      );
    } else {
      return (
        <img
          className="user-avatar rounded mr-2 my-25 cursor-pointer"
          src={field.value[name]}
          alt="user profile avatar"
          height={height}
          width={width}
        />
      );
    }
  };

  const isValidImage = (file) => {
    return file?.type?.match("image.*") || false;
  };

  const handleRemoveImage = () => {
    setFieldValue(name, "");
  };

  const handleImageChange = (e) => {
    debugger;
    e.preventDefault();
    let reader = new FileReader();
    let imgFile = e.target.files[0];
    let validImg = isValidImage(imgFile);
    debugger;
    if (validImg && validImg !== null) {
      reader.onloadend = () => {
        setFieldValue(name, reader.result);
      };
      reader.readAsDataURL(imgFile);
      return;
    }
  };

  return (
    <Media className="mb-2">
      {renderUserAvatar()}
      <Media className="mt-50" body>
        <h4>{field.value[userName] ? field.value[userName] : "User Name"} </h4>
        <div className="d-flex flex-wrap mt-1 px-0">
          <Button.Ripple
            id="change-img"
            tag={Label}
            className="mr-75 mb-0"
            color="primary"
          >
            <span className="d-none d-sm-block">Change</span>
            <span className="d-block d-sm-none">
              <Edit size={14} />
            </span>
            <input
              type="file"
              hidden
              id="change-img"
              onChange={handleImageChange}
              accept="image/*"
            />
          </Button.Ripple>

          <Button.Ripple color="secondary" outline onClick={handleRemoveImage}>
            <span className="d-none d-sm-block">Remove</span>
            <span className="d-block d-sm-none">
              <Trash2 size={14} />
            </span>
          </Button.Ripple>
        </div>
      </Media>
    </Media>
  );
}

export default AvatarInput;
