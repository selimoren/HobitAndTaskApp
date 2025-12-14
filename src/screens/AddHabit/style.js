import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 8,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        fontSize: 16,
        borderColor: '#E0E0E0',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: 'top',
    },
    addButton: {
        marginTop: 30,
    },
});

export default styles;