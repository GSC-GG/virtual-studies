import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { listAllStudents, assignOrUnassignStudent, listAuthenticatedUserChats } from '../services/rest'
import { colors, commonStyles, shadows } from '../styles/theme'

type AddParticipantScreenProps = NativeStackScreenProps<RootStackParamList, 'AddParticipant'>

export default function AddParticipantScreen({ navigation, route }: AddParticipantScreenProps) {
    const { chatId, token } = route.params
    const [search, setSearch] = useState('')
    const [students, setStudents] = useState<any[]>([])
    const [chatStudents, setChatStudents] = useState<Set<number>>(new Set())
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState<number | null>(null)
    const [error, setError] = useState('')
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const [allStudentsRes] = await Promise.all([
                    listAllStudents(token),
                ])

                const allStudents = allStudentsRes.content || []
                setStudents(allStudents)
            } catch (err) {
                setError('Erro ao carregar estudantes.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const handleAddStudent = async (studentId: number) => {
        try {
            setAdding(studentId)
            setError('')
            await assignOrUnassignStudent(chatId, studentId, token)

            setChatStudents(prev => {
                const next = new Set(prev)
                if (next.has(studentId)) {
                    next.delete(studentId)
                } else {
                    next.add(studentId)
                }
                return next
            })
        } catch (err: any) {
            setError('Erro ao adicionar estudante.')
        } finally {
            setAdding(null)
        }
    }

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Adicionar Participante</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
                        Busque estudantes por nome ou email
                    </Text>

                    <View style={styles.field}>
                        <TextInput
                            placeholder='Buscar estudante...'
                            placeholderTextColor={colors.muted}
                            value={search}
                            onChangeText={setSearch}
                            style={[commonStyles.input, focused && commonStyles.focusedInput]}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    {loading ? (
                        <Text style={[commonStyles.mutedText, { textAlign: 'center', padding: 20 }]}>Carregando...</Text>
                    ) : (
                        <FlatList
                            data={filteredStudents}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isAdded = chatStudents.has(item.id)
                                return (
                                    <View style={styles.studentRow}>
                                        <View style={styles.studentInfo}>
                                            <Text style={styles.studentName}>{item.name}</Text>
                                            <Text style={commonStyles.mutedText}>{item.email}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => handleAddStudent(item.id)}
                                            disabled={adding === item.id}
                                            style={[styles.addBtn, isAdded && styles.addedBtn]}
                                        >
                                            <Text style={[styles.addBtnText, isAdded && styles.addedBtnText]}>
                                                {adding === item.id ? '...' : isAdded ? 'Adicionado' : 'Adicionar'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            ListEmptyComponent={
                                <Text style={[commonStyles.mutedText, { textAlign: 'center', padding: 20 }]}>
                                    {search ? 'Nenhum estudante encontrado.' : 'Nenhum estudante disponível.'}
                                </Text>
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[commonStyles.secondaryButton, { marginTop: 16 }]}
                    >
                        <Text style={commonStyles.secondaryButtonText}>Concluído</Text>
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
    studentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 8,
        backgroundColor: colors.surfaceSoft,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.line,
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },
    addBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: colors.primary,
    },
    addedBtn: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
    },
    addBtnText: {
        color: colors.surface,
        fontSize: 13,
        fontWeight: '700',
    },
    addedBtnText: {
        color: colors.muted,
    },
})