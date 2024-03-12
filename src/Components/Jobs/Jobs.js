import React, {useEffect, useState} from "react";
import './Jobs.css';
import { Switch , Route, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faFileContract,faGraduationCap, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { setJobs } from '../store/counterSlice'
import { __src } from "../../config";

function Jobs(){
    useEffect(() => {
        document.title = 'Solenis | Recrutement';
      }, []);
    


    const [jobsData, setJobsData] = useState([]);
    const [finalData, setFinalData] = useState(JSON.parse(sessionStorage.getItem("jobdata") || '[]'))
    const [selectedJob, setSelectedJob] =useState(JSON.parse(sessionStorage.getItem("job")|| '{}'))
    const dispatch = useDispatch()
    const [job, setJob] = useState({})
    const [title, setTitle] = useState([])
    useEffect(()=>{
        //sessionStorage.setItem("job" , JSON.stringify({}))
        console.log(selectedJob)
        console.log(Object.keys(selectedJob).length !==0)

    },[selectedJob])

    useEffect(()=>{
        sessionStorage.setItem("data" , JSON.stringify(finalData))
        console.log(JSON.parse(sessionStorage.getItem("data") || "[]"), 'fetched')
        console.log(finalData)
        console.log(Object.keys(selectedJob).length !==0)
        console.log(selectedJob)
    },[finalData])
    useEffect(()=>{

        fetch(__src+`/json/carriere.json`,{
            headers:{
                'Cache-Control' : 'no-cache, no-store, must-revalidate',
                'Pragma' : 'no-cache',
                'Expire' : "0",
            }
        })
        .then(function(response){
            console.log(response)
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
                setJobsData(prevState)
                setFinalData(prevState)
                console.log(prevState)
                console.log(json)
                dispatch(setJobs(prevState))
            })
        })


    },[])
    return (
            <div className="jobs container">
                                        <div className="titre">
                            <div className="dark" >
                                <h1>{title}</h1>
                            </div>
                        </div>

                <div className="pagecontent">
                    <Switch>
                        <Route exact path='/carriere'>
                            <article>
                                
                                <div className="joblist">
                                    <JobList items={finalData} setSelectedJob={setSelectedJob} jobstate={[job, setJob]}/>
                                </div>
                            </article>
                            {Object.keys(job).length !==0 && <div className="jobcontent">
                                <a className="title">{job.titre}<br/><br/></a>
                                    <span><FontAwesomeIcon icon={faLocationDot} /> {job.villecode} {job.ville}</span>
                                    {job.salaire!=='' && <span>{job.salaire} € par mois</span>}
                                    {job.contrat!=='' && <span><FontAwesomeIcon icon={faFileContract} /> {job.contrat}</span>}
                                    <article>
                                        <h3>Les missions</h3>
                                        <div>{job.description!==undefined &&  job.description.length>0 && job.description.split('\n').map((item) => (< >{item}<br/></>))}</div>                       
                                    </article>
                                    <article>
                                        <h3>Le profil</h3>
                                        <div>{job.profil!==undefined && job.profil.length>0 && job.description.split('\n').map((item) => (< >{item}<br/></>))}</div>                       
                                    </article>
                                    <article>
                                        <h3>Bienvenu chez Solenis</h3>
                                        <div>{job.solenis!== undefined && job.solenis.length>0 && job.solenis}</div>                       
                                    </article>

                                    <h3></h3>
                            </div>}

                        </Route>
                        <Route path='/carriere/:id'>
                        <JobInfo jobstate={[job, setJob]}/>


                        </Route>
                    </Switch>




                </div>

            </div>

    )
}

function JobList (props){
    const {items, setSelectedJob} = props
    const [isSelected, setIsSelected] = useState(-1)
    const [job, setJob] = props.jobstate
    return (
        <>
           {items.map((item, index)=>{return (<JobItem item={item} index={index} isSelected={isSelected} setIsSelected={setIsSelected} setSelectedJob={setSelectedJob} jobstate={[job, setJob]}/>)})}
        </>
    )
}

function JobItem (props){
    const {item, index, isSelected, setIsSelected, setSelectedJob, jobstate} = props
    const dispatch = useDispatch()
    const history = useHistory()
    const [job, setJob]=jobstate
    const clickhandler = ()=>{
        setIsSelected(index)
        //dispatch(setJob(item))
        console.log(item)
        setJob(item)
        if(window.innerWidth<768){
            history.push(`/carriere/${item.titre}`)

        }
    }
    console.log(job)

    return(
        <button className="jobcard" onClick={clickhandler} style={isSelected==index?{borderColor:'#FE5716'}:null}>
        <a className="title" style={isSelected==index?{textDecoration:'underline'}:null}>{item.titre}<br/><br/></a>
        <span><FontAwesomeIcon icon={faLocationDot} /> {item.villecode} {item.ville}</span>
        {item.salaire!=='' && <span>{item.salaire} € par mois</span>}
        {item.contrat!=='' && <span><FontAwesomeIcon icon={faFileContract} /> {item.contrat}</span>}
        {item.formation!=='' && <span><FontAwesomeIcon icon={faGraduationCap} /> {item.formation}</span>}
        {item.experience!=='' && <span> Exp {item.experience} ans</span>}
        {/* {item.competence.length>0 && <><br/>{item.competence.map(item =>{
            return <span>{item}</span>
        })}</>} */}

    </button>

    )
}

function JobInfo (props){
    const [job, setJob] = props.jobstate
    let {id} = useParams()
    const history = useHistory()
    const jobs = useSelector(state=> state.solenis.jobs)
    const jobsArray = [...jobs]
    const clickhandler = ()=>{
        //console.log(id)
        history.goBack()
    }
    useEffect(()=>{
        console.log(jobsArray.find((element)=>element.titre == id))
        if(jobsArray.find((element)=>element.titre == id)!==undefined){
            setJob(jobsArray.find((element)=>element.titre == id))

        }
    },[jobs])
    return       <>                 
    <button onClick={clickhandler} className='returnbtn'><FontAwesomeIcon icon={faArrowLeft} size='xl'/> Retour à la liste des offres</button>

    {Object.keys(job).length !==0 && <div className="jobcontent2">
        <a className="title">{job.titre}<br/><br/></a>
            <span><FontAwesomeIcon icon={faLocationDot} /> {job.villecode} {job.ville}</span>
            {job.salaire!=='' && <span>{job.salaire} € par mois</span>}
            {job.contrat!=='' && <span><FontAwesomeIcon icon={faFileContract} /> {job.contrat}</span>}
            {job.formation!=='' && <span><FontAwesomeIcon icon={faGraduationCap} /> {job.formation}</span>}
            {job.experience!=='' && <span> Exp {job.experience} ans</span>}

            <article>
                <h3>Les missions</h3>
                <div>{job.description.length>0 && job.description.split('\n').map((item) => (< >{item}<br/></>))}</div>                       
            </article>
            <article>
                <h3>Le profil</h3>
                <div>{job.profil.length>0 && job.description.split('\n').map((item) => (< >{item}<br/></>))}</div>                       
            </article>
            <article>
                <h3>Bienvenu chez Solenis</h3>
                <div>{job.solenisdescription!==undefined && job.solenisdescription.length>0 && job.solenisdescription}</div>                       
            </article>

            <h3></h3>
        </div>}
        </> 

}


export default Jobs;