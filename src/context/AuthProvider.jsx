import { auth } from '@/firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, {   useEffect, useState } from 'react'
import AuthContext from './AuthContext'


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleSignin = ()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserData = (name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    // observe user state change
    useEffect(()=>{
        const unsubscriber = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unsubscriber()
    },[])


    const authInfo ={
        user, createUser, loginUser, googleSignin, logOut,loading,updateUserData
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider