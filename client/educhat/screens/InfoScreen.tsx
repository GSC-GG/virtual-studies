import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import { colors, commonStyles, shadows } from '../styles/theme'
import React from 'react'

type InfoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Info'>

export default function InfoScreen() {
    const navigation = useNavigation<InfoNavigationProp>()

    return (
        <ScrollView style={commonStyles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>EduChat</Text>
                <Text style={commonStyles.mutedText}>
                    Instituto Federal de São Paulo – Campus Guarulhos
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sobre o Projeto</Text>
                    <Text style={styles.cardText}>
                        O EduChat é uma plataforma de estudo colaborativo que conecta professores e alunos
                        por meio de chats em tempo real. A plataforma permite compartilhar materiais,
                        agendar reuniões, criar exercícios e promover a interação entre os participantes
                        de forma gamificada.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Objetivos</Text>
                    <Text style={styles.cardText}>
                        • Facilitar a comunicação entre professores e alunos{'\n'}
                        • Promover o aprendizado colaborativo em tempo real{'\n'}
                        • Organizar materiais e exercícios por matéria{'\n'}
                        • Agendar sessões de dúvidas ao vivo{'\n'}
                        • Incentivar a participação com gamificação e pontuação
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Contato</Text>
                    <Text style={styles.cardText}>
                        Email: educhat@ifsp.edu.br
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Termos e Responsabilidade</Text>
                    <Text style={styles.cardText}>
                        Ao utilizar o EduChat, o usuário concorda em utilizar a plataforma de forma
                        respeitosa e responsável. Conteúdos inadequados, assédio ou qualquer forma de
                        violação dos termos de uso resultará em remoção da plataforma. O Instituto
                        Federal de São Paulo não se responsabiliza por conteúdos compartilhados
                        entre os usuários, sendo estes responsáveis pelas informações que publicam.
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.secondaryButton}
                >
                    <Text style={commonStyles.secondaryButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 24,
        alignItems: 'center',
        maxWidth: 700,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        color: colors.primary,
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 4,
    },
    card: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 8,
    },
    cardText: {
        color: colors.muted,
        fontSize: 14,
        lineHeight: 22,
    },
})