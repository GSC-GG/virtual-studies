import { Temporal } from "@js-temporal/polyfill"
import { BsPencil, BsCalendar4Event } from "react-icons/bs"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { capitalize } from "../../utils/format"
import { ExerciseInfo } from "../../types/ExerciseInfo"

export default function Exercise({ title, createdAt }: ExerciseInfo) {
    const dateFormatted = `${createdAt.day || '08'}/${createdAt.month || '11'}/${createdAt.year}`;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <BsPencil size={22} color="#5D5FEF" />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.dateRow}>
                        <BsCalendar4Event size={14} color="#8E8E93" />
                        <Text style={styles.dateText}>{dateFormatted}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acessar atividade</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 4,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    button: {
        backgroundColor: '#2B47C4',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});