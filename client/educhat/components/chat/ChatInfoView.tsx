import { StyleSheet, View, Text } from "react-native"
import { ChatInfo } from "../../types/ChatInfo"
import { capitalize } from "../../utils/format"
import React from "react"
import { BsBook, BsCalendar, BsPerson } from "react-icons/bs"

export default function ChatInfoView({ subject, teacher, createdAt }: ChatInfo) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <BsBook size={20} color="#5D5FEF" style={styles.icon} />
                <Text style={styles.subjectText}>{subject}</Text>
            </View>

            <View style={styles.row}>
                <BsPerson size={18} color="#8E8E93" style={styles.icon} />
                <Text style={styles.secondaryText}>{`Prof. ${teacher}`}</Text>
            </View>

            <View style={styles.row}>
                <BsCalendar size={16} color="#8E8E93" style={styles.icon} />
                <Text style={styles.secondaryText}>{createdAt.year}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        width: 20,
    },
    subjectText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1C1E',
    },
    secondaryText: {
        fontSize: 15,
        color: '#636E72',
        fontWeight: '500',
    },
})