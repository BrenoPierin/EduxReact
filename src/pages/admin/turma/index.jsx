import React, {useEffect, useState} from 'react';
import logo_2 from '../../../assests/img/logo_2.png';
import {url} from '../../../assests/constants';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import { Form, Container, Button, Card, Table } from 'react-bootstrap';

//pure function Dicas
const Turma = () => {

    const [idTurma, setIdTurma] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idCurso, setIdcurso] = useState(0);
    const [cursos, setCursos] = useState([]);
    const [turma, setTurma] = useState([]);
    
    useEffect(() => {
        listarCurso();
        listarTurma();
    }, [])
  
    const listarCurso = () => {
        fetch(url + '/curso')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampo();
                console.log(data.data);
            })
            .catch(err => console.error(err));
    }
    const listarTurma = () =>{
        fetch(`${url}/Turma`)
        .then(response => response.json())
        .then(data => {
            setTurma(data.data);            
            limparCampo();
            console.log(data.data);
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setIdcurso(0);
            setDescricao('');
            setIdcurso(0);
     }
     
     //Metodo para excluir um curso
     const remover = (event) => {
        event.preventDefault();

        console.log(event.target.value)

        fetch(url + '/curso/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Turma removida!')
                listarCurso()
            })
     }
    
     //Metodo para adicionar um curso
     const adicionar = (event) =>{
        event.preventDefault();

        const turma = {
            id : idTurma,
            descricao : descricao,
            idCurso : idCurso
        }

        let method = (idTurma === 0 ? 'POST' : 'PUT');
        let urlRequest = (idTurma === 0 ? `${url}/Turma` :  `${url}/Turma/${idTurma}`);

         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(turma),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Turma cadastrada!');
 
             listarTurma();
         })

     }
     //Metodo para editar um curso
     const editar = (event) =>{
         event.preventDefault();

         fetch(url + '/Curso/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setIdTurma(dado.idTurma);
            setDescricao(dado.descricao);
            setCursos(dado.cursos);
        })
    }
     
      return(<div>
            
        <Menu />

        <Container fluid className='form-height'>
                <Form className='form-signin' >
                    <div className="text-center">
                        <img src={logo_2} alt="Edux" style={{width : "150px"}}/>

                    </div>
                    <br/>

                    <div className="text-center">
                        <h3>Consulte as Turmas</h3>
                    </div>
                    </Form>
        </Container>

            <Container style={{ marginTop: '3em' }}>
            <Card >
                <Card.Body>
                    <Form onSubmit={event => adicionar(event)}>
                        <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Insira a descrição e periodo" />
                        </Form.Group>
                        <Form.Group controlId="formBasicInstituicao">
                            <Form.Label>Curso</Form.Label>
                            <Form.Control as="select" size="sg" custom defaultValue={idCurso} onChange={event => setIdcurso(event.target.value)}>
                                <option value="">Selecione um Curso...</option>
                                {
                                    cursos.map((item, index) => {
                                        return (
                                            <option key={index} value={item.idCurso}>{item.titulo}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                    </Form>
                </Card.Body>
            </Card>
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>                              
                                <th>Descrição</th>                                
                                <th>id Curso</th>                                
                                <th>Ações</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turma.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.descricao}</td>
                                        <td>{item.idCurso}</td>
                                        <td style={{ display: 'flex' }}>
                                            <Button variant="dark" value={item.idTurma} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.idTurma} onClick={event => remover(event)} style={{ marginLeft: '10px' }}>Excluir</Button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                    </Table>
                    </Card.Body>
                </Card>
        </Container>
       

        <Rodape />
    </div>)

}

export default Turma;
