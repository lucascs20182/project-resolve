import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import style from './style';

//componente igual ao do react
export default function Detalhe() {
    const navigation = useNavigation();
    const route = useRoute();

    const desafio = route.params.desafio;
    const message = `Olá ${desafio.nome}, estou entrando em contato pois gostaria 
    de ajudar no desafio ${desafio.titulo}. "Segue a resposta: " `;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Resposta para o desafio: ${desafio.titulo}`,
            recipients: [desafio.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${desafio.whatsapp}&text=${message}`);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={[1]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={style.desafio}>
                        <Text style={[style.desafioProperty], {marginTop: 0}}>Aluno:</Text>
                        <Text style={style.desafioValue}>{desafio.nome} - {desafio.curso}
                        - {desafio.periodo}º período</Text>

                        <Text style={style.desafioProperty}>Título:</Text>    
                        <Text style={style.desafioValue}>{desafio.titulo}</Text>

                        <Text style={style.desafioProperty}>Descrição:</Text>    
                        <Text style={style.desafioValue}>{desafio.descricao}</Text>

                        <Text style={style.desafioProperty}>Prazo:</Text>
                        <Text style={style.desafioValue}>{desafio.prazo}</Text>
                    </View>
                )}
            />

            <View style={style.contactBox}>
                <Text style={style.resolveTitle}>Salve o dia!</Text>
                <Text style={style.resolveTitle}>Resolva esse desafio.</Text>

                <Text style={style.resolveDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                    <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}