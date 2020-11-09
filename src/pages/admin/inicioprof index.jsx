import React from 'react';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import {Carousel, Jumbotron, Button, Card, Col, Row, Container} from 'react-bootstrap';


const InicioProf = () =>{

    return(

        <div className='ajustecor' style={{ backgroundColor : '#4e0d21' }}> 
            <Menu />
            <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100" style={{opacity : '60%'}}
                src="https://www.edools.com/wp-content/uploads/2016/07/professor-EAD.png"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Bem vindo, professor!</h3>
                <p>Use essa página para acessar o seu gerenciamento.</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
                <Container className='ajustar' style={{ marginTop : '90px' }}>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.2em1consultoria.com.br/wp-content/uploads/2020/04/download.jpg" />
                            <Card.Body>
                                <Card.Title>Ir para dicas</Card.Title>
                                <Card.Text>
                                Cadastre uma dica para seus alunos
                                </Card.Text>
                                <Button variant="primary" href='/dicasprof'>Vamos!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://abmes.org.br/arquivos/noticias/insights08042020.png" />
                            <Card.Body>
                                <Card.Title>Ir para cursos</Card.Title>
                                <Card.Text>
                                Cadastre um curso para os alunos.
                                </Card.Text>
                                <Button variant="primary" href='/cursoprof'>Vamos!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.cobranews.com.br/wp-content/uploads/2020/04/escola-1024x576.jpg" />
                            <Card.Body>
                                <Card.Title>Ir para instituições</Card.Title>
                                <Card.Text>
                                Cadastre um aluno em uma instituição.
                                </Card.Text>
                                <Button variant="primary" href='/instituicoesprof'>Vamos!</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Rodape />
        </div>

    )

}

export default InicioProf;
