import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles } from '../styles/theme'
import useAddContentViewModel from '../viewmodels/useAddContentViewModel'

type AddContentScreenProps = NativeStackScreenProps<RootStackParamList, 'AddContent'>

export default function AddContentScreen({ navigation, route }: AddContentScreenProps) {
    const { chatId, token } = route.params
    const vm = useAddContentViewModel(chatId, token)

    const handleSave = async () => {
        const success = await vm.handleSave()
        if (success) {
            navigation.goBack()
        }
    }

    return (
        <ScrollView style={commonStyles.screen} keyboardShouldPersistTaps="handled">
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Adicionar Conteúdo</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>
                        Adicione material ou exercício ao chat
                    </Text>

                    <View style={styles.typeRow}>
                        <TouchableOpacity
                            onPress={() => vm.setContentType('material')}
                            style={[styles.typeOption, vm.contentType === 'material' && styles.typeOptionActive]}
                        >
                            <Text style={[styles.typeText, vm.contentType === 'material' && styles.typeTextActive]}>
                                Material
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => vm.setContentType('exercise')}
                            style={[styles.typeOption, vm.contentType === 'exercise' && styles.typeOptionActive]}
                        >
                            <Text style={[styles.typeText, vm.contentType === 'exercise' && styles.typeTextActive]}>
                                Exercício
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            placeholder='Título do conteúdo'
                            placeholderTextColor={colors.muted}
                            value={vm.title}
                            onChangeText={vm.setTitle}
                            style={[commonStyles.input, vm.focusedField === 'title' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('title')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 3, máximo 100 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            placeholder='Descrição do conteúdo'
                            placeholderTextColor={colors.muted}
                            value={vm.description}
                            onChangeText={vm.setDescription}
                            multiline
                            numberOfLines={4}
                            style={[commonStyles.input, vm.focusedField === 'desc' && commonStyles.focusedInput, { height: 100, textAlignVertical: 'top' }]}
                            onFocus={() => vm.setFocusedField('desc')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Máximo 500 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>
                            {vm.contentType === 'material' ? 'Link (URL do arquivo)' : 'Link (URL do exercício)'}
                        </Text>
                        <TextInput
                            placeholder='https://...'
                            placeholderTextColor={colors.muted}
                            value={vm.link}
                            onChangeText={vm.setLink}
                            autoCapitalize='none'
                            keyboardType='url'
                            style={[commonStyles.input, vm.focusedField === 'link' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('link')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={vm.loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {vm.loading ? 'Salvando...' : 'Salvar Conteúdo'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={[commonStyles.mutedText, { textAlign: 'center' }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    typeRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    typeOption: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.surface,
        alignItems: 'center',
    },
    typeOptionActive: {
        borderColor: colors.primary,
        backgroundColor: colors.surfaceSoft,
    },
    typeText: {
        color: colors.muted,
        fontSize: 14,
        fontWeight: '600',
    },
    typeTextActive: {
        color: colors.primary,
        fontWeight: '800',
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