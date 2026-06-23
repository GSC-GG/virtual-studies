import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles, shadows } from '../styles/theme'
import useProfileViewModel from '../viewmodels/useProfileViewModel'

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation, route }: ProfileScreenProps) {
    const { token } = route.params
    const vm = useProfileViewModel(token)

    if (vm.loading) {
        return (
            <View style={[commonStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={commonStyles.mutedText}>Carregando...</Text>
            </View>
        )
    }

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <Text style={styles.title}>Meu Perfil</Text>

                {vm.user ? (
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <Text style={styles.profileName}>{vm.user.name}</Text>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleBadgeText}>
                                    {vm.user.role === 'teacher' ? 'Professor' : 'Aluno'}
                                </Text>
                            </View>
                        </View>
                        <Text style={commonStyles.mutedText}>{vm.user.email}</Text>
                        {vm.user.role === 'student' && (
                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreText}>Pontuação: {vm.score}</Text>
                            </View>
                        )}
                    </View>
                ) : null}

                <Text style={styles.sectionTitle}>Meus Chats</Text>
                <FlatList
                    data={vm.chats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat', { chatId: item.id, token })}
                            style={styles.chatCard}
                        >
                            <Text style={styles.chatSubject}>{item.subject}</Text>
                            {vm.user?.role === 'student' && (
                                <TouchableOpacity
                                    onPress={() => vm.handleLeaveChat(item.id)}
                                    style={styles.leaveBtn}
                                >
                                    <Text style={styles.leaveBtnText}>Sair do Chat</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={[commonStyles.mutedText, { textAlign: 'center', marginTop: 16 }]}>
                            Nenhum chat encontrado.
                        </Text>
                    }
                    showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu', { token })}
                    style={[commonStyles.secondaryButton, { marginTop: 16 }]}
                >
                    <Text style={commonStyles.secondaryButtonText}>Voltar ao Painel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 16,
    },
    profileCard: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        flex: 1,
    },
    roleBadge: {
        backgroundColor: colors.surfaceSoft,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.line,
    },
    roleBadgeText: {
        fontSize: 11,
        color: colors.primary,
        fontWeight: '700',
    },
    scoreRow: {
        marginTop: 8,
    },
    scoreText: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '800',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 10,
    },
    chatCard: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    chatSubject: {
        fontWeight: '700',
        fontSize: 15,
        color: colors.text,
    },
    leaveBtn: {
        marginTop: 8,
    },
    leaveBtnText: {
        color: colors.danger,
        fontSize: 13,
        fontWeight: '700',
    },
})