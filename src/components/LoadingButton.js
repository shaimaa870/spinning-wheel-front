import React from 'react'
import { Button, Spinner } from 'reactstrap'

function LoadingButton({ loading = false,children, ...props }) {
    return (

        <Button
            disabled={loading}
            {...props}
        >
            {children} {" "} {loading && <Spinner className='ml-1' animation="grow" size={'sm'} />}
        </Button>

    )
}

export default LoadingButton
