import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; //feather icons

import api from '../../services/api';

import './style.css';

import tutorsImg from '../../assets/tutors.png'

import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });

            //console.log(res.data.nome);
            localStorage.setItem('alunoId', id);
            localStorage.setItem('alunoNome', res.data.nome);

            history.push('/profile');
        } catch(err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Resolve"/>                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={ tutorsImg } alt="Tutors"/>
        </div>
    );
}

//Link to em vez de <a href> para não recarregar a página/react todo de novo