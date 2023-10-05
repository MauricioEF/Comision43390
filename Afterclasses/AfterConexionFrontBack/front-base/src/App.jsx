import UsersService from './services/UsersServices';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState(null); // []

  useEffect(()=>{
    console.log(users);
    //Ésto se ejecuta al cargar el componente (2 veces)
    const fetchUsers = async() =>{
      const usersService = new UsersService();
      const {data} = await usersService.getUsers();
      console.log(data.mockUsers);
      setUsers(data.mockUsers);
    }
    !users&&fetchUsers();
  },[users])

  return (
    <>
    <h1>Hola</h1>
    {users&&users.map(user=>{
      return(<div key={user.id}>
        <p>{user.name}</p>
        <p>{user.role}</p>
      </div>)
    })}
    </>
  )
}

export default App
