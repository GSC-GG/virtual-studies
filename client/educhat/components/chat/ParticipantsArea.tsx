import { StyleSheet, FlatList, Text, View, TouchableOpacity, Alert } from "react-native"
import useParticipantsAreaViewModel from "../../viewmodels/useParticipantsAreaViewModel"
import User from "./User"
import { useChatContext } from "../../viewmodels/ChatContext"
import { BsPlus, BsTrash } from "react-icons/bs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/Navigation"
import { useNavigation } from "@react-navigation/native"
import { assignOrUnassignStudent, deleteChat } from "../../services/rest"
import { colors } from "../../styles/theme"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function ParticipantsArea() {
    const navigation = useNavigation<NavigationProp>()
    const { chatId, token, userRole } = useChatContext()
    const { users } = useParticipantsAreaViewModel(chatId, token)

    const handleRemoveParticipant = async (studentId: number) => {
        try {
            await assignOrUnassignStudent(chatId, studentId, token)
        } catch (err) {
            console.log('Erro ao remover participante')
        }
    }

    const handleDissolveChat = async () => {
        try {
            await deleteChat(chatId, token)
            navigation.goBack()
        } catch (err) {
            console.log('Erro ao dissolver chat')
        }
    }

    return (
        <View style={styles.tabContainer}>
            {userRole === 'teacher' && (
                <View style={styles.teacherActions}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddParticipant', { chatId, token })}
                    >
                        <BsPlus size={18} color="#fff" />
                        <Text style={styles.actionButtonText}>Adicionar Participante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dissolveButton}
                        onPress={handleDissolveChat}
                    >
                        <BsTrash size={16} color="#fff" />
                        <Text style={styles.actionButtonText}>Dissolver Chat</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                style={styles.flexContainer}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isTeacher = item.role === 'teacher'
                    return (
                        <View style={styles.userWrapper}>
                            <View style={styles.userInfo}>
                                <User {...item} />
                            </View>
                            {userRole === 'teacher' && !isTeacher && (
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveParticipant(item.id)}
                                >
                                    <BsTrash size={14} color="#ff4444" />
                                </TouchableOpacity>
                            )}
                        </View>
                    )
                }}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
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
    teacherActions: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 6,
    },
    dissolveButton: {
        flexDirection: 'row',
        backgroundColor: colors.danger,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700',
    },
    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
    },
    removeButton: {
        padding: 8,
        marginLeft: 8,
    },
})