import React from 'react'
import Feeds from '../components/Feeds'

const HomePage = () => {
  return (
    <div>
    <div className=' h-[30%] w-full bg-green-500 py-12 flex justify-center items-center flex-col'>
        <h1 className='text-5xl font-bold text-white mb-5'> Conduit</h1>
        <p className=' text-white text-xl'>A place to share your knowledge</p>
    </div>
    <div>
      <Feeds/>  
    </div>
    </div>
  )
}

export default HomePage