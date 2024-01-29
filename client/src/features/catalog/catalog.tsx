import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { setPageNumer, setProductParams } from "./catalogSlice";
import { FormLabel, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AddPagination from "../../app/components/AddPagination";
import useProducts from "../../app/hooks/useProducts";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to High'},

]

export default function Catalog(){
    const {products, brands, models, genders, filtersLoaded, metaData} = useProducts();
    //const products = useAppSelector(productSelectors.selectAll);
    const {productParams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
   

    //ovde su bila dva useEffecta koja su sada u useProducts hooku.
    useEffect( () => {
      Aos.init({duration: 2500});
    }, [])
    if(!filtersLoaded) return <LoadingComponent message="Loading products..."/>
    
    return (
      
    
      <Grid container columnSpacing={4}>
          <Grid item xs={12} sm={4} md={3} >
            <Paper data-aos='ease-in' sx={{mb: 2, backgroundColor: 'primary.light', color: 'white'}}>
              <ProductSearch/>
            </Paper>
            <Paper sx={{mb: 2, p: 2, backgroundColor: 'primary.light', color: 'white', borderRadius: '13px'}}>
              <FormLabel>Sort by:</FormLabel>
              <RadioButtonGroup 
                
                selectedValue={productParams.orderBy}
                options={sortOptions}
                onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
              />
            </Paper>

            <Paper sx={{mb: 2, p: 2, backgroundColor: 'primary.light', borderRadius: '13px'}}> 
              <CheckboxButtons label="Brands:" items={brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({brands: items}))} />
            </Paper>

            <Paper sx={{mb: 2, p: 2, backgroundColor: 'primary.light', borderRadius: '13px'}}> 
              <CheckboxButtons label="Models:" items={models} checked={productParams.models} onChange={(items: string[]) => dispatch(setProductParams({models: items}))} /> 
            </Paper>

            <Paper sx={{mb: 2, p: 2, backgroundColor: 'primary.light', borderRadius: '13px'}}> 
              <CheckboxButtons label="Genders:" items={genders} checked={productParams.genders} onChange={(items: string[]) => dispatch(setProductParams({genders: items}))} /> 
            </Paper>

          </Grid>

          <Grid item xs={12} sm={8} md={9} sx={{display: 'flex', flexWrap: 'wrap'}} >
            <ProductList products={products} />
          </Grid>

          <Grid item xs={3} />
          <Grid item xs={12} sm={8} md={9} sx={{mb: 2}}>
            {metaData  && 
            <AddPagination  metaData={metaData} 
            onPageChange={(page: number) => dispatch(setPageNumer({pageNumber: page}))}
            />}
          </Grid>
        </Grid>




        

        
        

    );
}