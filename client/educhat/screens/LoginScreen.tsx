import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import { colors, commonStyles } from '../styles/theme'
import useLoginViewModel from '../viewmodels/useLoginViewModel'
import React from 'react'

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
    const navigation = useNavigation<LoginNavigationProp>()
    const vm = useLoginViewModel()

    const handlePress = async () => {
        const token = await vm.handleLogin()
        if (token) {
            navigation.navigate('Menu', { token })
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
                            value={vm.username}
                            onChangeText={vm.setUsername}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            style={[commonStyles.input, vm.focusedField === 'email' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('email')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            placeholderTextColor={colors.muted}
                            value={vm.password}
                            onChangeText={vm.setPassword}
                            secureTextEntry
                            style={[commonStyles.input, vm.focusedField === 'password' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('password')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    <TouchableOpacity
                        onPress={handlePress}
                        disabled={vm.loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {vm.loading ? 'Entrando...' : 'Entrar'}
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
        ...commonStyles.card,
        width: '100%',
        maxWidth: 400,
        borderRadius: 12,
        padding: 24,
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