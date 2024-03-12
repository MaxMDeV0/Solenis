import React, {useEffect, useState, useRef} from "react";
import './Customers.css';
import instal1 from '../../images/instal1.jpg'
import instal2 from '../../images/instal2.jpg'
import instal3 from '../../images/instal3.jpg'
import instal4 from '../../images/instal4.jpg'
import quote from '../../images/quote.svg'
import quote2 from '../../images/quote2.svg'
import axios from 'axios'
import { __src } from "../../config";

function Customers(){
    
    const [data, setData] = useState([])
    const [title, setTitle]=useState([])
    const [instal, setInstal] = useState([])
    const [mainContent, setMainContent] = useState([])
    useEffect(() => {
        document.title = 'Solenis | Avis Clients';
      }, []);


  
    useEffect(()=>{
        fetch( __src +`/json/avis.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            console.log(response)
            response.json().then(function(json){
                for(const object of json.complexe){
                    if(object.category=='avis'){
                        setData(object.content)
                    }
                    else if(object.category=="Titre de la page"){
                        setTitle(object.content[0].contenu)
                    }
                    else if(object.category == "Contenu principal") {
                        setMainContent(object.content)
                    }
                    else if (object.category=="Installations Client") {
                        setInstal(object.content)
                        console.log(object.content)
                    }
                }
                console.log(json)
            })
        })


    },[])

    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(()=>{
        const timer = setInterval(() => {
            if(data.length>1){
                console.log()
                setCurrentIndex((currentIndex + 1)% data.length);
    
            }

        }, 5000);
          return () => {
            clearInterval(timer);
          };
    },[currentIndex])
    
    return (
        <div className="customers container">
                <div className="titre">
                    <div className="dark" >
                        <h1>{title}</h1>
                    </div>
                </div>


                <MyList items={data} index={currentIndex}/>




                {mainContent.length>0 && mainContent.map((item)=> {return(
                        <article>
                            <h2>{item.titre}</h2>
                            <p>{item.contenu}</p>
                        </article>
                    )})}

                <div className="instal">
                    {instal.length > 0 && instal.map((element)=>
                        <img src={`./media/install/${element}`} width='100%' />
                    )}
                </div>

        </div>
    )
}

function MyList ({items, index}){
    const carousel = useRef();
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(()=>{
        setWindowWidth(document.getElementById('customerlist').offsetWidth)
        carousel.current.scrollLeft = windowWidth*index
    },[index, windowWidth])




    return(
        <ul className="feedbacklist" ref={carousel} id='customerlist'>
            { items.map((item, index)=> <Item props={item}  key={index}/>)}
        </ul>
    )
}
function Item ({props}){
    return (
        <li className="feedback">
            <span className="quote"><img src={quote} width='30px'/></span>
            <p>{props.contenu}<br/><br/><strong>{props.titre}</strong></p>
            <span className="quote2"><img src={quote2} width='30px'/></span>

        </li>

    )
}
export default Customers;