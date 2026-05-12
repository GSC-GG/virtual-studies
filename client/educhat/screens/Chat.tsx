import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ChatInfo } from "../types/ChatInfo"
import ChatInfoView from "../components/chat/ChatInfoView"
import ChatArea from "../components/chat/ChatArea"
import GuideArea from "../components/chat/GuideArea"
import MeetingsArea from "../components/chat/MeetingsArea"
import ParticipantsArea from "../components/chat/ParticipantsArea"
import useChatViewModel from "../viewmodels/useChatViewModel"
import { Temporal } from "@js-temporal/polyfill"

export default function Chat({ id }: { id: number }) {
    const { chat, areaIndex, setAreaIndex } = useChatViewModel(id)

    const menuOptions = [
        { label: 'Chat', index: 0 },
        { label: 'Guia', index: 1 },
        { label: 'Reuniões', index: 2 },
        { label: 'Participantes', index: 3 },
    ];

    return (
        <View style={styles.container}>
            <ChatInfoView
                id={1}
                subject={chat.subject}
                teacher={chat.teacher}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
        paddingHorizontal: 20,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    menuItem: {
        width: '49%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        marginVertical: 2,
    },
    activeMenuItem: {
        backgroundColor: '#E8EAF6',
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#71767A',
    },
    activeMenuText: {
        color: '#1A1C1E',
    },
    content: {
        flex: 1,
        marginTop: 20,
    }
});

const areas = [
    <ChatArea />,           //0
    <GuideArea />,          //1
    <MeetingsArea />,       //2
    <ParticipantsArea/>,   //3
]