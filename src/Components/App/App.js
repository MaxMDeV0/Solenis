import './GlobalStyles.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useEffect } from 'react';
import Home from '../Home/Home';
import Jobs from '../Jobs/Jobs';
import Customers from '../Customers/Customers';
import Products from '../Products/Products';
import Energy from '../Energy/Energy';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Mention from '../Mentions/Mentions';
import Donnees from '../Donnes/Donnees';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Admin from '../Admin/Admin';

function App() {

  useEffect(()=>{
    console.log(window.location.href)
  })
  return (
    <div>
      <BrowserRouter>
        <Switch>

          <Route path='/admin'><Admin/></Route>

          <Route path='/'>
            <Header/>
            <ScrollToTop>
                <Route  exact path='/'><Redirect from='/' to='/accueil'/>
                </Route>
                <Route path='/accueil'><Home/></Route>
                <Route path='/audit-energetique'><Energy/></Route>

                <Route path='/produits'><Products/></Route>
                <Route path='/carriere'><Jobs/></Route>
                <Route path='/avis-clients'><Customers/></Route>
                <Route path= '/mentions-legales'><Mention/></Route>
                <Route path='/politiques-de-confidentialite-des-donnees'><Donnees/></Route>
                


            </ScrollToTop>
            <Footer/>
          </Route>

        </Switch>

      </BrowserRouter>



    </div>
  );
}

export default App;
