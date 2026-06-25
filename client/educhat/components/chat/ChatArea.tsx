import { StyleSheet, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import Message from "./Message"
import useChatAreaViewModel from "../../viewmodels/useChatAreaViewModel"
import { BsClockHistory, BsCamera, BsSendFill } from "react-icons/bs";
import { Temporal } from "@js-temporal/polyfill";
import { useChatContext } from "../../viewmodels/ChatContext";
import React from "react";

export default function ChatArea() {
    const { chatId, token, userId } = useChatContext()
    const { text, setText, messages, sendMessage } = useChatAreaViewModel(chatId, token)

    return (
        <View style={styles.container}>
            {/* Header da Área de Chat */}
            <View style={styles.headerRow}>
                <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>Chat em tempo real</Text>
                </View>
                <TouchableOpacity style={styles.refreshBtn}>
                    <BsClockHistory size={20} color="#5D5FEF" />
                </TouchableOpacity>
            </View>

            {/* Lista de Mensagens */}
            <FlatList
                style={styles.flexContainer}
                data={messages}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Message
                        {...item}
                        authorIsMe={item.author.id === userId}
                    />
                )}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
            />

            {/* Campo de Input */}
            <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite..."
                        style={styles.input}
                        placeholderTextColor="#999"
                        onChangeText={setText}
                    />
                    <TouchableOpacity>
                        <BsCamera size={20} color="#71767A" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={() => {
                        sendMessage(text)
                        setText('')
                    }}
                >
                    < BsSendFill size={18} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        marginTop: 16,
        marginHorizontal: '50%',
        width: '90%',
        alignSelf: 'center',
        padding: 16,
        paddingLeft: '5%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E8EAF6',
    },
    dateText: {
        fontSize: 12,
        color: '#8E8E93',
    },
    refreshBtn: {
        padding: 8,
        backgroundColor: '#E8EAFE',
        borderRadius: 50,
    },
    listPadding: {
        paddingBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8EAFE',
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 48,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#1A1C1E',
    },
    sendBtn: {
        backgroundColor: '#2B47C4',
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
})