import { Temporal } from "@js-temporal/polyfill"
import { BsHeart } from "react-icons/bs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MessageInfo } from "../../types/MessageInfo";

type Props = MessageInfo & {
    authorIsMe?: boolean
}

export default function Message({id, text, author, thanks, createdAt, authorIsMe = false}: Props) {
    const time = createdAt.hour.toString() + ':' + createdAt.minute.toString()

    return (
        <View style={[styles.wrapper, authorIsMe ? styles.myWrapper : styles.otherWrapper]}>
            <View style={[styles.bubble, authorIsMe ? styles.myBubble : styles.otherBubble]}>
                <View style={styles.header}>
                    <Text style={[styles.author, authorIsMe && styles.myText]}>{authorIsMe ? "Você" : "Julia"}</Text>
                    <Text style={[styles.time, authorIsMe && styles.myText]}>{time}</Text>
                </View>
                <Text style={[styles.messageText, authorIsMe && styles.myText]}>{text}</Text>
            </View>
            
            {!authorIsMe && (
                <TouchableOpacity style={styles.heartBtn}>
                    <BsHeart size={18} color="#5D5FEF" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        width: '100%',
    },
    myWrapper: {
        justifyContent: 'flex-end',
    },
    otherWrapper: {
        justifyContent: 'flex-start',
    },
    bubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '85%',
    },
    myBubble: {
        backgroundColor: '#2B47C4',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#E8EAFE',
        borderBottomLeftRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        gap: 20
    },
    author: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1A1C1E',
    },
    time: {
        fontSize: 10,
        color: '#71767A',
    },
    messageText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 18,
    },
    myText: {
        color: '#FFFFFF',
    },
    heartBtn: {
        marginLeft: 8,
    }
});