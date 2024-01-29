
import agent from "../../app/api/agent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Ambassadors() {

    const [brands, setBrands] = useState<object[] | null>(null);
    
    useEffect(() => {
        agent.Account.fetchAllBrands().then(response => {
            setBrands(response);
        })
    }, []);

    return (
        <>
            
        <Link to={"/brandRegister"} style={{backgroundColor: '#d3d8bb', padding: '1rem', marginTop: '2rem', borderRadius: '10px'}}>Create Brand Ambassadors</Link>

        <Typography variant="h4" display='flex' justifyContent='center' margin='1rem' >Brand Ambassadors</Typography>

        {brands?.map((brand: any) => {
            <>
                <Typography variant="h6" display='flex' justifyContent='center' margin='1rem'>{brand.username}</Typography>
                <Typography variant="h6" display='flex' justifyContent='center' margin='1rem'>{brand.email}</Typography>
            </>
        }
        )}
        
        </>

    );
    
}