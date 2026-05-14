import { StyleSheet, FlatList, Text, View } from "react-native"
import Meeting from "./Meeting"
import useMeetingsAreaViewModel from "../../viewmodels/useMeetingsAreaViewModel"

export default function MeetingsArea() {
    const { meetings } = useMeetingsAreaViewModel(1)

    return (
        <View style={styles.tabContainer}>
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
        flex: 1, // Trava a proporção da aba
        padding: '5%',
    },
    flexContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 16,
        paddingBottom: 40, // Espaço extra para o último card
    },
})