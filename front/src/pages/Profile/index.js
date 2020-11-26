import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [desafios, setDesafios] = useState([]); //começa como array vazio

    const alunoId = localStorage.getItem('alunoId');
    const alunoNome = localStorage.getItem('alunoNome');

    const history = useHistory();

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: alunoId
            }
        }).then(res => {
            setDesafios(res.data);
        })
    }, [alunoId]);

    async function handleDeleteDesafio(id) {
        try {
            await api.delete(`desafios/${id}`, {
            headers: {
                Authorization: alunoId
            }
            });

            setDesafios(desafios.filter(desafio => desafio.id !== id));
        } catch {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }
    
    return(
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Resolve"/>
                <span>Bem-vindo, {alunoNome}</span>  

                <Link className="button" to="/challenges/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Desafios cadastrados</h1>

            <ul>
                {desafios.map(desafio => (
                    <li key={desafio.id}>
                    <strong>DESAFIO:</strong>
                    <p>{desafio.titulo}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{desafio.descricao}</p>

                    <strong>PRAZO:</strong>
                    <p>{desafio.prazo}</p>
                    
                    <button onClick={() => handleDeleteDesafio(desafio.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}