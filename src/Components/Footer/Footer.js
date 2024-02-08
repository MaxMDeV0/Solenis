import "./Footer.css"
import typo from '../../images/logotypoblanc.svg'
import { useHistory } from "react-router-dom"
export default function Footer() {
    let history = useHistory()
    return <footer>
        <div className="footer" id="footer">
            <img className="typo" src={typo}/>
            <div className="array">
                <div className="col">
                    <p className="title">Parcourir</p>
                    <button onClick={()=>{history.push('/accueil')}}>Accueil</button><br/>
                    <button onClick={()=>{history.push('/produits')}}>Nos produits</button><br/>
                    <button onClick={()=>{history.push('/carriere')}}>Nos emplois</button><br/>
                    <button onClick={()=>{history.push('/avis-clients')}}>Nos avis clients</button><br/>
                    <button onClick={()=>{history.push('/audit-energetique')}}>Audit énergétique</button><br/>
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