import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import Card from '../../component/card/Card'
import { Link } from 'react-router-dom'
import registerImg from "../../assets/register.gif";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function register(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}register`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again later.")
    }
  }
  

  return (
    <section className={`container ${styles.auth}`}>
    <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={register}>
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn">
            Register
          </button>
        </form>
        <span className={styles.register}>
          <p>Already have an account? </p>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </Card>
    <div className={styles.img}>
      <img src={registerImg} alt="Register" width="300" />
    </div>
  </section>
  )
}

export default Register