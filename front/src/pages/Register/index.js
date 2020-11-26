import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [curso, setCurso] = useState('');
    const [periodo, setPeriodo] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome, email, whatsapp, curso, periodo
        }

        try {
            const res = await api.post('alunos', data);

            alert(`Seu ID de acesso: ${res.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Resolve"/>   

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e peça 
                        ajuda às pessoas para resolver exercícios da sua escola.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já tenho cadastro
                    </Link>    
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome do aluno" value={nome} onChange={e => setNome(e.target.value)}/>
                    <input type="email" placeholder="E-mail"  value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"  value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Curso"  value={curso} onChange={e => setCurso(e.target.value)}/>
                        <input placeholder="Período"  style={{ width: 120 }}
                         value={periodo} onChange={e => setPeriodo(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}