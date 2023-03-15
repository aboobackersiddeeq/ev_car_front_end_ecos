import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Errorpage() {
    const navigate = useNavigate()
  return (
    <div className='text-white text-center'>
      <h1 className='text-center'>404 Error</h1>  
      <button className='btn btn-primary' onClick={()=>{navigate('/')}}>Back to Home</button>
    </div>
  )
}

export default Errorpage