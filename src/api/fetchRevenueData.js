// Fake API (replace with axios or actual fetch call)
export const fetchChartData = async (range) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // simulate delay

    const data = {
        daily: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            income: [0, 59, 80, 81, 56, 55, 40],
            expense: [28, 48, 40, 19, 86, 27, 90],
        },
        weekly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            income: [0, 59, 80, 81],
            expense: [28, 48, 40, 19],
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            income: [0, 59, 80, 81, 56, 55, 40, 10, 20, 60, 30, 45],
            expense: [28, 48, 40, 19, 86, 27, 90, 0, 59, 80, 81, 56,],
        }
    };

    const sales = 2309864;

    return {
        ...data[range.value],
        sales
    }
};