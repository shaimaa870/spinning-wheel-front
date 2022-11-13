import React, { useEffect } from "react";
import { Alert } from "reactstrap";

export function FormAlert({
  errors = [],
  type = "danger",
  message = "Oh snap! Change a few things up and try submitting again.",
  icon = "flaticon-warning",
  link,
}) {
  if (!Array.isArray(errors))
    return null;
  if (!errors || errors.length === 0) {
    return <></>;
  }

  return (
    <Alert className='mb-50' color={type}>
      <div className='alert-body'>
        {errors && errors.map((v, i) => {
          if (typeof (v) === "string") {
            return (
              <p key={i} className='alert-text'>{i + 1}- {v}</p>
            )
          }
          return (

            <p key={i} className='alert-text'>{i + 1}- {v.errorMessage}</p>
          )
        })
        }
        {link &&
          <a href={link} className='alert-link' onClick={e => e.preventDefault()}>
            Resend confirmation
          </a>
        }
      </div>
    </Alert>
  );


  return null;
}
