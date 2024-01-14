
import styled from 'styled-components';
import colors from '../../static/colors.js';
import {FormControl, Row, Button, Card} from 'react-bootstrap';

export const Container = styled.div`
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

export const LoginCard = styled(Card)`
  margin-top: auto;
  margin-bottom: auto;
  margin: auto;
  width: 400px;
  border-radius: 5px;
  background-color: ${colors.color7};
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
`;

export const CardHeader = styled(Card.Header)`
background-color: ${colors.color7};
border: none;
margin-bottom: 3rem !important;
&:first-child {
  border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
}
`;

export const LogoWrapper = styled.div`
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

export const CardBody = styled(Card.Body)`
  height: 100%;
  padding: 1.25rem;
  padding-top: 4rem;
  box-sizing: border-box;
`;

export const NewInput = styled(FormControl)`
border: none !important;
border-radius: 0.25rem !important;
background-color: ${colors.color6};
filter: none !important;
color: white;
`;

export const CheckBox = styled.input`
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
margin-top: 3px;
`;

export const Remember = styled(Row)`
  color: white;
  align-items: center !important;
  >span {
    font-weight: bold;
    transform: translateY(5%);
  display: inline-block;
  font-size: 16px;
  }
`;

export const LoginBtn = styled(Button)`
  margin-top: 20px;
  width: 100%;
  color: #fff;
  background-color: #0078D4;
`;

export const ForgotPassword = styled(Card.Footer)`
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