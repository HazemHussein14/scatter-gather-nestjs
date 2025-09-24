const express = require('express');
const app = express();
const port = 4002;

const flights = [
    {
        id: 'P2-ABC',
        route: {
            from: 'JFK',
            to: 'LAX'
        },
        times: {
            depart: '2025-10-10T11:00:00Z',
            arrive: '2025-10-10T14:00:00Z'
        },
        price_usd: 350
    }
];

const hotels = [
    {
        uid: 'P2-H-XYZ',
        name: 'Luxury Suites',
        place: 'New York',
        price: 200
    }
];

app.get('/flights', (req, res) => {
  setTimeout(() => {
    res.json(flights);
  }, 2000); // 2 second delay
});

app.get('/hotels', (req, res) => {
    setTimeout(() => {
      res.json(hotels);
    }, 500); // 0.5 second delay
});

app.listen(port, () => {
  console.log(`Provider 2 listening at http://localhost:${port}`);
});