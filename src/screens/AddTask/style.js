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
    priorityContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: '#F5F5F5',
    },
    priorityButtonText: {
        fontSize: 14,
        color: '#666',
    },
    periodContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    periodButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#AED89D',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    periodButtonActive: {
        backgroundColor: '#AED89D',
    },
    periodButtonText: {
        fontSize: 14,
        color: '#AED89D',
    },
    periodButtonTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    hint: {
        fontSize: 12,
        color: '#FFFFFF',
        opacity: 0.7,
        marginTop: 4,
        marginBottom: 8,
    },
    addButton: {
        marginTop: 30,
    },
});

export default styles;