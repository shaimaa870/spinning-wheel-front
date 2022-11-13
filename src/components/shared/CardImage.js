import React from "react";
import { CardImg, Card, CardText, CardBody, CardLink } from "reactstrap/lib";
import defaultImage from "src/assets/images/no-image.png";

function CardImage({ imageSrc, label }) {
  return (
    <div className="custom-card">
      <div className="custom-container">
        <img
          className="custom-img"
          src={
            imageSrc
              // ? `${process.env.REACT_APP_BASE_URL}/${imageSrc}?w=280`
              // : defaultImage
          }
          alt="Avatar"
        />
      </div>
      <div className=" py-2 border-top">
        <h4>
          <b>{label}</b>
        </h4>
      </div>
    </div>

    // <Card className="mb-3">
    //   <CardImg
    //     top
    //     src={
    //       imageSrc
    //         ? `${process.env.REACT_APP_BASE_URL}/${imageSrc}?w=280`
    //         : defaultImage
    //     }
    //     alt="card-top"
    //   />
    //   <CardBody>
    //     <CardText>{label}</CardText>
    //   </CardBody>
    // </Card>

    //   <CardBody className="mt-1 border-info shadow-none">
    //     <div className="image-container">
    //       <img
    //         className="img-fluid my-2 avatar-shadow rounded"
    //         src={
    //           imageSrc
    //             ? `${process.env.REACT_APP_BASE_URL}/${imageSrc}?w=220&h=220`
    //             : defaultImage
    //         }
    //         alt="Card cap"
    //       />
    //     </div>
    //     <CardText>{label}</CardText>
    //   </CardBody>
    // </Card>
  );
}

export default CardImage;
