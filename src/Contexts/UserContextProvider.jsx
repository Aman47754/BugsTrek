import React, { useContext, useState } from 'react'
import { createContext } from 'react'

export const userContext=createContext();

 const UserContextProvider = ({children}) => {

  const [user,setUser]=useState('');
  const [usermail,setUsermail]=useState('');

   
  return (

    <userContext.Provider value={{user,setUser,usermail,setUsermail}}>
        {children}
    </userContext.Provider>
  )
}

export default UserContextProvider