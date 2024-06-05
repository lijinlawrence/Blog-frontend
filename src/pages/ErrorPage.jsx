import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className=' flex justify-center items-center h-screen flex-col'>
        <h1 className=' text-3xl '>Page Note Found</h1>
        <span>Goto <Link to='/' className=' text-blue-400 underline' >HomePage</Link> </span>
    </div>
  )
}

export default ErrorPage