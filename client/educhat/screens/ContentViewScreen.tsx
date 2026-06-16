import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Linking, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/Navigation'
import { colors, commonStyles, shadows } from '../styles/theme'

type ContentViewScreenProps = NativeStackScreenProps<RootStackParamList, 'ContentView'>

export default function ContentViewScreen({ navigation, route }: ContentViewScreenProps) {
    const { chatId, contentId, contentType, token } = route.params
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true)
                const { listMaterials, listExercises } = await import('../services/rest')
                if (contentType === 'material') {
                    const res = await listMaterials(chatId, token)
                    const found = res.content.find((m: any) => m.id === contentId)
                    setContent(found)
                } else {
                    const res = await listExercises(chatId, token)
                    const found = res.content.find((e: any) => e.id === contentId)
                    setContent(found)
                }
            } catch (err) {
                console.log('Erro ao carregar conteúdo')
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [chatId, contentId, contentType, token])

    if (loading) {
        return (
            <View style={[commonStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={commonStyles.mutedText}>Carregando...</Text>
            </View>
        )
    }

    if (!content) {
        return (
            <View style={[commonStyles.screen, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Text style={commonStyles.mutedText}>Conteúdo não encontrado.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const isMaterial = contentType === 'material'

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.content}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>{content.title}</Text>
                        <View style={[styles.badge, isMaterial ? styles.badgeMaterial : styles.badgeExercise]}>
                            <Text style={[styles.badgeText, isMaterial ? styles.badgeTextMaterial : styles.badgeTextExercise]}>
                                {isMaterial ? 'Material' : 'Exercício'}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{content.description || 'Sem descrição.'}</Text>

                    {content.createdAt && (
                        <Text style={commonStyles.mutedText}>
                            Publicado em: {content.createdAt.day}/{content.createdAt.month}/{content.createdAt.year}
                        </Text>
                    )}

                    <View style={{ marginTop: 20 }}>
                        {isMaterial && content.local ? (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(content.local)}
                                style={commonStyles.primaryButton}
                            >
                                <Text style={commonStyles.primaryButtonText}>Baixar / Acessar Material</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => { if (content.link) Linking.openURL(content.link) }}
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