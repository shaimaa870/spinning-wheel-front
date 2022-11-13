import React from 'react'

function Image({ src = "", ...props }) {
    let url = process.env.REACT_APP_BASE_URL;
    if (!src.startsWith("http")) {
        url = `${url}/${src}`;
    }
    return (
        <img
            {...props}
            className="rounded-circle mr-50"
            src={url}
            alt="user avatar"
        />
    )
}

export default Image
