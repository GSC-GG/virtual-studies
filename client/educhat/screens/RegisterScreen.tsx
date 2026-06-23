import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { useNavigation } from '@react-navigation/native'
import { colors, commonStyles } from '../styles/theme'
import useRegisterViewModel from '../viewmodels/useRegisterViewModel'

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
    const navigation = useNavigation<RegisterNavigationProp>()
    const vm = useRegisterViewModel()

    const handleRegister = async () => {
        const success = await vm.handleRegister()
        if (success) {
            navigation.navigate('Login')
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
                            value={vm.name}
                            onChangeText={vm.setName}
                            style={[commonStyles.input, vm.focusedField === 'name' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('name')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder='seu@email.com'
                            placeholderTextColor={colors.muted}
                            value={vm.email}
                            onChangeText={vm.setEmail}
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
                            placeholder='Mínimo 8 caracteres'
                            placeholderTextColor={colors.muted}
                            value={vm.password}
                            onChangeText={vm.setPassword}
                            secureTextEntry
                            style={[commonStyles.input, vm.focusedField === 'password' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('password')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 8 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Tipo de usuário</Text>
                        <View style={styles.roleRow}>
                            <TouchableOpacity
                                onPress={() => vm.setRole('student')}
                                style={[styles.roleOption, vm.role === 'student' && styles.roleOptionActive]}
                            >
                                <Text style={[styles.roleText, vm.role === 'student' && styles.roleTextActive]}>Aluno</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => vm.setRole('teacher')}
                                style={[styles.roleOption, vm.role === 'teacher' && styles.roleOptionActive]}
                            >
                                <Text style={[styles.roleText, vm.role === 'teacher' && styles.roleTextActive]}>Professor</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={vm.loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {vm.loading ? 'Cadastrando...' : 'Cadastrar'}
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