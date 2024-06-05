import React, {  createContext, useState } from "react";

export const AddPostResponseContext = createContext();


const ContextShare = ({children})=>{
    const [addPostResponse,setAddPostResponse]=useState({})
    return(
        <div>
            <AddPostResponseContext.Provider value={{addPostResponse,setAddPostResponse}}>
                {children}
                </AddPostResponseContext.Provider>
        </div>
    )
}

export default ContextShare



