import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/formUser.css'

const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: ''
}

const FormUser = ({ createNewUser, updateInfor, updateUserByID, setUpdateInfor, setFormIsClose }) => {

  useEffect(() => {
    if(updateInfor){
      reset(updateInfor) //se usa reset porque cambia los elementos del formulario
    }
  }, [updateInfor])


  const { handleSubmit, reset, register } = useForm()

  const submit = data => {
    if (updateInfor) {
      updateUserByID(updateInfor.id, data)
      setUpdateInfor()
    } else {
      createNewUser(data)
    }
    reset(defaultValues)
    setFormIsClose(true)
  }

  const handleCloseForm = () => {
    setFormIsClose(true)
  }

  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <i onClick={handleCloseForm} className="form__x fa-solid fa-xmark"></i>
      <h2 className='form__title'>{updateInfor? 'Edite User': 'New User'}</h2>
      <div className='form__div' >
        <label className='form__label' htmlFor="email">Email</label>
        <input className='form__input' placeholder='Enter your email' type="email" id="email" {...register('email')} />
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="password">Password</label>
        <input className='form__input' placeholder='Enter your password' type="password" id="password" {...register('password')} />
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="first_name">First Name</label>
        <input className='form__input' placeholder='Enter your first name' type="text" id="first_name" {...register('first_name')} />
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="last_name">Last Name</label>
        <input className='form__input' placeholder='Enter your last name' type="text" id="last_name" {...register('last_name')} />
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="birthday">BirthDay</label>
        <input className='form__input' type="date" id="birthday" {...register('birthday')} />
      </div>
      <button className='form__btn'>{updateInfor? 'Update' : 'Create'}</button>
    </form>

  )
}

export default FormUser