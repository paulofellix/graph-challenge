import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Navbar, Nav, Container } from "react-bootstrap";

import Home from './pages/Home'
import YearEvolution from './pages/YearEvolution'
import PercentByDepartment from './pages/PercentByDepartment'

function App() {

  const baseURI = `${process.env.PUBLIC_URL}/`

  return (
    <HashRouter basename={baseURI}>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href={`${baseURI}#`}>Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={`${baseURI}#/YearEvolution`}>Evolução Salarial</Nav.Link>
            <Nav.Link href={`${baseURI}#/PercentByDepartment`}>Percentual financeiro por Departamento</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{paddingTop: 75}}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/YearEvolution' component={YearEvolution} />
          <Route path='/PercentByDepartment' component={PercentByDepartment} />
        </Switch>
      </Container>
     </HashRouter>
  );
}

export default App;
