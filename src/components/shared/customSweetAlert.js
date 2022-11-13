import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const openSweetAlert = ({
  title,
  html,
  icon,
  confirmButtonClasses,
  confirmButtonText,
  animation = "tada",
  callBack = () => {},
}) => {
  return MySwal.fire({
    title: title,
    html: html,
    icon: icon,
    confirmButtonText: confirmButtonText,
    customClass: {
      confirmButton: confirmButtonClasses,
    },
    showClass: {
      popup: `animate__animated animate__${animation}`,
    },
    buttonsStyling: false,
  }).then(callBack);
};

export default openSweetAlert;
