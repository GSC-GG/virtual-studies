import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { getMe, getScore, listAuthenticatedUserChats, ChatListItem } from '../services/rest'
import { UserInfo } from '../types/UserInfo'
import { colors, commonStyles, shadows } from '../styles/theme'

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation, route }: ProfileScreenProps) {
    const { token } = route.params
    const [user, setUser] = useState<UserInfo | null>(null)
    const [score, setScore] = useState<number>(0)
    const [chats, setChats] = useState<ChatListItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const userData = await getMe(token)
                setUser(userData)
                if (userData.role === 'student') {
                    const s = await getScore(token)
                    setScore(s)
                }
                const chatRes = await listAuthenticatedUserChats(token)
                setChats(chatRes.content)
            } catch (err) {
                console.log('Erro ao carregar perfil')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    if (loading) {
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

                {user ? (
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <Text style={styles.profileName}>{user.name}</Text>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleBadgeText}>
                                    {user.role === 'teacher' ? 'Professor' : 'Aluno'}
                                </Text>
                            </View>
                        </View>
                        <Text style={commonStyles.mutedText}>{user.email}</Text>
                        {user.role === 'student' && (
                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreText}>Pontuação: {score}</Text>
                            </View>
                        )}
                    </View>
                ) : null}

                <Text style={styles.sectionTitle}>Meus Chats</Text>
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat', { chatId: item.id, token })}
                            style={styles.chatCard}
                        >
                            <Text style={styles.chatSubject}>{item.subject}</Text>
                            {user?.role === 'student' && (
                                <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            const { assignOrUnassignStudent } = await import('../services/rest')
                                            await assignOrUnassignStudent(item.id, 0, token)
                                            setChats(chats.filter(c => c.id !== item.id))
                                        } catch (err) {
                                            console.log('Erro ao sair do chat')
                                        }
                                    }}
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