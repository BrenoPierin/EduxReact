import React, {useEffect, useState} from 'react';
import logo_2 from '../../assests/img/logo_2.png';
import {url} from '../../assests/constants';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Form, Container, Button, Card, Table } from 'react-bootstrap';

const TurmaList = () => {

    const [idTurma, setIdTurma] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idCurso, setIdcurso] = useState('');
    const [cursos, setCursos] = useState([]);
    const [turma, setTurma] = useState([]);
    
    useEffect(() => {
        listarTurma();
        listarCurso()
    }, [])
  
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
     
     //Metodo para limpar o campo do formulario após o professor ter salvo um curso
     const limparCampo = () =>{
            setIdTurma(0);
            setDescricao('');
            setIdcurso('');
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

        <Container>
                <Card>
                    <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>                              
                                <th>Descricao</th>                                
                                <th>Curso</th>                                
                                <th>Legenda</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turma.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.descricao}</td>
                                        <td>{item.idCurso}</td>
                                
                                        <td>{item.cursos =  cursos.map((item, index) => {
                                        return (
                                            <option key={index} value={item.idCurso}>{item.idCurso} - {item.titulo}</option>
                                        )
                                        })}</td>
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

export default TurmaList ;