import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { createChat } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'

type NewChatScreenProps = NativeStackScreenProps<RootStackParamList, 'NewChat'>

export default function NewChatScreen({ navigation, route }: NewChatScreenProps) {
    const { token } = route.params
    const [subject, setSubject] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focused, setFocused] = useState(false)

    const handleCreate = async () => {
        if (subject.length < 3 || subject.length > 120) {
            setError('Nome da matéria deve ter entre 3 e 120 caracteres.')
            return
        }
        try {
            setLoading(true)
            setError('')
            const newChat = await createChat(subject, token)
            navigation.navigate('Chat', { chatId: newChat.id, token })
        } catch (err: any) {
            setError('Não foi possível criar o chat.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Novo Chat</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>
                        Crie um novo chat de estudo
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Nome da Matéria</Text>
                        <TextInput
                            placeholder='Ex: Matemática, Física...'
                            placeholderTextColor={colors.muted}
                            value={subject}
                            onChangeText={setSubject}
                            style={[commonStyles.input, focused && commonStyles.focusedInput]}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 3, máximo 120 caracteres</Text>
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleCreate}
                        disabled={loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {loading ? 'Criando...' : 'Criar Chat'}
                        </Text>
                    </TouchableOpacity>

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
    backBtn: {
        marginTop: 16,
    },
})