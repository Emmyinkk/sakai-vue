import { ref, computed, watch, onMounted } from 'vue';
import { useApi } from './useApi';
import { fetchChartData  } from '../api/fetchRevenueData'

export function useRevenueChart() {
    const selectedRange = ref({ label: 'Weekly', value: 'weekly' });

    const { data, loading, error, fetchData } = useApi(fetchChartData, { immediate: false });

    watch(selectedRange, async (val) => {
        await fetchData(val);
    }, { immediate: true });

    const chartData = computed(() => {
        if (!data.value) {
            return {
                labels: [],
                datasets: []
            }
        };

        return {
            labels: data.value.labels,
            datasets: [
                {
                    label: '',
                    data: data.value.income,
                    borderColor: '#13B554',
                    tension: 0.4,
                },
                {
                    label: '',
                    data: data.value.expense,
                    borderColor: '#EC4F46',
                    tension: 0.4,
                }
            ]
        };
    });
    const chartOptions = computed(() => ({
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: { color: '#aaa' },
                grid: { color: '#eee' }
            },
            y: {
                position: 'left',
                ticks: {
                    callback: val => val + 'M',
                    color: '#aaa'
                },
                grid: { color: '#eee' }
            },
        }
    }));

    const sales = computed(() => data.value?.sales || []);

    return {
        selectedRange,
        setRange: val => selectedRange.value = val,
        chartData,
        chartOptions,
        sales,
        loading,
        error
    };
}