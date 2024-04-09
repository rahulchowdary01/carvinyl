import React, { useContext,useState, useEffect } from 'react';
import { auth } from  "../firebase";
import { createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword, signOut,updateEmail as updateEmailFirebase, updatePassword as updatePasswordFirebase,sendEmailVerification } from 'firebase/auth';

const AuthContext= React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export default function AuthProvider({ children }) {
    const [CurrentUser, setCurrentUser]=useState()
    const [loading,setLoading]=useState(true)

    async function signup(email,password){
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        if (user && !user.emailVerified) {
          await sendEmailVerification(user);
        }
    
        return userCredential;
      } catch (error) {
        console.error('Signup error:', error.message);
        throw error;
      }
    }

    async function login(email,password){
      return signInWithEmailAndPassword(auth,email, password)
    }

    async function resetPassword(email){
      return sendPasswordResetEmail(auth,email)
    }

    async function logout(){
      return signOut(auth)
    }

    async function updateEmail(email) {
      try {
        const userCredential = await updateEmailFirebase(CurrentUser, email);
        const user = userCredential.user;
    
        if (user && !user.emailVerified && !user.providerData.some(provider => provider.email === email)) {
          await sendEmailVerification(user);
          throw new Error('Verification email sent to new email address.');
        }
    
        setCurrentUser(user);
        return userCredential;
      } catch (error) {
        console.error('Update Email Error:', error.message);
        console.error('Error Code:', error.code);
        throw error;
      }
    }

    async function updatePassword(password){
      return updatePasswordFirebase(CurrentUser, password);
    }

    useEffect(()=>{
      const unsubscribe =auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
      })
      return unsubscribe
    },[])


    const value={
        CurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
