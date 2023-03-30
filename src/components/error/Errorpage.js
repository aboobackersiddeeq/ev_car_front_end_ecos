import React from 'react'
import { useNavigate } from 'react-router-dom'

const Errorpage = () => {
  const navigate=useNavigate()
  return (
    <div className='text-white text-center'>
      <h1 className='text-center'>404 error</h1>  
      <button className='btn btn-primary' onClick={()=>{navigate('/')}}>Back to Home</button>
    </div>
  )
}

export default Errorpage;