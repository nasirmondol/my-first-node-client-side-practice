import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const nameRef = useRef();
  const emailRef = useRef();


  useEffect( () =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  
  // Send data to the server
  const handleSubmit = e =>{

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email}
    
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data =>{
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
    })

    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault()
  }
 

  return (
    <div className="App">
      <h4>Total users: {users.length}</h4>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder='name' />
        <br />
        <input type="email" ref={emailRef} name="" id="" placeholder='email' />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {
          users.map(user => <li key={user.id}>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
