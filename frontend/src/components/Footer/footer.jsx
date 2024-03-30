import React from 'react'
import '../Footer/footer.css';
const footer = () => {
  return (
    <div className='footer mb-3' >
      <div className='container  d-flex justify-content-center align-items-center footer-custom'style={{backgroundColor: 'aliceblue', borderRadius:'10px'}}>
        <h4>Todo </h4> &nbsp; <p className='m-0'>&copy;DM</p>
      </div>
    </div>
  )
}

export default footer