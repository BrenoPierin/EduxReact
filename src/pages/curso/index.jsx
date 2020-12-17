import React, {useEffect, useState} from 'react';
import logo_2 from '../../assests/img/logo_2.png';
import {url} from '../../assests/constants';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Container, Button, Card, Table } from 'react-bootstrap';

const CursoList = () => {

    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [idInstituicao, setIdInstituicao] = useState('');
    const [cursos, setCurso] = useState([]);
    const [instituicao, setInstituicao] = useState([]);
    
    useEffect(() => {
        listarCurso();
        listarInstituicao();
    }, [])
  
    const listarInstituicao = () => {
        fetch(`${url}/Instituicao`, {
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }

        })
        .then(response => response.json())
        .then(data => {
            setInstituicao(data.data);

        
        })
    }
     const listarCurso = () =>{
        fetch(`${url}/Curso`)
        .then(response => response.json())
        .then(data => {
            setCurso(data.data);
            
            limparCampo();
        })
        .catch(err => console.error(err));
     }
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setId(0);
            setTitulo('');
            setIdInstituicao('');
     }
     
     //Metodo para adicionar um curso
 
     return(<div>
            
        <Menu />

        <Container fluid className='form-height'>
                <Form className='form-signin' >
                    <div className="text-center">
                        <img src={logo_2} alt="Edux" style={{width : "150px"}}/>

                    </div>
                    <br/>

                    <div className="text-center">
                        <h3>Consulte os Cursos</h3>
                    </div>
                    </Form>
        </Container>

        <Container>
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>                              
                                <th>Titulo</th>                                
                                <th>Instituição</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.titulo}</td>
                                        <td>{item.idInstituicao =  instituicao.map((item, index) => {
                                        return (
                                            <option key={index} value={item.idInstituicao}>{item.nome}</option>
                                        )
                                    })}</td>
                                    </tr>
                                )
                                id.map((item, index) => {
                                    return (
                                        <tr key={index}>
    
                                            <td>{item.titulo}</td>
                                            <td>{item.idInstituicao =  instituicao.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idInstituicao}>{item.nome}</option>
                                            )
                                        })}</td>
                                        </tr>
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

export default CursoList ;