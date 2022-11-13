import React from 'react'
import UILoader from '@components/ui-loader'
import Loader from './Loader'
function UiBlocker({loading, children }) {
    return (
        <UILoader blocking={loading} loader={<Loader />}>
            {children}
        </UILoader>
    )
}

export default UiBlocker
