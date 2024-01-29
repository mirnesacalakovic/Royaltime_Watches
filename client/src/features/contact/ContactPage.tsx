
import { Typography } from "@mui/material";
import "./contact.css";
import { Link } from "react-router-dom";

export default function ContactPage(){
    return (
        <>
            
             <video className="video-class" autoPlay muted loop>
                <source src="images/video1.mp4" type="video/mp4" />
            </video>
            
            <div className="text-container" style={{textAlign: 'center'}}>
                <Typography variant="body2" sx={{margin:'1rem'}}>At Royaltime, we embrace the spirit of collaboration and welcome esteemed brands, influencers, and personalities to join our community as Brand Ambassadors. If you're a trendsetter, a trailblazer, or an iconic brands like Boss, Versace, Tissot and others, we invite you to showcase your products on our exclusive platform.</Typography>
                <Typography variant="body2" sx={{margin:'1rem'}}>Becoming a Royaltime Brand Ambassador is a seamless process. Simply reach out to our dedicated admin team, and they will guide you through the steps to feature your products in our curated collection. We believe in the power of partnerships and are excited to collaborate with exceptional brands that share our commitment to quality and style.</Typography>
                <Typography variant="body2" sx={{margin:'1rem'}}>Join us in redefining the world of luxury and precision. Contact our admin team today, and let's embark on a journey of timeless elegance together. Elevate your brand with Royaltime, where excellence meets exclusivity. </Typography>
                <Link to={"https://mail.google.com/mail/u/0/#inbox"} style={{backgroundColor:'#d3d8bb', color: '#163020', borderRadius: '10px', padding: '1rem', fontFamily: 'Montserrat', justifySelf: 'center'}} >Contact us</Link>

            </div>

        </>
       
        
        

    );
}  