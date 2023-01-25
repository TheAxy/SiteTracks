import React from 'react'
import '../../styles/Error.css'

const Error: React.FC<React.PropsWithChildren> = React.memo(({children}) => {
        
    return (
        <div className='_error'>
            {children}
        </div>
    )
})

export default Error