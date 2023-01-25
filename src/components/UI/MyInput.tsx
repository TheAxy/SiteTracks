import React from 'react'

interface IInput {
    IclassName: string,
    Itype: string,
    iplaceholder: string,
    IonChange: React.ChangeEventHandler
}

const MyInput: React.FC<IInput> = React.memo(({IclassName, Itype, iplaceholder, IonChange}) => {
  return (
    <input className={IclassName}
        placeholder={iplaceholder}
        type={Itype}
        onChange={IonChange}
    />
  )
})

export default MyInput