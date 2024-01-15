import { useEffect } from 'react';
import { Route, Routes, Link, NavLink, useNavigate } from "react-router-dom";

import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDatabase, faDna, faSyringe, faTools, faHdd, faUsers, faServer } from '@fortawesome/free-solid-svg-icons';
import Logo from './static/img/logo.svg';

import { useDispatch, useSelector } from 'react-redux';
import { logoff, response } from './store/actions';

// import Navbar from './components/Navbar.js';
import {
  Home,
  DatabaseStatus,
  Epitopes,
  Retrieve,
  SequenceMapping,
  SequenceSubtyping,
  Tools,
  Login,
  ProcessData
} from './containers';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userToken);
  const userData = useSelector((state) => state.userData);
  const logado = useSelector((state) => state.logado);

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
      label: 'Retrieve Data',
      url: '/retrieve',
      icon: faHdd,
      component: Retrieve
    },
    {
      label: 'Process data',
      url: '/process',
      icon: faServer,
      component: ProcessData
    },
  ]

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userData');
    dispatch(logoff());
    navigate('/login');
  };

  useEffect(() => {
    if (userToken) return
    let token = JSON.parse(window.localStorage.getItem('token'));
    // console.log('token', token);
    if (token) response('userToken', token)
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
        <Routes>
          {pages.map((page, index) => <Route path={page.url} element={<page.component />} key={index} exact />)}
          <Route path="/home" element={<Home />} exact />
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    )
  }
}

export default App;