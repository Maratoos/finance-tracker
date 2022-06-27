import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { getCollection } from '../../hooks/useCollection'
import styles from './Home.module.css'

export const TransactionList = () => {
  const { user } = useAuthContext()
  const { documents } = getCollection("transactions", user.uid)
  return (
    <ul className={styles.transactions}>
      {documents.length > 0 &&
        documents.map((transaction) => {
          return (
            <li key={transaction.id}>
              <p className={styles.name}>{transaction.title}</p>
              <p className={styles.amount}>${transaction.amount}</p>
            </li>
          )
        })
      }
      {documents.length === 0 && <p>Add your first transaction, {user.displayName}!</p>}
    </ul>
)
}
