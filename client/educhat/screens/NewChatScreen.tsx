import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles } from '../styles/theme'
import useNewChatViewModel from '../viewmodels/useNewChatViewModel'

type NewChatScreenProps = NativeStackScreenProps<RootStackParamList, 'NewChat'>

export default function NewChatScreen({ navigation, route }: NewChatScreenProps) {
    const { token } = route.params
    const vm = useNewChatViewModel(token)

    const handleCreate = async () => {
        const chatId = await vm.handleCreate()
        if (chatId) {
            navigation.navigate('Chat', { chatId, token })
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
                            value={vm.subject}
                            onChangeText={vm.setSubject}
                            style={[commonStyles.input, vm.focused && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocused(true)}
                            onBlur={() => vm.setFocused(false)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 3, máximo 120 caracteres</Text>
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleCreate}
                        disabled={vm.loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {vm.loading ? 'Criando...' : 'Criar Chat'}
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