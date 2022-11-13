import React from "react";
import noImage from "src/assets/images/no-image.png";

function PreviewImage({ src, defaultImage, width = "280", height = "280" }) {
  return src ? (
    <div className="custom-container custom-card text-center">
      <a
        target="_blank"
        href={`${process.env.REACT_APP_BASE_URL}/${src}?w=500`}
      >
        <div className="custom-img text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${src}?h=${height}&w=${width}&mode=pad`}
            alt="image"
            className="img-fluid"
            className="custom-img img-fluid"
          />
        </div>
      </a>
    </div>
  ) : (
    <div className="custom-container custom-card text-center">
      <img
        src={defaultImage || noImage}
        width={width}
        height={height}
        alt="image"
        className="custom-img img-fluid"
      />
    </div>
  );
}

export default PreviewImage;
