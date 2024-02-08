import React, {useState, useRef, useEffect} from "react";
import "./Energy.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
    useEffect(()=>{
        console.log(lastname)
    },[lastname])
    useEffect(() => {
        document.title = 'Solenis | Audit énergétique';
    }, []);

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
                        <h1>Audit énergétique</h1>
                    </div>
                </div>
                <div className="pagecontent">
                    <div className="main">
                        <article>
                            <h2>Évaluez, identifiez, améliorez</h2>
                            <p>L'audit énergétique permet de détecter les faiblesses énergétiques de votre habitation et de les corriger. Améliorer la performance énergétique de votre maison, c'est <strong>réduire vos factures d'énergie</strong>, limiter votre empreinte carbone, valoriser votre propriété et augmenter votre confort.
                            </p>
                        </article>
                        <article>
                            <h2>Les étapes de l'audit énergétique</h2>
                            <p className="one">
                                <br/>
                                <span className="number">1<br/></span><span style={{fontSize:'24px', fontWeight:'600'}}>Recueil d'informations</span><br/><br/>
                                <strong>Un technicien se déplace chez vous</strong> pour recueillir les éléments nécessaires à l'étude de votre logement. Vos factures d'énergies, la taille de votre logement,l'état de votre isolation, système de chauffage, etc...
                                <span className="downarrow"><br/><br/>&#x2193;</span>
                            </p>
                            <p className="one">
                                <span className="number">2<br/></span>Analyse des données<br/><br/>
                                Grâce à son expertise technique et à ses logiciels, le technicien identifie les pertes d'énergie de votre habitation. Il vous informe des <strong>subventions et des plans de financement</strong> dont vous pouvez bénéficier.
                                <span className="downarrow"><br/><br/>&#x2193;</span>

                            </p>
                            <p className="one" id="last">
                                <span className="number">3<br/></span>Élaboration d'une solution<br/><br/>
                                <strong>Créez</strong>, de concert avec notre technicien <strong>le projet de rénovation</strong> qui sied à vos envies et aux besoins énergetiques de votre maison. 

                            </p>
                        </article>

                    </div>
                    <article className="form">
                        <h2>Simulez vos aides</h2>
                        <p className="primrenov"><strong>MaPrimeRénov'</strong>, éco-financement, des questions sur les montants auxquels vous avez droit et les conditions d'éligibilité ?
                    Remplissez ce formulaire pour recevoir votre simulation et <strong>bénéficier d'un audit énergétique gratuit.</strong></p>

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