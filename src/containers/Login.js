import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import colors from '../static/colors.js';
import Logo from '../static/img/logo.svg';

import { InputGroup, FormControl, Row, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import api from '../services/api.js';

import { connect } from 'react-redux';
import { MapDispatch } from '../store/index';

function Login({ userToken, userData, logado, login, response }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(!email);
  const [stayLoged, setStayLoged] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    //verificando se ta logado
    let token = window.localStorage.getItem("token");
    let user = window.localStorage.getItem("userData");
    if (token && token !== 'undefined' && user && user !== 'undefined') {
      loginAndRedirect(JSON.parse(token), JSON.parse(user));
    }
    if (userToken && userData && logado) {
      loginAndRedirect(userToken, userData);
    }
    //eslint-disable-next-line
  }, [])

  const handleDigitEmail = e => {
    e.preventDefault();
    let inserting = e.target.value.toLowerCase();
    setEmail(inserting);
    if (error.length > 0) {
      setError('');
    }
  }
  useEffect(() => {
    setDisabled(
      !email || !email.match(/^[\w.-]+@[\w-]+\.[a-z]{2,}(\.[a-z]{2,})?$/)
    );
    //response('disabledNext', !email || !email.match(/^[\w.]+@[\w]+\.[a-z]{2,}(\.[a-z]{2,})?$/))
  }, [email]);

  const handleDigitPassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
    if (error.length > 0) {
      setError('');
    }
  }

  const handleStayLoged = e => setStayLoged(!stayLoged);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      if (email.trim() === '' || password.trim() === '') {
        setError('Please, insert your credentials');
        return;
      }
      let data = await api.post('/login/', { email, password });
      if (data.data.status === 'success') {
        if (stayLoged) {
          window.localStorage.setItem("userData", JSON.stringify(data.data.data.user));
          window.localStorage.setItem("token", JSON.stringify(data.data.data.token));
        }
        loginAndRedirect(data.data.data.token, data.data.data.user);
      } else {
        setError('Please, verify your credentials');
        setPassword('');
      }
    } catch (error) {
      setError('You had an error:', error.message)
    }
  }

  const loginAndRedirect = (token, userdata) => {
    login(token, userdata);
    response('logado', true);
    history.push('/home');
  }

  const forgot = e => {
    alert('You cannot lost what you do not have. ;)');
  }

  return (
    <Container>
      <LoginCard>
        <CardHeader className="mb-5">
          <LogoWrapper>
            <img src={Logo} alt="logo" width="120" height="120" />
          </LogoWrapper>
        </CardHeader>
        <span style={{ display: 'inline-block', color: 'red', position: 'absolute', top: '25%', left: '25%' }}>{error}</span>
        <CardBody>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></InputGroup.Text>
            </InputGroup.Prepend>
            <NewInput
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email"
              onChange={handleDigitEmail}
              value={email || ''}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faKey}></FontAwesomeIcon></InputGroup.Text>
            </InputGroup.Prepend>
            <NewInput type="password"
              placeholder="Password"
              aria-label="password"
              aria-describedby="password"
              onChange={handleDigitPassword}
              value={password || ''}
            />
          </InputGroup>
          <Remember className="mb-2">
            <CheckBox type="checkbox" defaultChecked={stayLoged} onChange={handleStayLoged} />
            <span>Remember me</span>
          </Remember>
          <LoginBtn className="btn mb-3" as="input" type="submit" value="Login" onClick={handleLogin} disabled={disabled} />{' '}
        </CardBody>
        <ForgotPassword className="d-flex justify-content-center" onClick={forgot}>
          <span>Forgot your password?</span>
        </ForgotPassword>
      </LoginCard>
    </Container>
  )
}

const mapStateToProps = store => store;

export default connect(mapStateToProps, MapDispatch)(Login);

const Container = styled.div`
  margin: 0;
  border: 0;
  height: 100vh;
  min-height: 100vh;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
`;

const LoginCard = styled(Card)`
  margin-top: auto;
  margin-bottom: auto;
  margin: auto;
  width: 400px;
  border-radius: 5px;
  background-color: ${colors.color7};
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
`;

const CardHeader = styled(Card.Header)`
background-color: ${colors.color7};
border: none;
margin-bottom: 3rem !important;
&:first-child {
  border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
}
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -112px;
  left: 50%;
  margin-right: -50%;
  transform: translateX(-50%);
  width: 180px;
  height: 180px;
  background-color: ${colors.color6};
  border-radius: 50%;
  border: 0.75rem solid ${colors.color6};
  align-items: center !important;
  justify-content: center !important;

  > img {
    border-style: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`;

const CardBody = styled(Card.Body)`
  height: 100%;
  padding: 1.25rem;
  padding-top: 4rem;
  box-sizing: border-box;
`;

const NewInput = styled(FormControl)`
border: none !important;
border-radius: 0.25rem !important;
background-color: ${colors.color6};
filter: none !important;
color: white;
`;

const CheckBox = styled.input`
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
margin-top: 3px;
`;

const Remember = styled(Row)`
  color: white;
  align-items: center !important;
  >span {
    font-weight: bold;
    transform: translateY(5%);
  display: inline-block;
  font-size: 16px;
  }
`;

const LoginBtn = styled(Button)`
  margin-top: 20px;
  width: 100%;
  color: #fff;
  background-color: #0078D4;
`;

const ForgotPassword = styled(Card.Footer)`
padding: .75rem 1.25rem;
background-color: rgba(0, 0, 0, .03);
border-top: 1px solid rgba(0, 0, 0, .125);
> span {
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
}
&:last-child {
}
`;