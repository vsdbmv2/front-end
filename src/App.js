import React, { useEffect } from 'react';
import { Route, Switch, Link, NavLink, useHistory } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDatabase, faDna, faSyringe, faTools, faHdd, faUsers } from '@fortawesome/free-solid-svg-icons';
import Logo from './static/img/logo.svg';

import { connect } from 'react-redux';

import { MapDispatch } from './store/index';


// import Navbar from './components/Navbar.js';
import {
  Home,
  DatabaseStatus,
  Epitopes,
  Retrieve,
  SequenceMapping,
  SequenceSubtyping,
  Tools,
  Login
} from './containers';

function App({ userToken, userData, logoff, logado, response }) {
  const history = useHistory();
  const pages = [
    {
      label: 'Home',
      url: '/',
      icon: faHome,
      component: Home
    },
    {
      label: 'Database Status',
      url: '/database_status',
      icon: faDatabase,
      component: DatabaseStatus
    },
    {
      label: 'Sequence Mapping',
      url: '/sequence_mapping',
      icon: faDna,
      component: SequenceMapping
    },
    {
      label: 'Sequence Subtyping',
      url: '/sequence_subtyping',
      icon: faDna,
      component: SequenceSubtyping
    },
    {
      label: 'Epitopes',
      url: '/epitopes',
      icon: faSyringe,
      component: Epitopes
    },
    {
      label: 'Tools',
      url: '/tools',
      icon: faTools,
      component: Tools
    },
    {
      label: 'Retreive Data',
      url: '/retrieve',
      icon: faHdd,
      component: Retrieve
    },
  ]

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userData');
    logoff();
    history.push('/login');
  };

  useEffect(() => {
    if (!userToken) {
      let token = JSON.parse(window.localStorage.getItem('token'));
      // console.log('token', token);
      if (token) {
        response('userToken', token)
      }
    } else {
      // console.log('logado');
    }
  }, [response, userToken]);

  if (!logado && !userToken && !userData) {
    return <Login />
  } else {
    return (
      <>
        <Navbar style={{ backgroundColor: '#222629' }} className="d-lg-flex p-0">
          <Container>
            <Navbar.Brand><img src={Logo} width="43" height="43" alt="VSDBM V2" title="VSDBM V2"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {pages.map(page =>
                  <li size="md" key={page.url} className="nav-item">
                    <NavLink className="nav-link" to={page.url} style={{ textDecoration: 'none', color: '#99A0AB' }} activeClassName="active" exact><FontAwesomeIcon icon={page.icon} /> {page.label}</NavLink>
                  </li>
                )}
              </Nav>
              <Nav.Item>
                <Navbar.Brand>
                  <Link to='./login' style={{ textDecoration: 'none' }} onClick={logout}>
                    <Button variant="danger" size="md">
                      <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Logout
                      </Button>
                  </Link>
                </Navbar.Brand>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          {pages.map((page, index) => <Route path={page.url} component={page.component} key={index} exact />)}
          <Route path="/home" component={Home} exact />
          <Route path="*" component={Home} />
        </Switch>
      </>
    )
  }
}
const mapStateToProps = ({ userToken, logado }) => ({ userToken, logado });

export default connect(mapStateToProps, MapDispatch)(App);

// pages.map(page =>
//   <Route path={page.url} key={page.url} exact>
//     {page.component}
//   </Route>
// )

// <Route path='/database_status'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/sequence_mapping'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/sequence_subtyping'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/epitopes'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/tools'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/retrieve'>
//             <DatabaseStatus />
//           </Route>

//           <Route path='/'>
//             <Home />
//           </Route>