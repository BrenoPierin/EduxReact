import React, { useEffect } from 'react';
import logo_2 from '../../assests/img/logo_2.png';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Container, Button, Card, Row, Col } from 'react-bootstrap';
import './index.css';
import {url} from '../../assests/constants'


const FeedProf = ({titulo, foto}) => {

    const [idObjetivo, setIdObjetivo] = useEffect(0)
    const [urlImagem, setUrlImagem] = useEffect('');
    const [objetivo, setObjetivo] = useEffect([]);

    useEffect(() => {
        listar()
    }, []);

        const listar = () => {
            fetch(url + '/objetivo')
                .then(response => response.json())
                .then(data => {
                    setObjetivo(data.data);
                    limparCampos();
                })
                .catch(err => console.error(err));
        }

        const editar = (event) => {
            event.preventDefault();

            fetch(`${url}/objetivo/${event.target.value}`)
                .then(response => response.json())
                .then(dado => {
                    console.log(dado)
                    setIdObjetivo(dado.idObjetivo)
                    setUrlImagem(dado.urlImagem)
                })
        }

        const excluir = (event) => {
            event.preventDefault();

            console.log(event.target.value)

            fetch(url + '/objetivo/' + event.target.value, {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token-edux')
                }
            })
                .then(response => response.json())
                .then(dados => {
                    alert('Objetivo removido!')
                    listar()
                })
        }

        const uploadFile = (event) => {
            event.preventDefault();

            let formdata = new FormData();

            formdata.append('arquivo', event.target.files[0]);

            fetch(`${url}/upload`, {
                method: 'POST',
                body: formdata
            })
                .then(response => response.json())
                .then(data => {
                    setUrlImagem(data.url);
                })
                .catch(err => console.error(err))
        }

        const salvar = (event) => {
            event.preventDefault();

            const objetivocadastrar = {
                urlImagem: urlImagem
            }

            let method = (idObjetivo === 0 ? 'POST' : 'PUT')
            let urlRequest = (idObjetivo === 0 ? `${url}/objetivo` : `${url}/objetivo/${idObjetivo}`)

            fetch(urlRequest, {
                method: method,
                body: JSON.stringify(idObjetivo),
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token-edux')
                }
            })
                .then(response => response.json())
                .then(dados => {
                    alert('Objetivo Salvo!');
                    listar();
            })
        }

        const limparCampos = () => {
            setIdObjetivo(0);
            setUrlImagem('');
        }
    return(

        <div>
            <Menu />
            <br/>
            <Container fluid className='form-height'>
                <Form className='form-signin' >
                    <div className="text-center">
                        <img src={logo_2} alt="Edux" style={{width : "150px"}}/>

                    </div>
                    <br/>

                    <div className="text-center">
                        <h3>"Grande professor, será aquele que realiza o que ensina!"</h3>
                    </div>
                    </Form>
            </Container>
            <br/>
            
            <Container>
            <Row className="text-center">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.lg.com.br/blog/wp-content/uploads/2019/11/tecnologia-e-ser-humano.png" />
                        <Card.Body>
                            <Card.Title> 1° ano A </Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                        <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.economiasc.com/wp-content/uploads/2020/04/esta-correta.jpg" />
                        <Card.Body>
                            <Card.Title>2° ano A</Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                        <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://d3q93wnyp4lkf8.cloudfront.net/revista/post_images/19580/2ae2c2aaa3c9b3912769332306c5a292f4817b1a.jpg?1559248176" />
                        <Card.Body>
                            <Card.Title>3° ano A</Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                            <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                
               

                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://d3q93wnyp4lkf8.cloudfront.net/revista/post_images/19580/2ae2c2aaa3c9b3912769332306c5a292f4817b1a.jpg?1559248176" />
                        <Card.Body>
                            <Card.Title>1° ano B</Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                            <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://d3q93wnyp4lkf8.cloudfront.net/revista/post_images/19580/2ae2c2aaa3c9b3912769332306c5a292f4817b1a.jpg?1559248176" />
                        <Card.Body>
                            <Card.Title>2° ano B</Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                            <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://d3q93wnyp4lkf8.cloudfront.net/revista/post_images/19580/2ae2c2aaa3c9b3912769332306c5a292f4817b1a.jpg?1559248176" />
                        <Card.Body>
                            <Card.Title>3° ano B</Card.Title>
                            <Button variant="primary">Anexar atividade para turma! :) <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
</svg>
                            <Form.File id="fileobjetivoaluno" label="imagem da atividade" onChange={event =>{uploadFile(event)}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>
            </Container>
    <br/><br/>

            
            <Rodape />
        </div>
    )
}

export default FeedProf;