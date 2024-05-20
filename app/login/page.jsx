"use client";
import styles from './login.module.css'
import React, { useState } from "react";
import { withAuth } from "@/hoc/withAuth";
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { getUserStateAuth, userStateAuth } = useAuth();
  const userState = getUserStateAuth();
  const router = useRouter()
  const onSubmit = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+'/auth/login', {
      username: "mor_2314",
      password: "83r5^_"
    }).then(res => {
      let userState = userStateAuth(res.data.token)
      if (userState) router.push("/dashboard/products");
    }).catch(err => console.log('err login', err))
  }
  return (
    <>
      <div style={{ padding: 30}}>
        <h4 className='text-center'>LoginPage</h4>
        <div className={styles.container}>

          <div className={" text-center mb-3"}>
            <label className={styles.LoginTitle} >Username</label>
            <input className={styles.input}
              onChange={(e) => setUsername(e.target.value)} value={username}
              type="text" id="floatingInput" />


          </div>

          <div className="text-center mb-3">
            <label
              htmlFor="password"
              className="mb-2 block text-sm "
            >Password</label>
            <input className={styles.input} type="password"
              onChange={(e) => setPassword(e.target.value)} value={password}
              id="floatingPassword"
              placeholder="Password" />


          </div>


          <div className='text-center'>
            <button className="btn btn-primary  fw-bold"
              onClick={() => onSubmit()}
            >  Login</button>
          </div>
        </div></div>
    </>)
};

export default withAuth(LoginPage);
