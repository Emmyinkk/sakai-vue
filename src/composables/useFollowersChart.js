// src/composables/useFollowersChart.js
import { ref, onMounted } from 'vue';

export function useFollowersChart(fetchFn = null) {
    const chartData = ref(null);
    const chartOptions = ref(null);
    const value = ref(0);
    const change = ref(0);
    const newFollowers = ref(0);
    const activeFollowers = ref(0);

    // Dummy fetcher (default)
    const defaultFetch = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    chart: {
                        labels: [],
                        data: [30731, 14245, 10200],
                    },
                    stats: {
                        newFollowers: 30731,
                        activeFollowers: 14245,
                        value: 65.2,
                        change: 2.5,
                    },
                });
            }, 1000);
        });

    onMounted(async () => {
        const fetch = fetchFn || defaultFetch;
        const response = await fetch();

        value.value = response.stats.value;
        change.value = response.stats.change;
        newFollowers.value = response.stats.newFollowers;
        activeFollowers.value = response.stats.activeFollowers;

        chartData.value = {
            labels: response.chart.labels,
            datasets: [
                {
                    data: response.chart.data,
                    backgroundColor: ['#42B883', '#61DAFB', '#DD0031'],
                    borderRadius: [
                        { innerEnd: 50, outerEnd: 50, innerStart: 50, outerStart: 50 },
                    ],
                    hoverBackgroundColor: ['#359268', '#4fadd1', '#b30028'],
                    borderWidth: 0,
                },
            ],
        };

        chartOptions.value = {
            cutout: '90%',
            rotation: -90,
            circumference: 180,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
        };
    });

    return {
        chartData,
        chartOptions,
        value,
        change,
        newFollowers,
        activeFollowers
    };
}
