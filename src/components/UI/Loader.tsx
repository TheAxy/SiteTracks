import React from 'react'
import '../../styles/Loader.css'

const Loader: React.FC<React.PropsWithChildren> = React.memo(({children}) => {
  return (
    <div className='_loader'>
        {children}
    </div>
  )
})

export default Loader