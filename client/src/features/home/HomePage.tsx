import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./homepage.css";
import useProducts from "../../app/hooks/useProducts";
import ProductCardSkeleton from "../catalog/ProductCardSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { truncate, currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";
import Footer from "../../app/layout/Footer";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function HomePage(){

    useEffect( () => {
        Aos.init({duration: 2500});
    }, [])

    const {products} = useProducts();
    const {productsLoaded} = useAppSelector((state: any) => state.catalog);
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const settings = {
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        fade: true,
        lastSlide: true,
        border: false,
        margin: 0,
        padding: 0,
    };
            
    const settings1 = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
    };
    
    return (
        <>
            <Slider {...settings}>
                <div>
                    <p className="hero-text first">It's Royal Time</p>
                    <img src="/images/hero1.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: '100%'}}/>
                </div>
                <div>
                    <p className="hero-text second">Luxury <br/> you <br/> can <br/> only <br/> imagine</p>
                    <img src="/images/hero2.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: '100%'}}/>
                </div>
                <div className="container">
                    <img src="/images/hero3.jpg" alt="hero" className="image" style={{display: 'block', width: '100%', maxHeight: '100%'}}/>
                    <div className="middle">
                        <Link to='/catalog' className="text">SHOP NOW</Link>
                    </div> 
                </div>
            </Slider>
                
                <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', margin: '5px', marginBottom: '4rem', marginTop: '4rem', display: 'flex'}}> Wearing luxury watch is not just about keeping track of time; it's a statement of your life's success and endless style. Watches become a symbol of your commitment to excellence. </Typography>
                
                <div className="slider-container">
                    <Slider {...settings1}>
                        <div  className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>SEIKO</Typography>
                            <img className="photo" src="/images/products/seiko1.jpg" alt="Versace" />
                        </div>
                        <div className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>HAMILTON</Typography>
                            <img className="photo" src="/images/products/hamilton1.jpg" alt="Hamilton" />
                        </div>
                        <div className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>VERSACE</Typography>
                            <img className="photo" src="/images/products/versace1.jpg" alt="Versace" />
                        </div>
                        <div className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>TISSOT</Typography>
                            <img className="photo" src="/images/products/tissot1.jpg" alt="Tissot" />
                        </div>
                        <div className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>CERTINA</Typography>
                            <img className="photo" src="/images/products/certina-2-2.jpg" alt="Certina" />
                        </div>
                        <div className="photo">
                            <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>VERSACE</Typography>
                            <img className="photo" src="/images/products/versace-1-1.jpg" alt="Versace" />
                        </div>
                    </Slider>
                </div>

                <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center', margin: '5px', marginBottom: '6rem', marginTop: '4rem', display: 'flex'}}> Elevate your look with our exclusive designs that blend tradition with contemporary luxury. Every detail, from the case to the bracelet, is carefully crafted to achieve a harmony between classic and modern style.</Typography>
            
          
            <div className="for-container">
                <div className="wrapper">
                    <div className="imageClass">
                        <img className="for-image for-him"  src="images/for-him.2.jpg" alt="For him" />
                        <div className="content">
                            <Link to='/catalog' className="text-button">
                                <p className="link">FOR HIM</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="wrapper">
                    <div className="imageClass">
                        <img className="for-image for-her" src="images/for-her.1-1.jpg" alt="For her" />
                        <div className="content her-content">
                            <Link to='/catalog' className="text-button">
                                <p className="link">FOR HER</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        <div className="big-picture">
            <div data-aos='slide-right' className="first-show shows" data-aos-delay='100'>
                <Typography data-aos='slide-right' className="text-typ one" variant="h1" sx={{fontWeight: 'bold', fontFamily: 'Playfair Display', fontSize: '5rem',}} color='secondary.main'>Luxury</Typography>
            </div>
            <div data-aos='slide-right' className="third-show shows">
                <Typography data-aos='slide-right' data-aos-delay='100' className="text-typ two" variant="h1" sx={{fontWeight: 'bold', fontFamily: 'Salsa', fontSize: '5rem',}} color='secondary.main'>Quality</Typography>
            </div>
            <div data-aos='slide-right' className="second-show shows" data-aos-delay='100'>
                <Typography data-aos='ease-in' data-aos-duration="500" className="text-typ three" variant="h1" sx={{fontStyle: 'italic', fontFamily: 'Playfair Display', fontSize: '5rem',}} color='secondary.main'>Elegance</Typography>
            </div>
            

        </div>

        <div className="new-arivals">
            <Typography data-aos='fade-down'  variant="h4" sx={{ color: 'secondary.main', fontWeight: 'bold', fontFamily: 'Salsa', fontSize: '5rem',  textAlign: 'center', alignSelf: 'center', justifyContent: 'center', display: 'flex', margin: '2rem 0'}}>New arrivals</Typography>
            <Grid item xs={12} sm={8} md={9} spacing={5} sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'center', gap:'1rem', marginTop: '-1rem'}}>
                {(products).slice(1,4).map((product: any, index: any)=> (
                    <Grid item xs={12} sm={6} md={4} key={index} >
                        {!productsLoaded ? (
                        <ProductCardSkeleton/>
                        ) : (
                            <Link to={`/catalog/${product.id}`} style={{textDecoration: 'none', 
                            margin: '10px',}}>
                                <Card 
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        width: '300px',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        backgroundColor: 'primary.light',
                                        border: '1.5px solid #d6dbc0',
                                        borderRadius: '20px',
                                        transition: 'transform 0.15s ease-in-out',
                                        ":hover": {transform: 'scale3d(1.05, 1.05, 1)'}
                                    }}
                                >
                                <CardHeader
                                    title = {truncate(product.name, 55)}
                                    titleTypographyProps={{
                                        sx: {fontWeight: "bold", color: 'primary', fontSize: '0.8rem'}
                                    }}
                                />
                                <CardMedia
                                    sx={{ height: 140, backgroundSize: "contain", bgcolor: 'white' }}
                                    image={product.pictureUrl}
                                    title={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom color='secondary.dark' variant="h5">
                                    {currencyFormat(product.price)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {product.brand} / {product.model} / {product.gender}
                                    </Typography>
                                </CardContent>
                                
                                <CardActions>
                                    <LoadingButton sx={{color: 'text.primary'}} loading={status === 'pendingAddItem' + product.id} onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to cart</LoadingButton>
                                    <Button sx={{color: 'text.primary'}} component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                                </CardActions>
                            </Card>

                            </Link>
                        
                        )}       
                    </Grid>
                    
                ))}
            </Grid>
        </div>
       
        <Footer />


            
        </>

    );
}