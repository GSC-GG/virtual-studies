import { StyleSheet, Text, View } from "react-native";
import { UserInfo } from "../../types/UserInfo";
import { BsMortarboard, BsPerson } from "react-icons/bs";

export default function User({ id, name, email, role }: UserInfo) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <BsPerson size={20} color="#5D5FEF" />
                </View>
                <Text style={styles.nameText}>{name}</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <BsMortarboard size={18} color="#8E8E93" />
                </View>
                <Text style={styles.roleText}>
                    {role === "teacher" ? "Professor" : "Aluno"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        gap: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 28,
        alignItems: 'flex-start',
    },
    nameText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2D3436',
    },
    roleText: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
})