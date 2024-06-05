import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthorizationContext=createContext()

const TokenAuth = ({children})=>{
    const [isAuthorized,setIsAuthorized]=useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
          setIsAuthorized(true);
        }
      }, []);

    return (
        <tokenAuthorizationContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
        </tokenAuthorizationContext.Provider>

    )
}

export default TokenAuth