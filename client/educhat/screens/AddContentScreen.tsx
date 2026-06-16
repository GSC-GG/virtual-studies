import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { createMaterial, createExercise } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'

type AddContentScreenProps = NativeStackScreenProps<RootStackParamList, 'AddContent'>

export default function AddContentScreen({ navigation, route }: AddContentScreenProps) {
    const { chatId, token } = route.params
    const [contentType, setContentType] = useState<'material' | 'exercise'>('material')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSave = async () => {
        if (title.length < 3 || title.length > 100) {
            setError('Título deve ter entre 3 e 100 caracteres.')
            return
        }
        if (description.length > 500) {
            setError('Descrição deve ter no máximo 500 caracteres.')
            return
        }

        try {
            setLoading(true)
            setError('')
            if (contentType === 'material') {
                await createMaterial(chatId, { title, description, local: link }, token)
            } else {
                await createExercise(chatId, { title, description, link }, token)
            }
            navigation.goBack()
        } catch (err: any) {
            setError('Não foi possível salvar o conteúdo.')
        } finally {
            setLoading(false)
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

                    {/* Toggle Material / Exercício */}
                    <View style={styles.typeRow}>
                        <TouchableOpacity
                            onPress={() => setContentType('material')}
                            style={[styles.typeOption, contentType === 'material' && styles.typeOptionActive]}
                        >
                            <Text style={[styles.typeText, contentType === 'material' && styles.typeTextActive]}>
                                Material
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setContentType('exercise')}
                            style={[styles.typeOption, contentType === 'exercise' && styles.typeOptionActive]}
                        >
                            <Text style={[styles.typeText, contentType === 'exercise' && styles.typeTextActive]}>
                                Exercício
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            placeholder='Título do conteúdo'
                            placeholderTextColor={colors.muted}
                            value={title}
                            onChangeText={setTitle}
                            style={[commonStyles.input, focusedField === 'title' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('title')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Mínimo 3, máximo 100 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            placeholder='Descrição do conteúdo'
                            placeholderTextColor={colors.muted}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            style={[commonStyles.input, focusedField === 'desc' && commonStyles.focusedInput, { height: 100, textAlignVertical: 'top' }]}
                            onFocus={() => setFocusedField('desc')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Máximo 500 caracteres</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>
                            {contentType === 'material' ? 'Link (URL do arquivo)' : 'Link (URL do exercício)'}
                        </Text>
                        <TextInput
                            placeholder='https://...'
                            placeholderTextColor={colors.muted}
                            value={link}
                            onChangeText={setLink}
                            autoCapitalize='none'
                            keyboardType='url'
                            style={[commonStyles.input, focusedField === 'link' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('link')}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {loading ? 'Salvando...' : 'Salvar Conteúdo'}
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
        ...commonStyles.card,
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