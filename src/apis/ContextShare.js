import React, { createContext, useState } from 'react'

//add property response
export const addResponseContext=createContext()
export const editResponseContext=createContext()
export const viewResponseContext=createContext()
function ContextShare({children})
 {
    const [addUpdate,setAddUpdate]=useState([])
    const [editUpdate,setEditUpdate]=useState([])
    const [viewData,setViewData]=useState([])
  return (
    <>
    <addResponseContext.Provider value={{addUpdate,setAddUpdate}}>
      <editResponseContext.Provider value={{editUpdate,setEditUpdate}}>
        <viewResponseContext.Provider value={{viewData,setViewData}}>
        {children}
        </viewResponseContext.Provider>
        </editResponseContext.Provider>
    </addResponseContext.Provider>
    </>
  )
}

export default ContextShare