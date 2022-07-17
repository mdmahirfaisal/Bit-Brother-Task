import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">affiliate program</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">shipping</a></li>
                            <li><a href="#">returns</a></li>
                            <li><a href="#">order status</a></li>
                            <li><a href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>online shop</h4>
                        <ul>
                            <li><a href="#">watch</a></li>
                            <li><a href="#">bag</a></li>
                            <li><a href="#">shoes</a></li>
                            <li><a href="#">dress</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><BsFacebook className='text-3xl mx-auto mt-[5px]' /></a>
                            <a href="#"><AiFillTwitterCircle className='text-3xl mx-auto mt-[5px]' /></a>
                            <a href="#"><AiFillInstagram className='text-3xl mx-auto mt-[5px]' /></a>
                            <a href="#"><BsLinkedin className='text-3xl mx-auto mt-[5px] rounded-xl' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;