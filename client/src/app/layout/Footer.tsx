import { Typography } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import useProducts from "../hooks/useProducts";

export default function Footer() {
    const {brands} = useProducts();
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-things">
                    <Typography variant="h4" textAlign='center' color='#163020'>Enjoy the feel of luxury</Typography>
                    <div className="brands">
                        {brands.map((brand) => (
                            <Typography variant='h6'>{brand}</Typography>
                        ))}
                    </div>
                </div>
                <div className="footer-image">
                    <p className="footer-p">Step into the world of extraordinary elegance and impeccable style with our collection of luxury watches. These masterpieces not only display precise timekeeping but also serve as symbols of your unique taste and lifestyle.</p>
                </div>
            </div>
            <div className="mini-footer" >
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                    <p className="rights">All rights reserved</p>
                </div>
        </footer>
    );
}