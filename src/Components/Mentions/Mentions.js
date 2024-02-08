import './Mention.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function Mention (){
    useEffect(()=>{
        let header = document.getElementById('header').offsetHeight+'px'
        let footer = document.getElementById('footer').offsetHeight+'px'
        let mention = document.getElementById('mention')
        //mention.style.height = `${header.offsetHeight}  ${footer.offsetHeight})`
        mention.style.minHeight = `calc(100vh - ${header} - ${footer})`
        console.log(header)
    },[])

    const [mention, setMention]=useState([]);
    const [fetchedData, setFetchedData]=useState([])
    useEffect(()=>{
        fetch(`https://solenis-enr.fr/json/mentions-legales.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            console.log(response)
            response.json().then(function(json){
                setMention(json)
                console.log(json)
            })
        })


    },[])


    return <div className="mention container" id='mention'>
        {mention.map((item)=> {return(
            <article>
                <h2>{item.titre}</h2>
                <p>{item.contenu}</p>
            </article>
        )})}
    </div>
}