import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles, shadows } from '../styles/theme'
import useMenuViewModel from '../viewmodels/useMenuViewModel'

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>

export default function MenuScreen({ navigation, route }: MenuScreenProps) {
    const { token } = route.params
    const vm = useMenuViewModel(token)

    return (
        <View style={commonStyles.screen}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Meus Chats</Text>
                        {vm.user && (
                            <Text style={commonStyles.mutedText}>
                                {vm.isTeacher ? 'Professor(a)' : 'Aluno(a)'} — {vm.user.name}
                            </Text>
                        )}
                    </View>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { token })}
                            style={styles.headerBtn}
                        >
                            <Text style={styles.headerBtnText}>Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Info')}
                            style={styles.headerBtn}
                        >
                            <Text style={styles.headerBtnText}>Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {vm.user?.role === 'student' && (
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreText}>Pontuação: {vm.score}</Text>
                    </View>
                )}
            </View>

            <View style={styles.actionBar}>
                <TouchableOpacity
                    onPress={() => {
                        if (vm.isTeacher) {
                            navigation.navigate('NewChat', { token })
                        } else {
                            navigation.navigate('SearchChat', { token })
                        }
                    }}
                    style={commonStyles.primaryButton}
                >
                    <Text style={commonStyles.primaryButtonText}>
                        {vm.isTeacher ? 'Criar novo Chat' : 'Adicionar Chat'}
                    </Text>
                </TouchableOpacity>
            </View>

            {vm.loading ? <Text style={styles.centered}>Carregando...</Text> : null}
            {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

            <FlatList
                style={styles.list}
                data={vm.chats}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chat', { chatId: item.id, token })}
                        style={styles.chatCard}
                    >
                        <Text style={styles.chatSubject}>{item.subject}</Text>
                        <Text style={commonStyles.mutedText}>Professor ID: {item.teacherId}</Text>
                        <Text style={styles.chatDate}>Criado em: {item.createdAt}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    !vm.loading ? (
                        <Text style={styles.emptyText}>Nenhum chat encontrado.</Text>
                    ) : null
                }
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    greeting: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '800',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    headerBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.line,
    },
    headerBtnText: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 12,
    },
    scoreCard: {
        marginTop: 10,
        backgroundColor: colors.surfaceSoft,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '800',
    },
    actionBar: {
        paddingHorizontal: 20,
        marginBottom: 12,
        marginTop: 4,
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    chatCard: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    chatSubject: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4,
    },
    chatDate: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    centered: {
        textAlign: 'center',
        color: colors.muted,
        padding: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: colors.muted,
        fontSize: 14,
        marginTop: 24,
    },
})