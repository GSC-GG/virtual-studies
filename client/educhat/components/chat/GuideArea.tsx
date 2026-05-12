import { StyleSheet, FlatList, Text, View } from "react-native"
import Material from "./Material"
import useGuideAreaViewModel from "../../viewmodels/useGuideAreaViewModel"
import Exercise from "./Exercise"

export default function GuideArea() {
    const { materials, exercises } = useGuideAreaViewModel(1)

    const data = [...materials, ...exercises]

    return (
        <View style={styles.tabContainer}>
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
    },
    flexContainer: {
        flex: 1,
    },
    listContainer: {
        paddingTop: 16,
        paddingBottom: 30, // Espaço extra no final para não colar no fundo
    },
});