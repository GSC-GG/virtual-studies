import { StyleSheet, FlatList, Text, View, TouchableOpacity } from "react-native"
import Meeting from "./Meeting"
import useMeetingsAreaViewModel from "../../viewmodels/useMeetingsAreaViewModel"
import { useChatContext } from "../../viewmodels/ChatContext"
import { BsPlus } from "react-icons/bs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/Navigation"
import { useNavigation } from "@react-navigation/native"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function MeetingsArea() {
    const navigation = useNavigation<NavigationProp>()
    const { chatId, token, userRole } = useChatContext()
    const { meetings } = useMeetingsAreaViewModel(chatId, token)

    return (
        <View style={styles.tabContainer}>
            {userRole === 'teacher' && (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('ScheduleMeeting', { chatId, token })}
                >
                    <BsPlus size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Agendar Reunião</Text>
                </TouchableOpacity>
            )}
            <FlatList
                style={styles.flexContainer}
                data={meetings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Meeting {...item} />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        padding: '5%',
    },
    flexContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 16,
        paddingBottom: 40,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#2B47C4',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        marginTop: 4,
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
})