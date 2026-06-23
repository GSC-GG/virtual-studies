import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles } from '../styles/theme'
import useAddParticipantViewModel from '../viewmodels/useAddParticipantViewModel'

type AddParticipantScreenProps = NativeStackScreenProps<RootStackParamList, 'AddParticipant'>

export default function AddParticipantScreen({ navigation, route }: AddParticipantScreenProps) {
    const { chatId, token } = route.params
    const vm = useAddParticipantViewModel(chatId, token)

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <Text style={commonStyles.title}>Adicionar Participante</Text>
                    <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
                        Busque estudantes por nome ou email
                    </Text>

                    <View style={styles.field}>
                        <TextInput
                            placeholder='Buscar estudante...'
                            placeholderTextColor={colors.muted}
                            value={vm.search}
                            onChangeText={vm.setSearch}
                            style={[commonStyles.input, vm.focused && commonStyles.focusedInput]}
                            onFocus={() => vm.setFocused(true)}
                            onBlur={() => vm.setFocused(false)}
                        />
                    </View>

                    {vm.error ? <Text style={commonStyles.errorText}>{vm.error}</Text> : null}

                    {vm.loading ? (
                        <Text style={[commonStyles.mutedText, { textAlign: 'center', padding: 20 }]}>Carregando...</Text>
                    ) : (
                        <FlatList
                            data={vm.filteredStudents}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isAdded = vm.chatStudents.has(item.id)
                                return (
                                    <View style={styles.studentRow}>
                                        <View style={styles.studentInfo}>
                                            <Text style={styles.studentName}>{item.name}</Text>
                                            <Text style={commonStyles.mutedText}>{item.email}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => vm.handleAddStudent(item.id)}
                                            disabled={vm.adding === item.id}
                                            style={[styles.addBtn, isAdded && styles.addedBtn]}
                                        >
                                            <Text style={[styles.addBtnText, isAdded && styles.addedBtnText]}>
                                                {vm.adding === item.id ? '...' : isAdded ? 'Adicionado' : 'Adicionar'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            ListEmptyComponent={
                                <Text style={[commonStyles.mutedText, { textAlign: 'center', padding: 20 }]}>
                                    {vm.search ? 'Nenhum estudante encontrado.' : 'Nenhum estudante disponível.'}
                                </Text>
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[commonStyles.secondaryButton, { marginTop: 16 }]}
                    >
                        <Text style={commonStyles.secondaryButtonText}>Concluído</Text>
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
    studentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 8,
        backgroundColor: colors.surfaceSoft,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.line,
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },
    addBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: colors.primary,
    },
    addedBtn: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
    },
    addBtnText: {
        color: colors.surface,
        fontSize: 13,
        fontWeight: '700',
    },
    addedBtnText: {
        color: colors.muted,
    },
})