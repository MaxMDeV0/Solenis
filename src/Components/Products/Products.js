import React, { useState, useEffect, createElement } from "react";
import './Products.css';
import { useSelector, useDispatch } from 'react-redux'
import { setProduct,  } from '../store/counterSlice'
import { Switch , Route, useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { __src } from "../../config";


function Products(){
    const page = useSelector(state => state.solenis.page)
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'Solenis | Solutions';
        console.log(page)
    }, []);
    


    const [products, setProducts] = useState([])
    const [title, setTitle]=useState([])
    useEffect(()=>{
        fetch(__src+ `/json/produits.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            response.json().then(function(json){
                let prevState = []
                for(const object of json.complexe){
                    if(object.category !='Titre de la page'){
                        prevState.push(object.content[0])

                    }
                    else {
                        setTitle(object.content[0].contenu)
                    }
                }
                setProducts(prevState)
                dispatch(setProduct(prevState))
                console.log(prevState)
            })
        })


    },[])

    return (

        <div className="products container">
            <div className="titre">
                <div className="dark" >
                    <h1>{title}</h1>
                </div>
            </div>
            <div className="pagecontent">
                <article>
                    
                    <Switch>
                        <Route exact path='/produits'><div className="products_list"><ProductsList  items={products}/></div></Route>
                        <Route path='/produits/:id'><ProductInfo /></Route>
                    </Switch>

                </article>
                {/* <article className="productinfo">
                    <div className="title">{product.title}</div>
                    <span>{product.description}<br/><br/></span>
                    <InfoList item={product.infos}/>
                </article> */}
            </div>

        </div>
    )
}
function ProductsList ({items}){
    return (
        <>
            {items.map((item)=> {

                return (
                    <ProductItem item={item}/>
            )})}
        </>
    )
}
function ProductItem ({item}){
    const dispatch = useDispatch()
    const source = './media/'+item.image

    let history = useHistory()
    const clickhandler = ()=>{
        history.push(`/produits/${item.titre}`)
    }
    return (
        <button className="product" onClick={clickhandler}>
            <h3>{item.titre}</h3>
            <img className="categorybackground" src={source}/>
        </button>

    )
}


function ProductInfo (){
    let {page ,id} = useParams()
    console.log(id)
    const products = useSelector(state => state.solenis.product)
    const productsArray = [...products]
    console.log(productsArray.length)
    const [product, setProduct] = useState({image:""})
    const [source, setSource] = useState('')
    useEffect(()=>{
        setProduct(productsArray.find((element)=>element.titre == id))

    },[productsArray])
    useEffect(()=>{
        if(product!==undefined){
            setSource('../media/'+product.image);
        }
        console.log(product)
    },[product])
    const history = useHistory()
    const clickhandler = ()=>{
        history.goBack()
    }
    const infoList = {
            'Fonctionnalités' : 'chauffage et rafraîchissement',
            'Dimensions (hxwxd)' : '840x440x390 mm',
            'Niveau pression sonore (unité extérieure)': "41 dBA - 47.1 dBA",
            'Label énergétique chauffage (kW)': "jusqu’à A+++",
            'Température eau chaude sanitaire' : "jusqu'à un maximum de 65°C",
            'Fonctionneent': "jusqu'à un minimum de -28 °C",

        }
    
    return(
        <div className="detail">
            <button onClick={clickhandler} className='returnbtn'><FontAwesomeIcon icon={faArrowLeft} size='xl'/> Retour à la liste des produits</button>
            <h2 style={{color:'#001A70'}}>{product!==undefined && product.titre}</h2>
            <div className="detailcontent">
                <div className="imagecenter">
                    <img className="categorybackground" src={source} style={{maxWidth:'450px'}}/>

                </div>
                
                <div style={{maxWidth:'600px', fontSize:'20px'}}>
                    <strong className="title2">{product!==undefined && product.titre}</strong>
                    <br/><br/>
                    {product!==undefined && product.description}

                </div>
                

            </div>
            <h3>Caractèristiques techniques</h3>
                {product!==undefined && <InfoList item={product.infoList}/>}

        </div>
    )
}
function InfoList({item}){
    let html = []
    if(item!==undefined){
        for(const [key, value] of Object.entries(item)){
            let row =[]
            row.push(createElement('div', {className : 'infotitle'}, key))
            row.push(createElement('div', {className: 'infocontent'},value))
            html.push(createElement('div',{className: 'info'}, row ))
        }
    
    }
    return createElement('div', {className: "infodetail"}, html)
}

export default Products;