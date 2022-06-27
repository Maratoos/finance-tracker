import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

export const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("login")
  }
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to="/">My Finances</Link></li>
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )} 
            {user && 
              <>
              <li>{user.displayName}</li>
              <li>
                <button className='btn' onClick={handleLogout}>Logout</button>
              </li>
              </>
            }
        </ul>
    </nav>
  )
}