import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore architecto dolore magnam sapiente ipsum accusamus error. Voluptatibus, illo at! Tempora doloremque atque, alias corporis quas accusantium qui reiciendis ratione vero.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91-9876543210</li>
                    <li>contact@tomato.com</li>
                </ul>

            </div>


        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 - All Rights Reserved</p>

    </div>
  )
}

export default Footer