import React, { useContext, useState } from 'react'
import styles from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../component/card/Card'
import loginImg from "../../assets/login.gif";
import { UserContext } from '../../context/UserContext';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUserInfo} = useContext(UserContext);
  let navigate = useNavigate();


  async function login(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}login`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
      });
      if (response.status === 200) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
          navigate("/");
          toast.success("Login successful");
        })
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      console.log("Error during login",error);
      toast.error("login failed..!! Please try again later");
    }
  }

  return (
    <section className={styles.auth}>
    <div className={styles.img}>
      <img src={loginImg} alt="Login" width="300" />
    </div>
    <Card>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
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
            Login
          </button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
        </form>
      <div className={styles["accordion"]}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Demo Login (Username, Password)
        </AccordionSummary>
        <AccordionDetails>
        <p>Username: test2@gmail.com</p>
        <p>Password: test2</p>
        </AccordionDetails>
      </Accordion>
    </div>
        <span className={styles.register}>
          <p>Don't have an account? </p>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </Card>
  </section>
  )
}

export default LoginPage