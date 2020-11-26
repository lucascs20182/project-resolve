import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import style from './style';

//componente igual ao do react
export default function Desafios() {
    const [desafios, setDesafios] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    function navigateToDetail(desafio) {
        navigation.navigate('detalhe', { desafio });
    }

    async function loadDesafios() {
        if(loading) {
            return;
        }

        if(total > 0 && desafios.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('desafios', {
            params: { page }
        });

        setDesafios([ ... desafios, ... response.data]); //anexar 2 vetores
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadDesafios();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} desafios</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos desafios abaixo e salve o dia.</Text>

            <FlatList //para o scroll
                data={desafios}
                style={style.desafioList}
                keyExtractor={desafio => String(desafio)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadDesafios}
                onEndReachedThreshold={0.2}
                renderItem={({ item: desafio}) => ( //função com () e não {}: retorna código jfx
                    <View style={style.desafio}>
                        <Text style={style.desafioProperty}>Aluno:</Text>
                        <Text style={style.desafioValue}>{desafio.nome}</Text>

                        <Text style={style.desafioProperty}>Desafio:</Text>
                        <Text style={style.desafioValue}>{desafio.titulo}</Text>

                        <Text style={style.desafioProperty}>Prazo:</Text>
                        <Text style={style.desafioValue}>{desafio.prazo}</Text>

                        <TouchableOpacity 
                            style={style.detailsButton} 
                            onPress={() => navigateToDetail(desafio)}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>

                        </TouchableOpacity>
                </View>
                )} 
            />
        </View>
    );
}