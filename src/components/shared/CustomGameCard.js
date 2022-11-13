// ** Reactstrap

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomGameCard = ({ title, icon, onBtnClicked }) => {
  return (
    <div className="center-item justify-content-between my-2">
      <div className="mx-2">
        <h1 onClick={onBtnClicked} className="cursor-pointer">
          {title}
        </h1>
      </div>
      <div>
        <div
          onClick={onBtnClicked}
          className="rounded-circle center-item cursor-pointer icon-bg"
        >
          <div className="icon center-item">
            <FontAwesomeIcon icon={icon} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGameCard;
