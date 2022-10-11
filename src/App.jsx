
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()
  //Enviar informacion desde userdCard hasta formUser
  const [updateInfor, setUpdateInfor] = useState()
  const [formIsClose, setFormIsClose] = useState(true)


  //Realiza el get de todos los users
  const getAllUser = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUser()
  }, [])

  //Crear un nuevo usuario
  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUser()
      })
      .catch(err => console.log(err))
  }

  //Elimina un usaurio especifico
  const deleteUserByID = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUser()
      })
      .catch(err => console.log(err))

  }

  //Actualiza un usuario especifico
  const updateUserByID = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUser()
      })
      .catch(err => console.log(err))
  }

  const handleOpenForm = () => {
    setFormIsClose(false)
  }

  return (
    <div className="App">
      <div className='App__container-title'>
        <h1 className='App__title'>Users CRUD</h1>
        <button onClick={handleOpenForm} className='App__btn'>Create a New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable__form'}`}>
        <FormUser
          createNewUser={createNewUser}
          updateInfor={updateInfor}
          updateUserByID={updateUserByID}
          setUpdateInfor={setUpdateInfor}
          setFormIsClose={setFormIsClose}
        />
      </div>
      <div className='users-container'>
        {
          users?.map(user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUserByID={deleteUserByID}
              setUpdateInfor={setUpdateInfor}
              setFormIsClose={setFormIsClose}
            />
          ))
        }
      </div>

    </div>
  )
}

export default App
