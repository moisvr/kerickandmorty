import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Characters from '../../pages/Characters/Characters';
import Locations from '../../pages/Locations/Locations';

function App() {
   return (
      <BrowserRouter>
         <Layout>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/about" component={About} />
               <Route exact path="/characters" component={Characters} />
               <Route exact path="/locations" component={Locations} />
            </Switch>
         </Layout>
      </BrowserRouter>
   );
}

export default App;
