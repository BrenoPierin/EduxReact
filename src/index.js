import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jsonwebtoken from "jsonwebtoken";
import {Route, Link, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import Dicas from './pages/dicas';
import Home from './pages/home';
import Curso from './pages/admin/curso';
import Turma from './pages/admin/turma';
import CursoList from './pages/curso';
import TurmaList from './pages/turma';
import FeedAluno from './pages/feedaluno';
import FeedProf from './pages/feedprof';
import Dicascadastrar from './pages/admin/dicascadastrar';
import Instituicaocadastrar from './pages/admin/instituicaocadastrar';
import Instituicao from './pages/instituicao';
import RecuperarSenha from './pages/recuperarsenha';
import InicioAluno from './pages/inicioaluno';
import 'bootstrap/dist/css/bootstrap.min.css';



//Defina as rotas privadas
const PrivateRoute = ({component : Component}) => (
    <Route
        render={props =>
        localStorage.getItem("usuario") !== null  && jsonwebtoken.decode(localStorage.getItem("usuario")).Permissao === "Administrador"? (
            <Component {...props}/> 
        ) : (
                <Redirect 
                to={{pathname : "/login"}}
                />
            )
        }
    />    
)


//Define as rotas da aplicação

const Routing = (
    <BrowserRouter>
        <div >
            <Switch >
                <Route exact path = '/' component = { Home }/>
                <Route path = '/login' component = { Login }/> 
                <Route path = '/cadastrar' component = { Cadastrar }/>
                <Route path = '/dicas' component = { Dicas }/>
                <PrivateRoute path = '/admin/dicascadastrar' component = { Dicascadastrar }/> 
                <PrivateRoute path = '/admin/curso' component = { Curso }/> 
                <Route path = '/curso' component = { CursoList }/> 
                <PrivateRoute path = '/admin/turma' component = { Turma }/> 
                <Route path = '/turma' component = { TurmaList }/> 
                <Route path = '/feedaluno' component = { FeedAluno }/> 
                <PrivateRoute path = '/feedprof' component = { FeedProf }/> 
                <PrivateRoute path = '/admin/instituicao' component = { Instituicaocadastrar }/> 
                <Route path = '/instituicao' component = { Instituicao }/>
                <Route path = '/recuperarsenha' component = {RecuperarSenha}/>
                <Route path = '/inicioaluno' component = {InicioAluno}/>
            </Switch > 
        </div> 
    </BrowserRouter>
)

ReactDOM.render(
    Routing,
    document.getElementById('root')
);