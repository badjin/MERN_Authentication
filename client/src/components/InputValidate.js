import React from 'react'

const InputValidate = ({filedName, type}) => {

  const errorFiled = (key) => {
    let message = ''
    switch (key) {
      case 'required':
        message = `This ${filedName} field is required`
        break;
      case 'minLength':
        message = `This ${filedName} must have at least ${filedName === 'name' ? '3' : '8'} characters`
        break;
      case 'pattern':
        message = `Please provide a valid ${filedName}`
        break;
      case 'validate':
        message = `The passwords do not match`
        break;
  
      default:
        message = 'Please provide a right value'
        break;
    }
    return message;
  }


  return (
    <>
      <p className='text-sm text-red-500 pl-2 -mb-4'> {errorFiled(type)}</p>
    </>
  )
}

export default InputValidate
