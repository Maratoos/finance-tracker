import React from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

const TransactionForm = () => {
    const { addDocument, response } = useCollection()
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const [title, amount] = e.target.elements

        await addDocument({
            userId: user.uid, 
            title: title.value,
            amount: Number(amount.value),
        })
        title.value = ""
        amount.value = ""
    }
    return (
    <>
        <h3>Add a transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Transaction name:</span>
                <input name="title" type="text" required/>
            </label>
            <label>
                <span>Amount ($):</span>
                <input name="amount" type="number" required/>
            </label>
            {!response.isPending && <button>Add a transaction</button>}
            {response.isPending && <button disabled>Loading...</button>}
        </form>
    </>
  )
}

export default TransactionForm
