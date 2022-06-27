import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { firestore } from "../firebase/config";

const initialState = {
    document:null,
    isPending:false,
    error:null,
    success:null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case "IS_PENDING": {
            return { isPending: true, document: null, error: null, success:true}
        }
        case "ADDED_DOCUMENT": {
            return { isPending: false, document: action.payload, error: null, success:true}
        }
        case "ERROR": {
            return { isPending: false, error: action.payload, document: null, success:false}
        }
        default:
            return state
    }
}


export const useCollection = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const collectionRef = collection(firestore, "transactions")

    const addDocument = async (newDocument) => {
        dispatch({type:"IS_PENDING"})
        try {
            const addedDoc = await addDoc(collectionRef, { ...newDocument, createdAt:serverTimestamp() })
            dispatch({type:"ADDED_DOCUMENT", payload: addedDoc})
        } catch(err) {
            dispatch({type:"ERROR", payload: err.message})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, isCancelled, response }
}

export const getCollection = (collectionName, userId) => {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const collectionRef = query(collection(firestore, collectionName), where('userId', '==', userId)) //,  orderBy("amount", "desc") 

        const unsubscribe = onSnapshot(collectionRef, (snap) => {
            let results = []

            snap.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id})
            });

            setDocuments(results)
            setError(null)
        })
        return () => {
            unsubscribe()
        }
    }, [collection])

    return { documents, error }
}

