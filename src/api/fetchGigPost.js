// src/service/GigService.js

// This array will serve as our "database" for dummy gig posts
let GIG_POSTS_DATA = [
    {
        id: '1000',
        title: 'Senior Sound Designer',
        clientName: 'AlphaTech Solutions',
        location: 'Lagos, Nigeria',
        description: 'Development of dynamic and user-friendly dashboards for data visualization.',
        image: 'product-placeholder.svg',
        budget: 12000.00,
        category: 'Web Development',
        jobType: 'FULL_TIME', // Added jobType
        experience: '4-8_YEARS', // Added experience
        clientHistory: '1-9_HIRES', // Added clientHistory
        numProposals: 7, // Added numProposals
        inventoryStatus: 'ACTIVE',
        rating: 4.5,
        projectDone: 23,
        commentNumber: 45,
    },
    {
        id: '1001',
        title: 'Mobile App UI/UX Redesign',
        clientName: 'Innovate Minds Inc.',
        location: 'Accra, Ghana',
        description: 'Complete overhaul of an existing mobile application user interface and experience.',
        image: 'product-placeholder.svg',
        budget: 8500.00,
        category: 'UI/UX Design',
        jobType: 'CONTRACT',
        experience: '1-3_YEARS',
        clientHistory: 'NO_HIRE',
        numProposals: 3,
        inventoryStatus: 'PENDING',
        rating: 3.8
    },
    {
        id: '1002',
        title: 'E-commerce Platform Development',
        clientName: 'Global Retail Group',
        location: 'Nairobi, Kenya',
        description: 'Full-stack development of a scalable e-commerce platform with payment gateway integration.',
        image: 'product-placeholder.svg',
        budget: 25000.00,
        category: 'E-commerce',
        jobType: 'FULL_TIME',
        experience: '10_YEARS_PLUS',
        clientHistory: '10_PLUS_HIRES',
        numProposals: 15,
        inventoryStatus: 'REVIEWED',
        rating: 4.9
    },
    {
        id: '1003',
        title: 'Content Writing for Tech Blog',
        clientName: 'TechSphere Media',
        location: 'Cape Town, South Africa',
        description: 'Regular content creation for a technology news and review blog, including articles and reviews.',
        image: 'product-placeholder.svg',
        budget: 1500.00,
        category: 'Content Creation',
        jobType: 'CONTRACT',
        experience: '1-3_YEARS',
        clientHistory: '1-9_HIRES',
        numProposals: 8,
        inventoryStatus: 'ACTIVE',
        rating: 4.2
    },
    {
        id: '1004',
        title: 'Cloud Infrastructure Migration',
        clientName: 'SecureCloud Solutions',
        location: 'Cairo, Egypt',
        description: 'Migration of on-premise infrastructure to a cloud-based solution (AWS/Azure/GCP).',
        image: 'product-placeholder.svg',
        budget: 18000.00,
        category: 'Cloud Services',
        jobType: 'FULL_TIME',
        experience: '4-8_YEARS',
        clientHistory: '10_PLUS_HIRES',
        numProposals: 12,
        inventoryStatus: 'COMPLETED',
        rating: 4.7
    },
    {
        id: '1005',
        title: 'SEO Optimization for Startup Website',
        clientName: 'GrowthHack Ventures',
        location: 'Casablanca, Morocco',
        description: 'Comprehensive SEO strategy and implementation to improve search engine rankings.',
        image: 'product-placeholder.svg',
        budget: 3000.00,
        category: 'Digital Marketing',
        jobType: 'CONTRACT',
        experience: 'ALL', // Added ALL
        clientHistory: 'NO_HIRE',
        numProposals: 4,
        inventoryStatus: 'PENDING',
        rating: 3.5
    },
    {
        id: '1006',
        title: 'Video Editing for YouTube Channel',
        clientName: 'EduTube Creators',
        location: 'Abidjan, Côte d\'Ivoire',
        description: 'Professional video editing services for educational YouTube content, including animations and transitions.',
        image: 'product-placeholder.svg',
        budget: 250.00,
        category: 'Video Production',
        jobType: 'CONTRACT',
        experience: '1-3_YEARS',
        clientHistory: '1-9_HIRES',
        numProposals: 9,
        inventoryStatus: 'ARCHIVE',
        rating: 4.0
    },
    {
        id: '1007',
        title: 'Cybersecurity Audit for SME',
        clientName: 'Guardian Networks',
        location: 'Tunis, Tunisia',
        description: 'Conducting a thorough cybersecurity audit and providing recommendations for small to medium enterprises.',
        image: 'product-placeholder.svg',
        budget: 7000.00,
        category: 'Cybersecurity',
        jobType: 'FULL_TIME',
        experience: '10_YEARS_PLUS',
        clientHistory: '10_PLUS_HIRES',
        numProposals: 22,
        inventoryStatus: 'ACTIVE',
        rating: 4.8
    },
    {
        id: '1008',
        title: 'Custom CRM Software Development',
        clientName: 'ClientConnect Solutions',
        location: 'Lusaka, Zambia',
        description: 'Building a bespoke Customer Relationship Management (CRM) software tailored to client needs.',
        image: 'product-placeholder.svg',
        budget: 30000.00,
        category: 'Software Development',
        jobType: 'FULL_TIME',
        experience: '4-8_YEARS',
        clientHistory: '10_PLUS_HIRES',
        numProposals: 18,
        inventoryStatus: 'REVIEWED',
        rating: 4.6
    },
    {
        id: '1009',
        title: 'Social Media Campaign Management',
        clientName: 'TrendSetters Agency',
        location: 'Harare, Zimbabwe',
        description: 'Planning, executing, and monitoring social media campaigns across various platforms.',
        image: 'product-placeholder.svg',
        budget: 4000.00,
        category: 'Digital Marketing',
        jobType: 'CONTRACT',
        experience: '1-3_YEARS',
        clientHistory: '1-9_HIRES',
        numProposals: 6,
        inventoryStatus: 'COMPLETED',
        rating: 4.1
    }
];

// Helper to generate a unique ID (simple for dummy data)
function createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export const GigService = {
    // Simulate GET all gigs with optional filters
    getGigs(filters = {}) {
        return new Promise(resolve => {
            setTimeout(() => {
                let filteredGigs = [...GIG_POSTS_DATA]; // Start with a copy of all data

                // Apply filters if present
                if (filters.jobType && filters.jobType !== 'ALL') {
                    filteredGigs = filteredGigs.filter(gig => gig.jobType === filters.jobType);
                }

                if (filters.experience && filters.experience !== 'ALL') {
                    filteredGigs = filteredGigs.filter(gig => gig.experience === filters.experience);
                }

                if (filters.clientHistory && filters.clientHistory !== 'ALL') {
                    filteredGigs = filteredGigs.filter(gig => gig.clientHistory === filters.clientHistory);
                }

                if (filters.numProposals) {
                    switch (filters.numProposals) {
                        case 'LESS_THAN_5':
                            filteredGigs = filteredGigs.filter(gig => gig.numProposals < 5);
                            break;
                        case '5-10':
                            filteredGigs = filteredGigs.filter(gig => gig.numProposals >= 5 && gig.numProposals <= 10);
                            break;
                        case '10-20':
                            filteredGigs = filteredGigs.filter(gig => gig.numProposals > 10 && gig.numProposals <= 20);
                            break;
                        case '20_PLUS':
                            filteredGigs = filteredGigs.filter(gig => gig.numProposals > 20);
                            break;
                    }
                }

                resolve(filteredGigs); // Return the filtered data
            }, 500); // Simulate network delay
        });
    },

    // Simulate GET gig by ID (no changes needed here related to filters)
    getGigById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const gig = GIG_POSTS_DATA.find(g => g.id === id);
                if (gig) {
                    resolve({ ...gig });
                } else {
                    reject(new Error('Gig not found'));
                }
            }, 300);
        });
    },

    // Simulate POST (create new gig)
    createGig(newGig) {
        return new Promise(resolve => {
            setTimeout(() => {
                const gigWithId = { ...newGig, id: createId() };
                GIG_POSTS_DATA.push(gigWithId);
                resolve({ ...gigWithId });
            }, 500);
        });
    },

    // Simulate PUT (update existing gig)
    updateGig(updatedGig) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = GIG_POSTS_DATA.findIndex(g => g.id === updatedGig.id);
                if (index !== -1) {
                    GIG_POSTS_DATA[index] = { ...updatedGig };
                    resolve({ ...GIG_POSTS_DATA[index] });
                } else {
                    reject(new Error('Gig not found for update'));
                }
            }, 500);
        });
    },

    // Simulate DELETE (delete a single gig)
    deleteGig(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = GIG_POSTS_DATA.length;
                GIG_POSTS_DATA = GIG_POSTS_DATA.filter(g => g.id !== id);
                if (GIG_POSTS_DATA.length < initialLength) {
                    resolve({ success: true, message: 'Gig deleted' });
                } else {
                    reject(new Error('Gig not found for deletion'));
                }
            }, 500);
        });
    },

    // Simulate DELETE (delete multiple gigs)
    deleteMultipleGigs(ids) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = GIG_POSTS_DATA.length;
                GIG_POSTS_DATA = GIG_POSTS_DATA.filter(g => !ids.includes(g.id));
                if (GIG_POSTS_DATA.length < initialLength) {
                    resolve({ success: true, message: `${initialLength - GIG_POSTS_DATA.length} gigs deleted` });
                } else {
                    reject(new Error('No gigs found for deletion'));
                }
            }, 500);
        });
    }
};