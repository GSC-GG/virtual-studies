import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import { authenticate } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'
import { StyleSheet } from 'react-native'

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginNavigationProp>()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handlePress = async () => {
        try {
            setLoading(true)
            setError('')
            const token = await authenticate(username, password)
            navigation.navigate('Menu', { token })
        } catch (err: any) {
            if (err.response?.status === 401) {
                if (err.response?.data?.message?.includes('sen')) {
                    setError('Senha incorreta para este usuário.')
                } else {
                    setError('Email não cadastrado.')
                }
            } else {
                setError('Não foi possível fazer login.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.authContent}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Faça login</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>Bem-vindo de volta!</Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder='seu@email.com'
                            placeholderTextColor={colors.muted}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            style={[commonStyles.input, focusedField === 'email' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            placeholderTextColor={colors.muted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={[commonStyles.input, focusedField === 'password' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handlePress}
                        disabled={loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                        style={styles.linkButton}
                    >
                        <Text style={commonStyles.mutedText}>
                            Não tem uma conta?{' '}
                            <Text style={{ color: colors.primary, fontWeight: '700' }}>Cadastre-se aqui</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 24,
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
    linkButton: {
        marginTop: 16,
        alignItems: 'center',
    },
})