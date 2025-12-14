import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    statValueContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    statValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#AED89D',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 16,
        color: '#666',
    },
    progressContainer: {
        marginTop: 8,
    },
    chartContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 200,
        paddingHorizontal: 8,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    bars: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 2,
    },
    bar: {
        width: '48%',
        borderRadius: 4,
        minHeight: 2,
    },
    totalBar: {
        backgroundColor: '#E0E0E0',
    },
    completedBar: {
        backgroundColor: '#AED89D',
    },
    barLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
    },
    barDate: {
        fontSize: 9,
        color: '#999',
        marginTop: 2,
    },
    barValue: {
        fontSize: 9,
        color: '#666',
        marginTop: 4,
        fontWeight: '500',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 2,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
    },
    emptyChart: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyChartText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});

export default styles;
