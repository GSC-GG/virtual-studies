import { StyleSheet } from 'react-native'

export const colors = {
    background: '#F4F7FC',
    surface: '#FFFFFF',
    surfaceSoft: '#EEF2FF',
    primary: '#2446D8',
    primaryDark: '#1837B8',
    text: '#171A22',
    muted: '#6F7582',
    line: '#E4E8F2',
    danger: '#D93636',
}

export const shadows = {
    card: {
        elevation: 3,
        shadowColor: '#1B2A4A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
    },
    header: {
        elevation: 4,
        shadowColor: '#1B2A4A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
}

export const commonStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 980,
        alignSelf: 'center',
    },
    authContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    title: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
    },
    subtitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 12,
    },
    input: {
        height: 42,
        borderRadius: 5,
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 12,
        color: colors.text,
        fontSize: 13,
        fontWeight: '500',
    },
    focusedInput: {
        borderColor: colors.primary,
        backgroundColor: colors.surface,
    },
    primaryButton: {
        minHeight: 42,
        borderRadius: 6,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        ...shadows.card,
    },
    primaryButtonText: {
        color: colors.surface,
        fontSize: 13,
        fontWeight: '800',
    },
    secondaryButton: {
        minHeight: 38,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 9,
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '800',
    },
    mutedText: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: '500',
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
    },
})
