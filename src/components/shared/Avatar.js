import React from "react";
import defaultAvatar from "src/assets/images/no-user-image.jpg";

function Avatar({
  label = "",
  image,
  defaultImage = defaultAvatar,
  width = 45,
  height = 45,
  onClick = () => {},
}) {
  return (
    <div
      className="d-flex align-items-center cursor-pointer "
      onClick={onClick}
    >
      <img
        className="rounded-circle mr-50"
        src={
          (image && `${process.env.REACT_APP_BASE_URL}/${image}?w=${width}&h=${height}&mode=pad`) ||
          defaultImage
        }
        alt="avatar"
        height={height}
        width={width}
      />
      <span>{label}</span>
    </div>
  );
}

export default Avatar;
