import './admin.css'
import { Switch , Route, useParams, Link, Redirect } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import logo1 from '../../../src/images/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin, setCategory } from '../store/counterSlice'
import Cookies from 'js-cookie'
import logo from '../../../src/images/logoTypo.svg'

function Admin (){
    useEffect(() => {
        document.title = 'Solenis | Administration';
        console.log("admin")
      }, []);
    const [cookie, setCookie] = useState('')
    useEffect(()=>{
        if(cookie!=='' && cookie!=undefined){
            setLogin(true)
        }
        setCookie(Cookies.get('Auth'))

        console.log(cookie)
    },[cookie])
    const admin = useSelector(state =>state.solenis.admin)
    const catContent = useSelector(state => state.solenis.category)
    const [login, setLogin]=useState(false)
    return (
        <div className="container admin">
            <Link to='/'>
                <div className='adminlogo'>
                   <img src={logo1} height='50px'/>
                   <img src={logo} height='50px' style={{marginLeft:"15px"}}/>

                </div>
            </Link>
            <Switch>
            {!login && <Redirect from='/admin/:page' to='/admin'/>}


                <Route exact path='/admin'>
                    {!login && <Login cookie={[cookie, setCookie]}/>}
                    {login && <div className="menu">
                        
                        {/* <Link to='/admin/general' className='menu-item'>Général</Link> */}
                        <Link to='/admin/accueil' className='menu-item'>Accueil</Link>
                        <Link to='/admin/produits' className='menu-item'>Produits</Link>
                        <Link to='/admin/carriere' className='menu-item'>Carriere</Link>
                        <Link to='/admin/avis' className='menu-item'>Avis Clients</Link>
                        {/* <Link to='/admin/audit' className='menu-item'>Audit</Link> */}
                        <Link to='/admin/mentions-legales' className='menu-item'>Mention</Link>
                        <Link to='/admin/politiques-de-confidentialité-des-données' className='menu-item'>Politiques</Link>

                    </div>}

                </Route>
                <Route exact path='/admin/menu'><Login/></Route>

                <Route exact path='/admin/:page' children={<Edit/>}/>
                <Route path='/admin/:page/:category' children={<EditListIem item={catContent}/>}/>

            </Switch>

        </div>
    )
}

function Edit(){
    const [data, setData] = useState('')
    let {page, category} = useParams();
    const [isList, setIsList]= useState(false)
    const dispatch = useDispatch()
    console.log()
    useEffect(()=>{
        // fetch(`https://solenis-enr.fr/json/${page}.json`,{

        fetch(`http://localhost:5500/src/json/${page}.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            console.log(response)
            response.json().then(function(json){
                console.log(json)
                if(!Array.isArray(json)){
                    setIsList(true)
                    console.log(true)
                }else{
                    setIsList(false)
                }
                setData(json)
                dispatch(setAdmin(json.complexe))
                console.log(json)
            })
        })


    },[])
    const url = `http://solenis.localhost/index.php`
    // const url = `https://solenis-enr.fr/admin.php`

    const filename = `${page}.json`
    const path = `/admin/${page}`
    const clickhandler= ()=>{
        setData((prevState)=>{
            console.log(prevState)
            return [...prevState, {titre:'', contenu:''}]
        })
    }
    const addJob = (e)=>{
        if(e.keyCode == 13){
            console.log(newJob)
            setData((prevState)=>{
                return {complexe : [...prevState.complexe, {category:newJob, content:[{titre :''}]}]}
            })
            setNewJob('')
        }
    }
    const [newJob, setNewJob] = useState('')
    return(
        <>
        <form className='editcontainer' action={url} method='post' encType='multipart/form-data'>
                    <input type='text' value={filename} name='filename' style={{display:'none'}}/>

                    <Link to='/admin' className='backlink'>Menu &#8594;</Link>
                    <Link to={path} className='backlink2'>{page} &#8594;</Link>

                    {data.length!==0 && Array.isArray(data) && data.map((item)=>{
                        return <EditItem item={item}/>
                    })}
                    {data.length!==0 && !Array.isArray(data) && data.complexe.map((item)=>{
                        return <EditList item={item}/>
                    })}
                    <input type="submit" value='Enregistrer les modifications' className='submit' style={(page=="mentions-legales" ||page=="politiques-de-confidentialité-des-données")?null:{display:'none'}}/>

        </form>
        <button onClick={clickhandler} style={(page=="mentions-legales" ||page=="politiques-de-confidentialité-des-données")?null:{display:'none'}}>Nouveau Contenu</button>
        <label style={(page=='carriere' || page=='produits')?{display:'flex', flexDirection:'column', marginTop:'25px', width:'70vw',maxWidth:'550px'}:{display:'none'}}>
            {page=='carriere'? "Nouvelle offre d'emploi":"Nouveau produit"}
            <input type='text' value={newJob} onChange={(e)=>{setNewJob(e.target.value)}} style={(page=="carriere"||page=='produits')?null:{display:'none'}} className='newcontent' onKeyDown={addJob}/>
        </label>

        </>

    )
}
function EditList({item}){
    let {page} = useParams()
    const path = `/admin/${page}/${item.category}`
    const dispatch = useDispatch()
    return(
        <Link className='menu-item' to={path} onClick={()=>{dispatch(setCategory(item.content))}}>{item.category}</Link>
    )
}
function EditListIem({item}){
    let{page, category} = useParams()
    const [data, setData]= useState(item);
    const url=`/admin/${page}`
    const filename = `${page}.json`
    const clickhandler= ()=>{
        setData((prevState)=>{
            console.log(prevState)
            return [...prevState, {titre:'', contenu:''}]
        })
    }
    const actionUrl = 'http://solenis.localhost/index.php'
    // const actionUrl = 'https://solenis-enr.fr/admin.php'

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('submit')
    }
    const deletehandler = (e)=>{
        e.preventDefault()
        let data = {
            champ1: 'champ1Value',
            champ2: 'champ2Value',
            nouvelleVariable: 'nouvelleVariable'
        };
        window.location.href=`https://solenis-enr.fr/admin.php?event=delete&category=${category}&filename=${page}.json`
        // Convertir l'objet en chaîne JSON
    }
    console.log(data.length!==0 && Array.isArray(data) && page!='carriere' && page!='produits' || category=="Titre de la page")
    return <><form className='editcontainer'  action={actionUrl} method='post' encType='multipart/form-data'>
                <input type='text' value={filename} name='filename' style={{display:'none'}}/>
                <input type='text' value={category} name='category' style={{display:'none'}}/>

        <Link to='/admin' className='backlink'>Menu &#8594;</Link>
        <Link to={url} className='backlink2'>{page} &#8594;</Link>
        <Link to={url} className='backlink3'>{category} &#8594;</Link>

        {data.length!==0 && Array.isArray(data) && ((page!='carriere' && page!='produits') || category=="Titre de la page") && data.map((element)=>{
            return <EditItem item={element}/>
        })}
        {data.length!==0 && Array.isArray(data) && page=='carriere' && category!="Titre de la page" && data.map((element)=>{
            return <JobForm item={element}/>
        })}
        {data.length!==0 && Array.isArray(data) && page=='produits' && category!="Titre de la page" && data.map((element)=>{
            return <ProductForm item={element}/>
        })}

        <input type="submit" value='Enregistrer les modifications' className='submit'/>
        <input type="submit" value='Supprimer la fiche' className='delete' style={(category!='Titre de la page' && page=='produits'||page=='carriere' )?null:{display:'none'}} onClick={deletehandler}/>

    </form>
    <button onClick={clickhandler} style={(page=='carriere' || page=='produits' || category=='Titre de la page' || category=='Navigation')?{display:"none"}:null}>Nouveau Contenu</button>
</>
    
}
function EditItem({item}){
    let {category} = useParams()
    console.log('test')
    console.log(item)
    const [title, setTitle]=useState(item.titre)
    const [content, setContent]=useState(item.contenu)
    const onKeyDown = (e)=>{
        if(e.key ==='Enter' && !e.shiftKey){
            e.preventDefault()
        }

    }
    if(category=='Titre de la page'){
        return (
            <div className='adminform'>
                <label>Titre de la Page</label>
                <input type='text' value={content} onChange={(e)=>{setContent(e.target.value)}} name={title} onKeyDown={onKeyDown}/>

            </div>
        )
    }
    else if(category=="Navigation"){
        return (
            <div className='adminform'>
            <label>Page {title}</label>
            <input type='text' value={content} onChange={(e)=>{setContent(e.target.value)}} name={title} onKeyDown={onKeyDown}/>

        </div>

        )
    }
    return(
        <div className='adminform'>

        <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} onKeyDown={onKeyDown}/>
        <textarea  value={content} onChange={(e)=>{setContent(e.target.value)}} name={title} onKeyDown={onKeyDown}/>
        </div>

    )
}
function JobForm({item}){
    const [title, setTitle]=useState(item.titre)
    const [date, setDate]=useState(item.date)
    const [ref, setRef] = useState(item.reference)
    const [contrat,setContrat ] = useState(item.contrat)
    const [city,setCity ] = useState(item.ville)
    const [revenu,setRevenu ] = useState(item.salaire)
    const [formation,setFormation ] = useState(item.formation)
    const [exp,setExp ] = useState(item.experience)
    const [profil,setProfil ] = useState(item.profil)
    const [desc,setDesc ] = useState(item.description)
    const [solenis, setSolenis]=useState(item.solenis)

    const onKeyDown = (e)=>{
        if(e.key ==='Enter' && !e.shiftKey){
            e.preventDefault()
        }

    }

    return(
        <div className='adminform'>
            <input type='text' value='job' name='type' style={{display:'none'}} />

        <label>
            Enoncé du poste
            <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} name='titre' onKeyDown={onKeyDown} />
        </label>
        <label>
            Date de publication
            <input type='text' value={date} onChange={(e)=>{setDate(e.target.value)}}name='date'onKeyDown={onKeyDown} />
        </label>
        <label>
            Réference de l'offre
            <input type='text' value={ref} onChange={(e)=>{setRef(e.target.value)}} name='reference'onKeyDown={onKeyDown}/>
        </label>

        <label>
            Type de Contrat
            <input type='text' value={contrat} onChange={(e)=>{setContrat(e.target.value)}} name='contrat'onKeyDown={onKeyDown}/>
        </label>
        <label>
            Ville
            <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} name='ville'onKeyDown={onKeyDown}/>
        </label>
        <label>
            Salaire
            <input type='text' value={revenu} onChange={(e)=>{setRevenu(e.target.value)}} name='salaire'onKeyDown={onKeyDown}/>
        </label>
        <label>
            Formation
            <input type='text'  value={formation} onChange={(e)=>{setFormation(e.target.value)}} name='formation'onKeyDown={onKeyDown}/>        
        </label>
        <label>
            Experience
            <textarea  value={exp} onChange={(e)=>{setExp(e.target.value)}} name='experience'onKeyDown={onKeyDown}/>
        </label>
        <label>
            Profil
            <textarea  value={profil} onChange={(e)=>{setProfil(e.target.value)}} name='profil'onKeyDown={onKeyDown}/>
        </label>

        <label>
            Missions / description du poste
            <textarea  value={desc} onChange={(e)=>{setDesc(e.target.value)}} name='description'onKeyDown={onKeyDown}/>
        </label>
        <label>
            Description de Solenis
            <textarea  value={solenis} onChange={(e)=>{setSolenis(e.target.value)}} name='solenis'onKeyDown={onKeyDown}/>
        </label>

        </div>

    )
}
function ProductForm({item}){
    const [title, setTitle]=useState(item.titre)
    const [desc,setDesc ] = useState(item.description)
    const [infoList,setInfoList]=useState('')
    const [img, setImg] = useState(item.image)
    useEffect(()=>{
        let prevState = ''
        if(item.infoList!==undefined){
            for (const [key, value] of Object.entries(item.infoList)){
                prevState +=key+':'+value+'\n'
            }

        }
        setInfoList(prevState)
    },[])
    const onKeyDown = (e)=>{
        if(e.key ==='Enter' && !e.shiftKey){
            e.preventDefault()
        }
    }
    return(
        <div className='adminform'>
            <input type='text' value='product' name='type' style={{display:'none'}}/>

        <label>
            Nom du produit
            <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} name='titre'onKeyDown={onKeyDown} />
        </label>
        <label>
            Caractèristiques techniques
            <textarea type='text' value={infoList} onChange={(e)=>{setInfoList(e.target.value)}} name='infoList' onKeyDown={onKeyDown}/>
        </label>

        <label>
            Description du produits
            <textarea  value={desc} onChange={(e)=>{setDesc(e.target.value)}} name='description'onKeyDown={onKeyDown}/>
        </label>
            <input type='file' style={{border:'none'}} name='image' accept='.webp' value={img}/>

        </div>

    )
}

function Login(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = props.cookie
    const getResponse= async (e)=>{
e.preventDefault()
        fetch('https://solenis-enr.fr/login.php',{
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify({"mdp":password, "user":username}),
            headers:{
                "Content-type": "application/json"
            }
        })
            .then(function(response){
                console.log(response)
                setCookie(Cookies.get('Auth'))
            })
        setPassword('')
        setUsername('')
        setCookie(Cookies.get('Auth'))

    }
    return <form className='login' action='https://solenis-enr.fr/login.php' method='post' onSubmit={getResponse} target="dummyframe">
        <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>
        <label>
            Nom d'utilisateur
            <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} name="user"/>
        </label>
        <label>
            Mot de passe
            <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)} name="mdp"/>
        </label>
        <input type='submit' value='Se connecter'/>

    </form>
}
export default Admin;