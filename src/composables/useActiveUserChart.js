import { ref, onMounted } from 'vue';

export function useActiveUserChart(fetchFn = null) {
    const chartData = ref(null);
    const chartOptions = ref(null);
    const value = ref(0);
    const allUsers = ref(0);
    const activeUsers = ref(0);

    const defaultFetch = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    chart: {
                        labels: [],
                        data: [30731, 14245],
                    },
                    stats: {
                        allUsers: 30731,
                        activeUsers: 25245,
                    },
                });
            }, 1000);
        });

    onMounted(async () => {
        const fetch = fetchFn || defaultFetch;
        const response = await fetch();

        allUsers.value = response.stats.allUsers;
        activeUsers.value = response.stats.activeUsers;

        value.value = ((activeUsers.value / allUsers.value) * 100).toFixed(2);

        console.log(allUsers.value, activeUsers.value, value.value)

        chartData.value = {
            labels: response.chart.labels,
            datasets: [
                {
                    data: [activeUsers.value, allUsers.value - activeUsers.value],
                    backgroundColor: ['#64CFF6', '#661EFF'],
                    borderWidth: 0
                },
            ],
        };

        chartOptions.value = {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            }
        };
    });

    return {
        chartData,
        chartOptions,
        value,
        allUsers,
        activeUsers
    };
}