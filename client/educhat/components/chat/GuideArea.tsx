import { StyleSheet, FlatList, Text, View, TouchableOpacity } from "react-native"
import Material from "./Material"
import useGuideAreaViewModel from "../../viewmodels/useGuideAreaViewModel"
import Exercise from "./Exercise"
import { useChatContext } from "../../viewmodels/ChatContext"
import { BsPlus } from "react-icons/bs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/Navigation"
import { useNavigation } from "@react-navigation/native"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function GuideArea() {
    const navigation = useNavigation<NavigationProp>()
    const { chatId, token, userRole } = useChatContext()
    const { materials, exercises } = useGuideAreaViewModel(chatId, token)

    const data = [...materials, ...exercises]

    return (
        <View style={styles.tabContainer}>
            {userRole === 'teacher' && (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddContent', { chatId, token })}
                >
                    <BsPlus size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Adicionar Conteúdo</Text>
                </TouchableOpacity>
            )}
            <FlatList
                style={styles.flexContainer}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    if ("local" in item) {
                        return <Material {...item} />
                    }
                    return <Exercise {...item} />
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
        width: '100%',
        paddingHorizontal: '10%',
        paddingLeft: '5%'
    },
    flexContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 16,
        paddingBottom: 30,
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
        marginTop: 8,
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});