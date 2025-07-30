export const fetchCarouselStats = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        image: '/demo/images/image1.png',
                        value: 760,
                        suffix: 'avg.',
                        label: 'Active Users'
                    },
                    {
                        image: '/demo/images/image3.png',
                        value: 170,
                        suffix: '',
                        label: 'Engagement/Post'
                    },
                    {
                        image: '/demo/images/image2.png',
                        value: 260,
                        suffix: '',
                        label: 'Posts/day'
                    }
                ]
            });
        }, 1000);
    });


export const fetchAmountStats = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        image: '/demo/images/save.png',
                        amount: 22880,
                        nameTag: 'Total Income'
                    },
                    {
                        image: '/demo/images/withdraw.png',
                        amount: 22880,
                        nameTag: 'Total Withdrawn'
                    },
                ]
            })
        }, 1000);
    });

export const fetchCarouselCombined = async () => {
    const [stats, amount] = await Promise.all([
        fetchCarouselStats(),
        fetchAmountStats()
    ]);

    return {
        stats: stats.data,
        amount: amount.data
    };
};