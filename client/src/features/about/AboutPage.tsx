import { useEffect } from "react";
import "./about.css";
import Aos from "aos";
export default function AboutPage(){
    useEffect( () => {
        Aos.init({duration: 2500});
    }, [])
    
    return (
        <div className="main-container"> 
            <div data-aos='slide-right' className="prvi prvi-div">
                <p style={{ fontWeight: 'bold', fontFamily: 'Salsa', fontSize: '2rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex', margin: '1rem 0'}}>Who are we?</p>
                <p>Welcome to Royaltime, your premier destination for exquisite timepieces that blend style and precision. Established in 2023, we are passionate about curating a collection of wristwatches that not only tell time but also reflect your unique personality.</p>
            </div>
            <div data-aos='slide-right' className="prvi drugi-div">
                <p style={{ fontFamily: 'Salsa', fontSize: '2rem', marginTop: '1rem'}}>Our brands</p>
                <p >Here at Royaltime, we pride ourselves on being the No. 1 for Brands in the designer watch world. Stocking a lot of top brands, from luxury Versace to hip HUGO, plus brands designed by us such as Depth Charge (available exclusively at Royaltime, we might add), we are here to help you find your ideal watch, whoever you are buying for. </p>
                <p > On top of our impressive brand collection, our buyers work hard to secure exclusive lines from a curation of our bestselling brands; the brands most loved by you. We love giving you, our customers, the VIP treatment by offering standout exclusives from the likes of Rotary, Guess and STORM London.</p>
            </div>
            <div data-aos='slide-right' className="prvi treci-div" style={{marginBottom: '2rem'}}>
                <p  style={{ fontFamily: 'Salsa', fontSize: '2rem', marginTop: '1rem' }}>Our Promise to You</p>
                <p> What sets Royaltime apart is not only our dedication to offering the finest watches but also our commitment to providing an exceptional shopping experience. Our knowledgeable and passionate team is here to assist you in finding the perfect timepiece that complements your style and exceeds your expectations.</p>
                <p> As a stockist, we have established strong relationships with leading watch manufacturers and authorized dealers, guaranteeing the authenticity and origin of every watch in our inventory. Your satisfaction and trust are at the core of our values.</p>
            </div>

            
            
        </div>
    );
}