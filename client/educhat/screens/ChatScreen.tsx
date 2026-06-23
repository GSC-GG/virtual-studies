import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ChatInfoView from "../components/chat/ChatInfoView"
import ChatArea from "../components/chat/ChatArea"
import GuideArea from "../components/chat/GuideArea"
import MeetingsArea from "../components/chat/MeetingsArea"
import ParticipantsArea from "../components/chat/ParticipantsArea"
import useChatViewModel from "../viewmodels/useChatViewModel"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/Navigation"
import { ChatContext } from "../viewmodels/ChatContext"
import { colors, shadows } from "../styles/theme"

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>

export default function ChatScreen({ navigation, route }: ChatScreenProps) {
    const { chatId, token } = route.params
    const { chat, teacherName, areaIndex, setAreaIndex, userRole, userId } = useChatViewModel(chatId, token)

    const menuOptions = [
        { label: 'Chat', index: 0 },
        { label: 'Guia', index: 1 },
        { label: 'Reuniões', index: 2 },
        { label: 'Participantes', index: 3 },
    ];

    const areas = [
        <ChatArea key="chat" />,
        <GuideArea key="guide" />,
        <MeetingsArea key="meetings" />,
        <ParticipantsArea key="participants" />,
    ]

    return (
        <ChatContext.Provider value={{ chatId, token, userRole, userId }}>
            <View style={styles.container}>
                <ChatInfoView
                    subject={chat.subject}
                    teacherName={teacherName}
                    createdAt={chat.createdAt}
                />

                <View style={styles.menuCard}>
                    {menuOptions.map((item) => (
                        <TouchableOpacity
                            key={item.index}
                            onPress={() => setAreaIndex(item.index)}
                            style={[
                                styles.menuItem,
                                areaIndex === item.index && styles.activeMenuItem
                            ]}
                        >
                            <Text style={[
                                styles.menuText,
                                areaIndex === item.index && styles.activeMenuText
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.content}>
                    {areas[areaIndex]}
                </View>
            </View>
        </ChatContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    menuCard: {
        marginHorizontal: 20,
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(228, 232, 242, 0.65)',
        ...shadows.card,
    },
    menuItem: {
        width: '48%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 4,
    },
    activeMenuItem: {
        backgroundColor: colors.surfaceSoft,
    },
    menuText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.muted,
    },
    activeMenuText: {
        color: colors.primary,
        fontWeight: '800',
    },
    content: {
        flex: 1,
        marginTop: 16,
    }
})