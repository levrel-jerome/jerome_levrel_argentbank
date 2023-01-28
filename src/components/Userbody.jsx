import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../feature/userSlice';
import { userService } from '../service/userService';

const Userbody = () => {

  let navigate = useNavigate();


  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);



  useEffect(() => {
    const body = {}
    const user = userService.getToken();
    axios.post('http://localhost:3001/api/v1/user/profile', body, {
      headers: {
        'Authorization': `Bearer ${user}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        dispatch(setUserData(res.data.body));
      })
  }, [dispatch]);

const [show, setShow] = useState(false);

useEffect(() => {
  if(!userService.isLogged()) {
    navigate('/sign')
  }
}, [navigate])

const handleSubmit = (event) => {
  event.preventDefault();
  const user = userService.getToken();
  const form = new FormData(event.target)
  const updateInfo = {
    firstName: form.get("firstName") || userInfo.firstName,
    lastName: form.get("lastName") || userInfo.lastName
  }
  
  axios.put('http://localhost:3001/api/v1/user/profile', updateInfo, {
  headers: {
    'Authorization': `Bearer ${user}`,
    }
  })
  .then((res) => {
  dispatch(setUserData(updateInfo)) 
  setShow(false) 
})
}

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
        {!show ?
        <div className='profile-connected'>
        {userInfo &&<h2><span className='userInfo'>{userInfo.firstName} {userInfo.lastName}  !</span></h2>}
        <button onClick={() => setShow(!show)} className="edit-button">Edit Name</button>
        </div>
        :  <form onSubmit={handleSubmit} className='change-info'>
        <div className='change-info-first'>
        <input type="text" 
            id="firstName"
            name="firstName"
            placeholder={userInfo.firstName}
        />
        <button className="save">Save</button>
        </div>
        <div className='change-info-last'>
        <input type="text" 
            id="lastName"
            name="lastName"
            placeholder={userInfo.lastName}
        />
        <button onClick={() => setShow(!show)} className="cancel">Cancel</button>
        </div>
        </form>}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Userbody;