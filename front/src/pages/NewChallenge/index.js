import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg'

export default function NewChallenge() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState('');

    const history = useHistory();

    const alunoId = localStorage.getItem('alunoId');

    async function handleNewChallenge(e) {
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            prazo
        };

        try {
            await api.post('desafios', data, {
                headers: {
                    Authorization: alunoId
                }
            })

            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="new-challenge-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Resolve"/>   

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva a atividade detalhadamente para encontrar 
                        um tutor que irá resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>    
                </section>

                <form onSubmit={handleNewChallenge}>
                    <input 
                        placeholder="Título do desafio"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input 
                        placeholder="Prazo"
                        value={prazo}
                        onChange={e => setPrazo(e.target.value)}
                    />
                    

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}