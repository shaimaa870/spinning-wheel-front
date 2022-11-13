import React from 'react'
import { CardText, Spinner } from 'reactstrap'

const Loader = () => {
    return (
      <>
        <Spinner animation="grow" size="lg"  />
        <CardText className='mb-0 mt-3 text-white text-align-center'>جاري تحميل اليانات ...</CardText>
      </>
    )
  }

export default Loader
