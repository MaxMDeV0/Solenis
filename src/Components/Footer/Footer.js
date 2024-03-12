import "./Footer.css"
import typo from '../../images/logotypoblanc.svg'
import {useEffect, useState} from 'react'
import { __src } from "../../config";

import { useHistory } from "react-router-dom"
export default function Footer() {
    let history = useHistory()
    const [titles, setTitles] = useState([])
    useEffect(()=>{
        fetch(__src+`/json/general.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            response.json().then(function(json){
                for(const object of json.complexe){
                    if(object.category=='Navigation'){
                        setTitles(object.content)

                    }
                }
              })
        })
  
  
    },[])

    return <footer>
        <div className="footer" id="footer">
            <img className="typo" src={typo}/>
            <div className="array">
                <div className="col">
                    <p className="title">Parcourir</p>
                    <button onClick={()=>{history.push('/accueil')}}>{titles.length>0 && titles[0].contenu}</button><br/>
                    <button onClick={()=>{history.push('/produits')}}>{titles.length>0 && titles[1].contenu}</button><br/>
                    <button onClick={()=>{history.push('/carriere')}}>{titles.length>0 && titles[2].contenu}</button><br/>
                    <button onClick={()=>{history.push('/avis-clients')}}>{titles.length>0 && titles[3].contenu}</button><br/>
                    <button onClick={()=>{history.push('/audit-energetique')}}>{titles.length>0 && titles[4].contenu}</button><br/>
                </div>
                <div className="col">
                    <p className="title">A propos</p>
                    <button onClick={()=>{history.push('/mentions-legales')}}>Mentions légales</button><br/>
                    <button onClick={()=>{history.push('/politiques-de-confidentialite-des-donnees')}}>Politiques de confidentialité des données</button><br/>


                </div>
                <div className="col">
                    <p className="title">Nous Contacter</p>
                    <p>contact@solenis-enr.fr</p>
                </div>
            </div>
        </div>
        
    </footer>
}