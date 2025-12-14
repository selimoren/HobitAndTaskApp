import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardCompleted: {
        opacity: 0.8,
        backgroundColor: '#F0F8F0',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textBox: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    habitName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    habitNameCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    statusContainer: {
        marginTop: 4,
    },
    completedBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#AED89D',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    completedText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    pendingBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pendingText: {
        fontSize: 12,
        color: '#666',
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
    },
    deleteIcon: {
        height: 24,
        width: 24,
        tintColor: '#F44336',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.8,
    },
});

export default styles;