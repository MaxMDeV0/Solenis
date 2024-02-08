import React, { useState, useEffect} from "react";
import "./Header.css"
import logo from '../../images/logo.svg'
import logo2 from '../../images/logo2.svg'
import typo from '../../images/typoshort.svg'
import typo2 from '../../images/logoTypo.svg'

import { NavLink, useHistory } from "react-router-dom";


function Header(){
    const [modalOpen, SetModalOpen] = useState(false)
    const navStyle= {
        color:'#001A70',
        textDecoration:'none',
        width: '100%',
        height: '100%',
        display:'block',
    }
    const mobileNavStyle={
        color:'white',
        textDecoration:'none'

    }
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, []);

    const history = useHistory()
    return (
        <header style={!modalOpen ?{backgroundColor:  'white'}:{backgroundColor:'#FE5716',overflow:'hidden'}} id='header'>
            <div className="logo">
                <img className='icone' src={modalOpen ? logo2 : logo} alt=""/>
                <img className='typo' src={typo2} alt="" style={{visibility: modalOpen? 'hidden' : null}}/>
            </div>
            <div className="logomobile" style={!modalOpen? {visibility: 'visible'} :{visibility:'hidden'}}>
                <img src={typo} className='typo'/>
            </div>
            <button className="btnmobile" style={!modalOpen? {visibility: 'visible'} :{visibility:'hidden'}} onClick={()=>{history.push('/audit-energetique')}}>Simuler mes aides</button>

            <div className="navcontainer">

                <ul className="navbar">

                    <li><NavLink style={navStyle} to='/accueil'>Accueil</NavLink></li>
                    <li><NavLink style={navStyle} to='/produits'>Nos Solutions</NavLink></li>
                    <li><NavLink style={navStyle} to='/carriere'>Carrière</NavLink></li>
                    <li><NavLink style={navStyle} to='/avis-clients'>Avis Clients</NavLink></li>
  
                </ul>
                <div className="burgerIcon" onClick={()=>SetModalOpen(!modalOpen)}>
                    <div className="burgerLine" id="top" style={modalOpen ? {backgroundColor:  'white',borderColor: 'white',transform:'translate(0,10px) rotate(45deg)', transition:'.3s'}:{}}/>
                    <div className="burgerLine" id="mid" style={modalOpen ? {visibility:"hidden"}:null}/>
                    <div className="burgerLine" id='bot' style={modalOpen ? {backgroundColor:  'white', borderColor: 'white', transform:'translate(0,-10px) rotate(-45deg)',transition:'.3s'}:{}}/>

                </div>
            </div>
            <button className="btn" onClick={()=>{history.push('/audit-energetique')}}>Simuler mes aides</button>

        {modalOpen && 
            <div className="modalBackground">
                <div className="modalContainer">
                    <ul className="menu_mobile">
                        <li><NavLink onClick={()=>SetModalOpen(false)} style={mobileNavStyle} to='/accueil'>ACCUEIL</NavLink></li>
                        <li><NavLink onClick={()=>SetModalOpen(false)} style={mobileNavStyle} to='/produits'>CONSULTER NOS PRODUITS</NavLink></li>
                        <li><NavLink onClick={()=>SetModalOpen(false)} style={mobileNavStyle} to='/carriere'>REJOIGNEZ-NOUS</NavLink></li>
                        <li><NavLink onClick={()=>SetModalOpen(false)} style={mobileNavStyle} to='/avis-clients'>ILS PARLENT DE NOUS</NavLink></li>
            
                    </ul>
                </div>
                
            </div>
        }

        </header>
    )
}

export default Header