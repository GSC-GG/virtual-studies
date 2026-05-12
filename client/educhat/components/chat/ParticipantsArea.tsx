import { StyleSheet, FlatList, Text, View } from "react-native"
import useParticipantsAreaViewModel from "../../viewmodels/useParticipantsAreaViewModel"
import User from "./User"

export default function ParticipantsArea() {
    const { users } = useParticipantsAreaViewModel()

    return (
        <View style={styles.tabContainer}>
            <FlatList
                style={styles.flexContainer}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <User {...item} />}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1, // Trava a proporção da aba
        width: '100%',
    },
    flexContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 16,
        paddingBottom: 40, // Espaço extra para o último card
    },
})