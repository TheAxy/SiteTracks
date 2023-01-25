import React from 'react'

interface IMyButton{
    IclassName: string,
    Itype: 'button' | 'submit' | 'reset',
    IonClick: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

const MyButton: React.FC<IMyButton> = React.memo(({IclassName, Itype, IonClick, children}) => {
  return (
    <button 
        className={IclassName}    
        type={Itype}
        onClick={IonClick}
        > {children}
    </button>
  )
})

export default MyButton