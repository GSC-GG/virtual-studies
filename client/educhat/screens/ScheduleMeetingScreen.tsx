import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { createMeeting } from '../services/rest'
import { colors, commonStyles } from '../styles/theme'

type ScheduleMeetingScreenProps = NativeStackScreenProps<RootStackParamList, 'ScheduleMeeting'>

export default function ScheduleMeetingScreen({ navigation, route }: ScheduleMeetingScreenProps) {
    const { chatId, token } = route.params
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const validateDate = (dateStr: string): boolean => {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/
        const match = dateStr.match(regex)
        if (!match) return false
        const day = parseInt(match[1], 10)
        const month = parseInt(match[2], 10)
        const year = parseInt(match[3], 10)
        const hour = parseInt(match[4], 10)
        const minute = parseInt(match[5], 10)
        const futureDate = new Date(year, month - 1, day, hour, minute)
        return futureDate > new Date()
    }

    const handleSave = async () => {
        if (title.length < 3 || title.length > 100) {
            setError('Título deve ter entre 3 e 100 caracteres.')
            return
        }
        if (description.length > 500) {
            setError('Descrição deve ter no máximo 500 caracteres.')
            return
        }
        if (!validateDate(date)) {
            setError('Data inválida. Use o formato dd/mm/yyyy HH:mm e certifique-se de que é uma data futura.')
            return
        }

        try {
            setLoading(true)
            setError('')
            // Convert "dd/mm/yyyy HH:mm" to ISO format "yyyy-MM-ddTHH:mm:ss"
            const [datePart, timePart] = date.split(' ')
            const [day, month, year] = datePart.split('/')
            const isoDate = `${year}-${month}-${day}T${timePart}:00`
            await createMeeting(chatId, { title, description, link, date: isoDate }, token)
            navigation.goBack()
        } catch (err: any) {
            setError('Não foi possível agendar a reunião.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView style={commonStyles.screen} keyboardShouldPersistTaps="handled">
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Agendar Reunião</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>
                        Crie uma nova reunião de estudo
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            placeholder='Título da reunião'
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
                            placeholder='Descrição da reunião'
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
                        <Text style={styles.label}>Link da Reunião</Text>
                        <TextInput
                            placeholder='https://meet.google.com/...'
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

                    <View style={styles.field}>
                        <Text style={styles.label}>Data e Hora</Text>
                        <TextInput
                            placeholder='dd/mm/yyyy HH:mm'
                            placeholderTextColor={colors.muted}
                            value={date}
                            onChangeText={setDate}
                            style={[commonStyles.input, focusedField === 'date' && commonStyles.focusedInput]}
                            onFocus={() => setFocusedField('date')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Formato: dd/mm/yyyy HH:mm (data futura)</Text>
                    </View>

                    {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {loading ? 'Agendando...' : 'Agendar'}
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