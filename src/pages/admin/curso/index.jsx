import React, {useEffect, useState} from 'react';
import logo_2 from '../../../assests/img/logo_2.png';
import {url} from '../../../assests/constants';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import { Form, Container, Button, Card, Table } from 'react-bootstrap';
import './index.css';

//pure function Dicas
const Curso = () => {

    const [idCurso, setIdCurso] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [idInstituicao, setIdInstituicao] = useState(0);
    const [ cursos, setCursos] = useState([]);
    const [instituicao, setInstituicoes] = useState([]);
    
    useEffect(() => {
        listarCursos();
        listarInstituicao();
    }, [])

    const limparCampos = () => {
        setIdCurso(0);
        setIdInstituicao(0);
        setTitulo('');
    }
  
    const listarInstituicao = () => {
        fetch(url + '/instituicao')
            .then(response => response.json())
            .then(data => {
                setInstituicoes(data.data);
                console.log(data.data)
                limparCampo();
            })
            .catch(err => console.error(err));
    }

     const listarCursos = () => {
        fetch(url + '/curso')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampo();
            })
            .catch(err => console.error(err));
    }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setIdCurso(0);
            setTitulo('');
            setIdInstituicao(0);
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
                alert('Curso removido!')
                listarCursos()
            })
    }
    
     //Metodo para adicionar um curso
     const adicionar = (event) =>{
        event.preventDefault();

        const curso = {
            titulo : titulo,
            idInstituicao : idInstituicao
        }

        let method = (idCurso === 0 ? 'POST' : 'PUT');
        let urlRequest = (idCurso === 0 ? `${url}/Curso` :  `${url}/Curso/${idCurso}`);

         fetch(urlRequest ,{
             method : method,
             body : JSON.stringify(curso),
             headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
             }
         }) 
         .then(response => response.json())
         .then(dados => {
             alert('Curso cadastrado!');
 
             listarCursos();
         })

     }

    //Metodo para editar um curso
    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/curso/${event.target.value}`)
            .then(response => response.json())
            .then(dado => {
                console.log(dado)
                setIdCurso(dado.idCurso)
                setIdInstituicao(dado.idInstituicao)
                setTitulo(dado.titulo)
            })
    }

      return(        
      
      <div>
      <Menu />

      <Container fluid className='form-height'>
                <Form className='form-signin' >
                    <div className="text-center">
                        <img src={logo_2} alt="Edux" style={{width : "150px"}}/>

                    </div>
                    <br/>

                    <div className="text-center">
                        <h3>Consulte e Cadastre os Cursos</h3>
                    </div>
                    </Form>
       </Container>

      <Container style={{ marginTop: '3em' }}>
          <Card >
              <Card.Body>
                  <Form onSubmit={event => adicionar(event)}>
                      <Form.Group controlId="formBasicTitulo">
                          <Form.Label>Título</Form.Label>
                          <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Insira o título" />
                      </Form.Group>
                      <Form.Group controlId="formBasicInstituicao">
                          <Form.Label>Instituição</Form.Label>
                          <Form.Control as="select" size="sg" custom defaultValue={idInstituicao} onChange={event => setIdInstituicao(parseInt(event.target.value))}>
                              <option value="">Selecione uma instituição...</option>
                              {
                                  instituicao.map((item, index) => {
                                      return (
                                          <option key={index} value={item.idInstituicao}>{item.nome}</option>
                                      )
                                  })
                              }
                          </Form.Control>
                      </Form.Group>
                      <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                  </Form>
              </Card.Body>
          </Card>
          <Table style={{ background: '#FFFFFF', borderRadius: '10px', marginTop: '2em' }} striped hover>
              <thead>
                  <tr>
                      <th>Titulo</th>
                      <th>Instituição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      cursos.map((item, index) => {
                          return (
                              <tr key={index}>
                                    <td>{item.titulo}</td>
                                    <td>{item.idCurso}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button variant="dark" value={item.idCurso} onClick={event => editar(event)} >Editar</Button>
                                        <Button variant="danger" value={item.idCurso} onClick={event => remover(event)} style={{ marginLeft: '10px' }}>Excluir</Button>
                                    </td>
                              </tr>
                          )
                      })
                  }

              </tbody>
          </Table>
      </Container>
      <Rodape />
  </div>
  
  )
}

export default Curso;
