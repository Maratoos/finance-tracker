import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../firebase/config'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)

    const signup = async (email, password, name) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email, 
                password
            )
        await updateProfile(response.user, {
            displayName: name
        })
        console.log(response);
        setIsPending(false)
        setError(null)
        } catch(error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }
    return { signup, error, isPending }
}