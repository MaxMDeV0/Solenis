import React, {useState, useRef, useEffect} from "react";
import "./Energy.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { __src } from "../../config";

export default function Energy (){
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('');
    const [surface, setSurface] = useState('');
    const [logement, setLogement] = useState('');
    const [revenu, setRevenu] = useState('');
    const [facture, setFacture] = useState('');
    const [formpage, setFormpage] = useState(1);
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState([])
    const [main, setMain] = useState([])
    const [steps, setSteps] = useState([])
    const [aides, setAides] = useState([])

    useEffect(()=>{
        console.log(lastname)
    },[lastname])
    useEffect(() => {
        document.title = 'Solenis | Audit énergétique';
    }, []);

    useEffect(()=>{
        fetch(__src + `/json/audit.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            response.json().then(function(json){
                for(const object of json.complexe){
  
                    if(object.category=="Contenu principale"){
                        setMain(object.content)
                    }
                    else if(object.category=="Titre de la page"){
                        setTitle(object.content[0].contenu)
                    }
                    else if(object.category=="Étapes de l'audit"){
                        
                        setSteps(object.content)
                    }
                    else if(object.category=="Aides"){
                        setAides(object.content)
                    }
                }
              })
        })
  
  
    },[])
  
  

    const validateForm1 = ()=>{
        let errors = {}

        if(name.length==0){
            errors.name = 'Champ oligatoire'
        }
        if(lastname.length==0){
            errors.lastname = 'Champ oligatoire'
        }
        if(email.length==0){
            errors.email = 'Champ oligatoire'
        }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
            errors.email = 'Champ incorrecte'
        }
        if(phone.length==0){
            errors.phone = 'Champ oligatoire'
        }else if(phone.length !=10){
            errors.phone = 'Champ incorrecte'
        }
        console.log(errors)
        if(Object.keys(errors).length ===0){
            setErrors({})

            return true
        }
        setErrors(errors)

        return false

    }
    const validateForm2 = ()=>{
        let errors = {}

        if(adress.length==0){
            errors.adress = 'Champ oligatoire'
        }
        if(city.length==0){
            errors.city = 'Champ oligatoire'
        }
        if(surface.length==0){
            errors.surface = 'Champ oligatoire'
        }
        if(logement.length==0){
            errors.logement = 'Champ oligatoire'
        }

        if(Object.keys(errors).length ===0){
            setErrors({})

            return true
        }
        setErrors(errors)

        return false

    }
    const validateForm3 = ()=>{
        let errors = {}
        if(revenu.length==0){
            errors.revenu = 'Champ oligatoire'
        }
        if(facture.length==0){
            errors.facture = 'Champ oligatoire'
        }
        if(Object.keys(errors).length ===0){
            setErrors({})

            return true
        }
        setErrors(errors)

        return false



    }
    const prevSlide = ()=> {
        if(currentIndex>0){
            setCurrentIndex(currentIndex + -1);

        }
        setFormpage(formpage-1)

    }

    const nextSlide=()=> {
        if(formpage==1){
            if(validateForm1()){
                if(currentIndex<2){
                    setCurrentIndex(currentIndex + 1);
                    setFormpage(formpage+1)
    
                }
        
            }
    
        }
        if(formpage==2){
            if(validateForm2()){
                if(currentIndex<2){
                    setCurrentIndex(currentIndex + 1);
                    setFormpage(formpage+1)
    
                }
        
            }

        }

        

    }
    const [currentIndex, setCurrentIndex] = useState(0)
    const carousel = useRef();

    useEffect(()=>{
        const windowWidth = window.innerWidth < 630? (window.innerWidth)*0.9 : 610

        carousel.current.scrollLeft = windowWidth*currentIndex
    },[currentIndex])

    const clickHandler = ()=>{
        if(validateForm3()){
            document.getElementById('energyform').submit()
        }
    }
    const submithandler = (e)=>{
        console.log(e.target.value)
        console.log('test')
    }
    return (
            <div className="energy container">
                <div className="titre">
                    <div className="dark" >
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="pagecontent">
                    <div className="main">
                        {main.map((item)=> {return(
                            <article>
                                <h2>{item.titre}</h2>
                                <p>{item.contenu}</p>
                            </article>
                        )})}

                        <article>
                            <h2>{steps.length>0 && steps[0].contenu}</h2>
                            {steps.map((item, index)=> {if(index>0)return(
                                <p className="one">
                                    <br/>
                                    <span className="number">{index}<br/></span><span style={{fontSize:'24px', fontWeight:'600'}}>{item.titre}</span><br/><br/>
                                    {item.contenu}
                                    <span className="downarrow" style={index==steps.length-1? {display:"none"}:null}><br/><br/>&#x2193;</span>
                                </p>
                            )})}

                        </article>

                    </div>
                    <article className="form">
                        {aides.map((item)=>{return(
                            <>
                            <h2>{item.titre}</h2>
                            <p className="primrenov">{item.contenu}</p>
                            </>
                        )})}
                        <form className="carousel" ref={carousel}   onSubmit={submithandler} action='https://solenis-enr.fr/request.php' id="energyform" method="post">
                        <div className="input_container">
                            <div className="twoinput">
                            <div className="input_group">
                                <label>Nom <span className="error">{errors.lastname}</span><br/><input type='text' name='lastname' placeholder="Exemple : Dupont" value={lastname} onChange={(e)=>setLastname(e.target.value)}/></label>
                            </div>
                            <div className="input_group">
                                <label>Prénom <span className="error">{errors.name}</span><br/><input type='text' placeholder="Exemple : Nicolas" name="name" value={name} onChange={(e)=>setName(e.target.value)}/></label>    
                            </div>

                            </div>
                            <div className="input_group">
                                <label>Email <span className="error">{errors.email}</span><br/><input type='email'name="email" placeholder="Exemple : example@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/></label>
                            </div>
                            <div className="input_group">
                                <label>Téléphone <span className="error">{errors.phone}</span><br/><input type='tel' name='phone' placeholder="Exemple : 06 02 03 04 05" value={phone} onChange={(e)=>setPhone(e.target.value)}/></label>    
                            </div>

                        </div>
                        <div className="input_container">
                            <div className="input_group">
                                <label>Adresse <span className="error">{errors.adress}</span><br/><input type='text' name="adresse" placeholder="Exemple : 0 rue de la paix" value={adress} onChange={(e)=>setAdress(e.target.value)}/></label>    
                            </div>
                            <div className="input_group">
                                <label>Ville <span className="error">{errors.city}</span><br/><input type='text' name="city" placeholder="Exemple : Lille" value={city} onChange={(e)=>setCity(e.target.value)}/></label>
                            </div>
                            <div className="twoinput">
                                <div className="input_group">
                                    <label>Logement <span className="error">{errors.logement}</span><br/><select id="maison" name="logement" onChange={(e)=>setLogement(e.target.value)} defaultValue={"DEFAULT"}>
                                            <option value="DEFAULT" disabled >Logement</option>
                                            <option value="maison" >Maison</option>
                                            <option value="appartement">Appartement</option>

                                        </select></label>
                                </div>
                                <div className="input_group">
                                    <label>Superficie <span className="error">{errors.surface}</span><br/><input name="surface" type='text' placeholder="Exemple : 100m2" value={surface} onChange={(e)=>setSurface(e.target.value)}/></label>    
                                </div>


                            </div>


                        </div>
                        <div className="input_container">
                            <div className="input_group">
                            <label>Revenu fiscal de référence <span className="error">{errors.revenu}</span><br/><select id="revenu" name="revenu" onChange={(e)=>setRevenu(e.target.value)} defaultValue={'DEFAULT'}>
                                        <option value="DEFAULT" disabled >Revenu</option>
                                        <option value="15">Moins de 15000€</option>
                                        <option value="15/20">Entre 15000 € et 20000 €</option>
                                        <option value="20/25">Entre 25000 € et 30000 €</option>
                                        <option value="25/30">Entre 30000 € et 35000 €</option>
                                        <option value="35">Plus de 35000 €</option>

                                    </select></label>
                            </div>
                            <div className="input_group">
                                <label>Factures d'energie mensuelles <span className="error">{errors.facture}</span><br/><select id="facture" name="factures" onChange={(e)=>setFacture(e.target.value)} defaultValue={'DEFAULT'}>
                                        <option value="DEFAULT" disabled >Factures</option>
                                        <option value="100">Moins de 100€</option>
                                        <option value="100/150">Entre 100 € et 150 €</option>
                                        <option value="150/200">Entre 150 € et 200 €</option>
                                        <option value="250">Plus de 200 €</option>

                                    </select></label>
                            </div>
                            <button type="button" id="submitbtn" onClick={clickHandler}>Découvrez vos aides</button>


                        </div>

                    </form>
                    <div className="formbuttons">
                        <button id="prevBtn" onClick={prevSlide} style={formpage>1?null:{visibility:"hidden"}}><FontAwesomeIcon icon={faArrowLeft}  style={{color:'#ffffff'}}/></button>
                        <span style={{backgroundColor: '#FE5716'}}/>
                        <span style={formpage>1? {backgroundColor: '#FE5716'}:null}/>
                        <span style={formpage>2? {backgroundColor: '#FE5716'}:null}/>

                        <button id="nextBtn" onClick={nextSlide} style={formpage>2?{visibility:"hidden"}:null}><FontAwesomeIcon icon={faArrowRight} style={{color:'#ffffff'}}/></button>

                    </div>

                    </article>
                </div>



            </div>

    )
}