import React from "react";
import logoDefault from "src/assets/images/no-image.png";
function CustomAvatar({ src, width = 50, height = 50, rounded = false }) {
  return (
    <img
      src={src ? `${src}?w=${width}&h=${height}&mode=stretch` : logoDefault}
      className={rounded && "rounded-circle"}
    />
  );
}

export default CustomAvatar;
