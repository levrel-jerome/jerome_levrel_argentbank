import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userService } from '../service/userService';
import { useEffect } from 'react';


const Signinbody = () => {

  let navigate = useNavigate()

const [information, setInformation] = useState({
  email: "",
  password: ""
})

const handleChange = ({currentTarget}) => {
  const {value, name} = currentTarget
  setInformation({
    ...information,
    [name]: value
  })
}
const handleSubmit = (event) => {
  event.preventDefault();
  const form = new FormData(event.target)
  axios.post('http://localhost:3001/api/v1/user/login', information)
  .then((res) =>  {
    userService.saveToken(res.data.body.token, !!form.get("remember"))
    navigate('/user')
  })
}

  useEffect(() => {
    if(userService.isLogged()) {
      navigate('/user')
    }
  }, [navigate])

    return (
        <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Mail</label>
            <input type="text" 
            id="username"
            name="email"
            onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password"
            id="password"
            name="password" 
            onChange={handleChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="remember" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
    );
};

export default Signinbody;