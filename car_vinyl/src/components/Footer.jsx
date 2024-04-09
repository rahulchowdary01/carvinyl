import React from 'react'
import'../Styles/footer.css'
import Logo from '../assets/gold.png'

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={Logo} alt=""/>
        </div>
        <ul className="footer-links">
            <li>About</li>
            <li>Company</li>
            <li>Products</li>
        </ul>
        <div className='footer-copyright'>
            <hr />
            <p>Copyright @2024- All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer