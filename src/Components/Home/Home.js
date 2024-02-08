import React, {useEffect, useState} from "react";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Home(){
    useEffect(() => {
        document.title = 'Solenis | Accueil';
      }, []);
      const size = useWindowSize();
      function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
          width: undefined,
          height: undefined,
        });
        useEffect(() => {
          // Handler to call on window resize
          function handleResize() {
            // Set window width/height to state
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }
          // Add event listener
          window.addEventListener("resize", handleResize);
          // Call handler right away so state gets updated with initial window size
          handleResize();
          // Remove event listener on cleanup
          return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
      }

    const [fetchedData, setFetchedData]= useState([])
    const [adviceData, setAdviceData]= useState([])
    const [data, setData] = useState([])
    const [title, setTitle] = useState([])
    const [mainContent, setMainContent]=useState([])
    const [partner, setPartner]=useState([])

    useEffect(()=>{
      fetch(`https://solenis-enr.fr/json/accueil.json`,{
          headers:{
              'Cache-Control' : 'no-cache, no-store, must-revalidate',
              'Pragma' : 'no-cache',
              'Expire' : "0",
          }
      })
      .then(function(response){
          response.json().then(function(json){
              for(const object of json.complexe){

                if(object.category=="Conseils en économie d'énergie"){
                  setAdviceData(object.content)
                }
                else if(object.category=="Titre de la page"){
                    setTitle(object.content[0].contenu)
                }
                else if(object.category=="Contenu principale"){
                    setMainContent(object.content)
                }else if(object.category == "Partenaires Solenis"){
                    setPartner(object.content)

                }
              }
            })
      })


  },[])


    const clickhandler=(e)=>{
        const bool = JSON.parse(e.target.getAttribute('aria-expanded'))
        e.target.setAttribute('aria-expanded', !bool )
    }
    return (
            <div className="home container">
                <div className="titre">
                    <div className="dark" >
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="pagecontent">
                    {mainContent.length>0 && mainContent.map((item)=> {return(
                        <article>
                            <h2>{item.titre}</h2>
                            <p>{item.contenu}</p>
                        </article>
                    )})}
                    <article className="homelist">
                        <h2>Les éco-gestes qui prennent soin de votre portefeuille</h2>
                        <MyList items={adviceData}/>
                    </article>

                    {/* <article>
                        <h2 >Nos partenaires</h2>
                        <p style={{textAlign:'center'}}>Ils nous font confiance !</p>

                    </article> 

 */}

                    </div>
    
            </div>
    )
}

function MyList({items}){
    const clickhandler=(e)=>{
        const bool = JSON.parse(e.target.getAttribute('aria-expanded'))
        e.target.setAttribute('aria-expanded', !bool )
    }
    const sibingclickhandler = (e)=>{
        const bool = JSON.parse(e.target.parentNode.children[0].getAttribute('aria-expanded'))
        e.target.parentNode.children[0].setAttribute('aria-expanded', !bool)
    }
    return (
        <div className="itemlist">
            {items.map((item, index)=> <div className="item">
                <button aria-expanded='false' onClick={clickhandler}>{item.titre}<div className='btnarrow'><FontAwesomeIcon icon={faPlay} size='xs'/></div></button>
                <div className="itemcontent" onClick={sibingclickhandler}>{item.contenu}</div>
            </div>)}
        </div>
    )
}

function Item({props, index}){
    return (
        <li className="advice" >
            <input type="checkbox" name={'detail-' + index} id={'detail-' + index}  />
            <details open>
                <summary>
                  <label for={'detail-' + index}>{props.title}</label>
                </summary>
                <div class="content">
                  <p>{props.content}</p>
                </div>
            </details>        
        </li>
    )
}

export default Home;