export const fetchRecentGigs = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { image: '/demo/images/image1.png', titleHeader: 'Lead Sound Designer', titleSubHeader: 'Hexagon Music', view: 200, location: 'San Francisco', price: '2000', applied: 65, date: '2025-07-15T13:41:53.849755Z' },
          { image: '/demo/images/image1.png', titleHeader: 'Lead Sound Designer', titleSubHeader: 'Hexagon Music', view: 200, location: 'San Francisco', price: '2000', applied: 25, date: '2025-07-14T13:41:53.849755Z' },
          { image: '/demo/images/image1.png', titleHeader: 'Lead Sound Designer', titleSubHeader: 'Hexagon Music', view: 200, location: 'San Francisco', price: '2000', applied: 55, date: '2025-07-13T13:41:53.849755Z' },
          { image: '/demo/images/image1.png', titleHeader: 'Lead Sound Designer', titleSubHeader: 'Hexagon Music', view: 200, location: 'San Francisco', price: '2000', applied: 15, date: '2025-06-30T13:41:53.849755Z ' },
          { image: '/demo/images/image1.png', titleHeader: 'Lead Sound Designer', titleSubHeader: 'Hexagon Music', view: 200, location: 'San Francisco', price: '2000', applied: 45, date: '2025-06-20T13:41:53.849755Z' },
        ]
      });
    }, 1000);
  });

export const fetchActiveUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            image: '/demo/images/image1.png',
            phone: '08123456789',
            clientName: 'James Garden',
            titleSubHeader: 'Hexagon Music',
            activeGig: 60,
            location: 'San Francisco',
            walletBalance: '2000',
            date: '2025-07-15T13:41:53.849755Z'
          },
          {
            "image": "/demo/images/image2.png",
            "phone": "08109876543",
            "clientName": "Bob Johnson",
            "titleSubHeader": "Creative Solutions",
            "activeGig": 72,
            "location": "Los Angeles",
            "walletBalance": "3200",
            "date": "2025-07-21T11:15:00Z"
          },
          {
            "image": "/demo/images/image3.png",
            "phone": "08105678901",
            "clientName": "Charlie Brown",
            "titleSubHeader": "Digital Dreams",
            "activeGig": 18,
            "location": "Chicago",
            "walletBalance": "800",
            "date": "2025-07-22T14:00:00Z"
          },
          {
            "image": "/demo/images/image4.png",
            "phone": "08102345678",
            "clientName": "Diana Prince",
            "titleSubHeader": "Strategic Vision",
            "activeGig": 91,
            "location": "Houston",
            "walletBalance": "5000",
            "date": "2025-07-23T09:45:00Z"
          },
          {
            "image": "/demo/images/image5.png",
            "phone": "08108765432",
            "clientName": "Edward King",
            "titleSubHeader": "Global Ventures",
            "activeGig": 55,
            "location": "Miami",
            "walletBalance": "2100",
            "date": "2025-07-24T16:20:00Z"
          },
          {
            "image": "/demo/images/image6.png",
            "phone": "08103456789",
            "clientName": "Fiona Green",
            "titleSubHeader": "Peak Performance",
            "activeGig": 40,
            "location": "Seattle",
            "walletBalance": "1750",
            "date": "2025-07-25T13:10:00Z"
          },
          {
            "image": "/demo/images/image7.png",
            "phone": "08107654321",
            "clientName": "George White",
            "titleSubHeader": "Quantum Leap",
            "activeGig": 80,
            "location": "Dallas",
            "walletBalance": "4500",
            "date": "2025-07-26T10:05:00Z"
          },
          {
            "image": "/demo/images/image8.png",
            "phone": "08104567890",
            "clientName": "Hannah Black",
            "titleSubHeader": "Infinite Possibilities",
            "activeGig": 22,
            "location": "Boston",
            "walletBalance": "950",
            "date": "2025-07-27T17:30:00Z"
          },
          {
            "image": "/demo/images/image9.png",
            "phone": "08106789012",
            "clientName": "Isaac Hall",
            "titleSubHeader": "Synergy Works",
            "activeGig": 65,
            "location": "Atlanta",
            "walletBalance": "2800",
            "date": "2025-07-28T08:50:00Z"
          },
          {
            "image": "/demo/images/image10.png",
            "phone": "08101239876",
            "clientName": "Jessica Lee",
            "titleSubHeader": "Next Gen Tech",
            "activeGig": 48,
            "location": "Denver",
            "walletBalance": "1900",
            "date": "2025-07-29T12:00:00Z"
          },
          {
            "image": "/demo/images/image11.png",
            "phone": "08109871234",
            "clientName": "Kevin Taylor",
            "titleSubHeader": "Master Minds",
            "activeGig": 70,
            "location": "Phoenix",
            "walletBalance": "3700",
            "date": "2025-07-30T15:40:00Z"
          },
          {
            "image": "/demo/images/image12.png",
            "phone": "08105432109",
            "clientName": "Laura Chen",
            "titleSubHeader": "Innovation Hub",
            "activeGig": 28,
            "location": "Portland",
            "walletBalance": "1100",
            "date": "2025-07-31T09:10:00Z"
          },
          {
            "image": "/demo/images/image13.png",
            "phone": "08102109876",
            "clientName": "Mike Davis",
            "titleSubHeader": "Solution Seekers",
            "activeGig": 85,
            "location": "San Diego",
            "walletBalance": "4800",
            "date": "2025-08-01T14:55:00Z"
          },
          {
            "image": "/demo/images/image14.png",
            "phone": "08108765123",
            "clientName": "Nancy Miller",
            "titleSubHeader": "Growth Catalysts",
            "activeGig": 33,
            "location": "Philadelphia",
            "walletBalance": "1600",
            "date": "2025-08-02T11:25:00Z"
          },
          {
            "image": "/demo/images/image15.png",
            "phone": "08103210987",
            "clientName": "Oscar Wilson",
            "titleSubHeader": "Bold Horizons",
            "activeGig": 78,
            "location": "Charlotte",
            "walletBalance": "4100",
            "date": "2025-08-03T16:00:00Z"
          },
          {
            "image": "/demo/images/image16.png",
            "phone": "08107654321",
            "clientName": "Patricia Moore",
            "titleSubHeader": "Future Forward",
            "activeGig": 50,
            "location": "Nashville",
            "walletBalance": "2300",
            "date": "2025-08-04T10:40:00Z"
          },
          {
            "image": "/demo/images/image17.png",
            "phone": "08104561234",
            "clientName": "Quinn Jones",
            "titleSubHeader": "Dynamic Edge",
            "activeGig": 25,
            "location": "Raleigh",
            "walletBalance": "1000",
            "date": "2025-08-05T13:00:00Z"
          },
          {
            "image": "/demo/images/image18.png",
            "phone": "08106789543",
            "clientName": "Robert Brown",
            "titleSubHeader": "Peak Innovations",
            "activeGig": 62,
            "location": "Austin",
            "walletBalance": "2600",
            "date": "2025-08-06T09:30:00Z"
          },
          {
            "image": "/demo/images/image19.png",
            "phone": "08101234567",
            "clientName": "Sarah Davis",
            "titleSubHeader": "Next Level",
            "activeGig": 45,
            "location": "Orlando",
            "walletBalance": "1850",
            "date": "2025-08-07T12:15:00Z"
          },
          {
            "image": "/demo/images/image20.png",
            "phone": "08109876543",
            "clientName": "Thomas Wilson",
            "titleSubHeader": "Venture Capital",
            "activeGig": 95,
            "location": "Las Vegas",
            "walletBalance": "5500",
            "date": "2025-08-08T17:00:00Z"
          }
        ]
      });
    }, 1000);
  });
