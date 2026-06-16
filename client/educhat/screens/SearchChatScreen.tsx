import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { ChatListItem, assignOrUnassignStudent } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'

type SearchChatScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchChat'>

export default function SearchChatScreen({ navigation, route }: SearchChatScreenProps) {
    const { token } = route.params
    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [foundChat, setFoundChat] = useState<ChatListItem | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSearch = async () => {
        if (!subject.trim() && !teacher.trim()) {
            setError('Preencha pelo menos um campo de busca.')
            return
        }
        try {
            setLoading(true)
            setError('')
            setFoundChat(null)
            const res = await import('../services/rest').then(m => m.listAuthenticatedUserChats(token))
            const found = res.content.find(c =>
                (!subject.trim() || c.subject.toLowerCase().includes(subject.toLowerCase())) &&
                (!teacher.trim() || (c.teacherName && c.teacherName.toLowerCase().includes(teacher.toLowerCase())))
            )
            if (found) {
                setFoundChat(found)
            } else {
                setError('Chat não encontrado.')
            }
        } catch (err) {
            setError('Erro ao buscar chat.')
        } finally {
            setLoading(false)
        }
    }

    const handleJoinChat = async () => {
        if (!foundChat) return
        try {
            setLoading(true)
            await assignOrUnassignStudent(foundChat.id, 0, token)
            navigation.navigate('Chat', { chatId: foundChat.id, token })
        } catch (err) {
            setError('Não foi possível ingressar no chat.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Buscar Chat</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>
                        Encontre um chat existente para ingressar
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            placeholder='Nome da matéria'
                            placeholderTextColor={colors.muted}
                            value={subject}
                            onChangeText={setSubject}
                            style={[commonStyles.input, focusedField === 'subject' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Professor</Text>
                        <TextInput
                            placeholder='Nome do professor'
                            placeholderTextColor={colors.muted}
                            value={teacher}
                            onChangeText={setTeacher}
                            style={[commonStyles.input, focusedField === 'teacher' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('teacher')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    {foundChat ? (
                        <View style={styles.resultCard}>
                            <Text style={styles.resultSubject}>{foundChat.subject}</Text>
                            <Text style={commonStyles.mutedText}>Professor ID: {foundChat.teacherId}</Text>
                            <TouchableOpacity
                                onPress={handleJoinChat}
                                disabled={loading}
                                style={[commonStyles.primaryButton, { marginTop: 12 }]}
                            >
                                <Text style={commonStyles.primaryButtonText}>
                                    {loading ? 'Ingressando...' : 'Ingressar em Chat'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handleSearch}
                            disabled={loading}
                            style={commonStyles.primaryButton}
                        >
                            <Text style={commonStyles.primaryButtonText}>
                                {loading ? 'Buscando...' : 'Buscar Chat'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <Text style={[commonStyles.mutedText, { textAlign: 'center' }]}>Voltar ao Painel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 24,
        alignSelf: 'center',
        ...commonStyles.card,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 6,
    },
    resultCard: {
        backgroundColor: colors.surfaceSoft,
        borderRadius: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.line,
        marginBottom: 16,
    },
    resultSubject: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    backBtn: {
        marginTop: 16,
    },
})