const express = require("express");
const app = express();
const port = 4001;

const flights = [
  {
    flightId: "P1-123",
    origin: "JFK",
    dest: "LAX",
    dep: "2025-10-10T10:00:00Z",
    arr: "2025-10-10T13:00:00Z",
    fare: {
      amount: 300,
      cur: "USD",
    },
  },
];

const hotels = [
  {
    id: "P1-H-456",
    title: "Grand Hotel",
    location: "New York",
    ci: "2025-11-20",
    co: "2025-11-25",
    rates: {
      night: 150,
      cur: "USD",
    },
  },
];

app.get("/flights", (req, res) => {
  setTimeout(() => {
    res.json(flights);
  }, 1000); // 1 second delay
});

app.get("/hotels", (req, res) => {
  setTimeout(() => {
    res.json(hotels);
  }, 1500); // 1.5 second delay
});

app.listen(port, () => {
  console.log(`Provider 1 listening at http://localhost:${port}`);
});
