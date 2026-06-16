import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import { registerUser } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'
import { StyleSheet } from 'react-native'

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
    const navigation = useNavigation<RegisterNavigationProp>()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'student' | 'teacher'>('student')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleRegister = async () => {
        if (name.length < 2 || name.length > 100) {
            setError('Nome deve ter entre 2 e 100 caracteres.')
            return
        }
        if (!email.includes('@')) {
            setError('Email inválido.')
            return
        }
        if (password.length < 8) {
            setError('Senha deve ter no mínimo 8 caracteres.')
            return
        }

        try {
            setLoading(true)
            setError('')
            await registerUser(name, email, password, role)
            navigation.navigate('Login')
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError('Email já cadastrado.')
            } else {
                setError('Não foi possível realizar o cadastro.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView style={commonStyles.screen} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={commonStyles.authContent}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Criar conta</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>Preencha os dados abaixo</Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            placeholder='Nome completo'
                            placeholderTextColor={colors.muted}
                            value={name}
                            onChangeText={setName}
                            style={[commonStyles.input, focusedField === 'name' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder='seu@email.com'
                            placeholderTextColor={colors.muted}
                            value={email}
                            onChangeText={setEmail}
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
                            placeholder='Mínimo 8 caracteres'
                            placeholderTextColor={colors.muted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={[commonStyles.input, focusedField === 'password' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 8 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Tipo de usuário</Text>
                        <View style={styles.roleRow}>
                            <TouchableOpacity
                                onPress={() => setRole('student')}
                                style={[styles.roleOption, role === 'student' && styles.roleOptionActive]}
                            >
                                <Text style={[styles.roleText, role === 'student' && styles.roleTextActive]}>Aluno</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setRole('teacher')}
                                style={[styles.roleOption, role === 'teacher' && styles.roleOptionActive]}
                            >
                                <Text style={[styles.roleText, role === 'teacher' && styles.roleTextActive]}>Professor</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.linkButton}
                    >
                        <Text style={commonStyles.mutedText}>
                            Já possui conta?{' '}
                            <Text style={{ color: colors.primary, fontWeight: '700' }}>Entre aqui</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    roleRow: {
        flexDirection: 'row',
        gap: 12,
    },
    roleOption: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.surface,
        alignItems: 'center',
    },
    roleOptionActive: {
        borderColor: colors.primary,
        backgroundColor: colors.surfaceSoft,
    },
    roleText: {
        color: colors.muted,
        fontSize: 14,
        fontWeight: '600',
    },
    roleTextActive: {
        color: colors.primary,
        fontWeight: '800',
    },
    linkButton: {
        marginTop: 16,
        alignItems: 'center',
    },
})