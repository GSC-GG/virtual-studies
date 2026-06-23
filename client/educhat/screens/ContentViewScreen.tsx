import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, Linking, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles, shadows } from '../styles/theme'
import useContentViewViewModel from '../viewmodels/useContentViewViewModel'

type ContentViewScreenProps = NativeStackScreenProps<RootStackParamList, 'ContentView'>

export default function ContentViewScreen({ navigation, route }: ContentViewScreenProps) {
    const { chatId, contentId, contentType, token } = route.params
    const vm = useContentViewViewModel(chatId, contentId, contentType, token)

    if (vm.loading) {
        return (
            <View style={[commonStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={commonStyles.mutedText}>Carregando...</Text>
            </View>
        )
    }

    if (!vm.content) {
        return (
            <View style={[commonStyles.screen, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Text style={commonStyles.mutedText}>Conteúdo não encontrado.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>{vm.content.title}</Text>
                        <View style={[styles.badge, vm.isMaterial ? styles.badgeMaterial : styles.badgeExercise]}>
                            <Text style={[styles.badgeText, vm.isMaterial ? styles.badgeTextMaterial : styles.badgeTextExercise]}>
                                {vm.isMaterial ? 'Material' : 'Exercício'}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{vm.content.description || 'Sem descrição.'}</Text>

                    {vm.content.createdAt && (
                        <Text style={commonStyles.mutedText}>
                            Publicado em: {new Date(vm.content.createdAt).getDate()}/{new Date(vm.content.createdAt).getMonth() + 1}/{new Date(vm.content.createdAt).getFullYear()}
                        </Text>
                    )}

                    <View style={{ marginTop: 20 }}>
                        {vm.isMaterial && vm.content.local ? (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(vm.content.local)}
                                style={commonStyles.primaryButton}
                            >
                                <Text style={commonStyles.primaryButtonText}>Baixar / Acessar Material</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => { if (vm.content.link) Linking.openURL(vm.content.link) }}
                                style={commonStyles.primaryButton}
                            >
                                <Text style={commonStyles.primaryButtonText}>Responder Exercício</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.secondaryButton}
                >
                    <Text style={commonStyles.secondaryButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        flex: 1,
        marginRight: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeMaterial: {
        backgroundColor: colors.surfaceSoft,
    },
    badgeExercise: {
        backgroundColor: '#FFF3E0',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    badgeTextMaterial: {
        color: colors.primary,
    },
    badgeTextExercise: {
        color: '#E65100',
    },
    description: {
        fontSize: 14,
        color: colors.muted,
        lineHeight: 22,
        marginBottom: 8,
    },
})