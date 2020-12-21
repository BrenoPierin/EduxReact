import React, {useState, useEffect} from 'react';
import logo_2 from '../../assests/img/logo_2.png';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import {url} from '../../assests/constants'
import { Form, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './index.css';

    


const Cadastrar = () => {
    const history = useHistory();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idPerfil, setidPerfil] = useState('');
    const [perfis, setPerfis] = useState([]);

    useEffect(() => {
        listarPerfis()
    }, []);

    const listarPerfis = () => {
        fetch(url + '/perfil')
            .then(response => response.json())
            .then(data => {
                setPerfis(data);
                console.log(data);
            })
            .catch(err => console.error(err));
    }

    const cadastro = (event) => {
        event.preventDefault();

        fetch(`${url}/usuario`, {
            method: 'POST',
            body: JSON.stringify({
                nome     : nome,
                email    : email,
                senha    : senha,
                idPerfil : idPerfil

            }),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(response => {
                if (response.ok) {
                    alert('Cadastro realizado com sucesso!')
                    history.push('/login');
                }
            })
    }

    return (
        <div className='cordefundo'>
            <Menu />
            <Container className='form-height' style={{ marginTop: '120px', borderRadius: '30px' }}>
                <Form className='form-signin' onSubmit={event => cadastro(event)}>
                <img src={logo_2}  alt="Logo EduX" />
                    <br />
                    <small className='tituloh2'>Informe os dados abaixo</small>
                    <hr />
                    <Form.Group controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Informe o nome" value={nome} onChange={event => setNome(event.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Informe a senha" value={senha} onChange={event => setSenha(event.target.value)}required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPerfil">
                        <Form.Label>Tipo de usuário</Form.Label>
                        <Form.Control as="select" type="text" placeholder="Informe o tipo de usuário" value={idPerfil} onChange={event => setidPerfil(event.target.value)} >
                            {
                                perfis.map((item, index) => {
                                    return(
                                        <option key={index} value={item.idPerfil}>{item.permissao}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <br /><br />
                    <a href="/login" style={{ marginTop: '30px' }}>Já tenho conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )
}

export default Cadastrar;