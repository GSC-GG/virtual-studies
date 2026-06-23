import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles } from '../styles/theme'
import useScheduleMeetingViewModel from '../viewmodels/useScheduleMeetingViewModel'

type ScheduleMeetingScreenProps = NativeStackScreenProps<RootStackParamList, 'ScheduleMeeting'>

export default function ScheduleMeetingScreen({ navigation, route }: ScheduleMeetingScreenProps) {
    const { chatId, token } = route.params
    const vm = useScheduleMeetingViewModel(chatId, token)

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
                    <Text style={commonStyles.title}>Agendar Reunião</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 24 }]}>
                        Crie uma nova reunião de estudo
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Título</Text>
                        <TextInput
                            placeholder='Título da reunião'
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
                            placeholder='Descrição da reunião'
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
                        <Text style={styles.label}>Link da Reunião</Text>
                        <TextInput
                            placeholder='https://meet.google.com/...'
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

                    <View style={styles.field}>
                        <Text style={styles.label}>Data e Hora</Text>
                        <TextInput
                            placeholder='dd/mm/yyyy HH:mm'
                            placeholderTextColor={colors.muted}
                            value={vm.date}
                            onChangeText={vm.setDate}
                            style={[commonStyles.input, vm.focusedField === 'date' && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocusedField('date')}
                            onBlur={() => vm.setFocusedField(null)}
                        />
                        <Text style={commonStyles.mutedText}>Formato: dd/mm/yyyy HH:mm (data futura)</Text>
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={vm.loading}
                        style={commonStyles.primaryButton}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            {vm.loading ? 'Agendando...' : 'Agendar'}
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