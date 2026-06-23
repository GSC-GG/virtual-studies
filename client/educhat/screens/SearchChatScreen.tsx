import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles } from '../styles/theme'
import useSearchChatViewModel from '../viewmodels/useSearchChatViewModel'

type SearchChatScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchChat'>

export default function SearchChatScreen({ navigation, route }: SearchChatScreenProps) {
    const { token } = route.params
    const vm = useSearchChatViewModel(token)

    const handleJoinChat = async () => {
        const success = await vm.handleJoinChat()
        if (success && vm.foundChat) {
            navigation.navigate('Chat', { chatId: vm.foundChat.id, token })
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
                            value={vm.subject}
                            onChangeText={vm.setSubject}
                            style={[commonStyles.input, vm.focusedField === 'subject' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('subject')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Professor</Text>
                        <TextInput
                            placeholder='Nome do professor'
                            placeholderTextColor={colors.muted}
                            value={vm.teacher}
                            onChangeText={vm.setTeacher}
                            style={[commonStyles.input, vm.focusedField === 'teacher' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('teacher')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    {vm.foundChat ? (
                        <View style={styles.resultCard}>
                            <Text style={styles.resultSubject}>{vm.foundChat.subject}</Text>
                            <Text style={commonStyles.mutedText}>Professor ID: {vm.foundChat.teacherId}</Text>
                            <TouchableOpacity
                                onPress={handleJoinChat}
                                disabled={vm.loading}
                                style={[commonStyles.primaryButton, { marginTop: 12 }]}
                            >
                                <Text style={commonStyles.primaryButtonText}>
                                    {vm.loading ? 'Ingressando...' : 'Ingressar em Chat'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={vm.handleSearch}
                            disabled={vm.loading}
                            style={commonStyles.primaryButton}
                        >
                            <Text style={commonStyles.primaryButtonText}>
                                {vm.loading ? 'Buscando...' : 'Buscar Chat'}
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