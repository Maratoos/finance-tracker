import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSignup } from '../../hooks/useSignup'
import styles from './Signup.module.css'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isPending } = useSignup()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, userName)
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>Name:</span>
        <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
         />
      </label>
      <label>
        <span>Email:</span>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
      </label>
      <label>
        <span>Password:</span>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />
      </label>
      {error && <p>{error}</p>}
      <button className='btn'>Signup</button>
    </form>
  )
}