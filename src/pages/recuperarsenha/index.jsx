import React, { useState } from 'react';
import logo_2 from '../../assests/img/logo_2.png';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {url} from '../../assests/constants'
import './index.css';
import jwt_decode from 'jwt-decode';
import { Alert } from 'bootstrap';


const Login = () => {

    let history = useHistory('')
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`)

        fetch( url + '/login',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }

            alert('dados invalidos')
        })
        .then(data => {
            console.log(data)
        
            localStorage.setItem('token-edux', data.token);

            let usuario = jwt_decode(data.token)

            if(usuario.role === 'Administrador'){
                history.push('/dicas')
            }else{
                history.push('/')
            }
            
            console.log(usuario);
        })
        .catch(err => console.log(err))
    } 

    return(
        <div>
            <Menu />
            <Container className='form-height' style={{marginBottom : '2em', marginTop : '2em'}}>
                <Form className='form-signin' onSubmit={event => logar(event)} >
                    <div className="text-center">
                        <img src={logo_2} alt="Edux" style={{width : "64px"}}/>
                    </div>
                    <br/>
                    <small>Para recuperar sua senha, informe seu email de contato:</small>
                    
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Informe o email para contato:" value={email} onChange={event => setEmail(event.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginLeft: '115px'}}>
                            
                                Enviar
                            <Alert>Um email para contato foi enviado</Alert>
                        </Button>
                        <br/><br/>
                        <a href="/login" style={{marginTop: '30px', marginLeft: '73px'}}>Já tenho uma conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )
}

export default Login;