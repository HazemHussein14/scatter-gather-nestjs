export interface Provider1FlightResponse {
  flightId: string;
  origin: string;
  dest: string;
  dep: string;
  arr: string;
  fare: {
    amount: string | number;
    cur: string;
  };
}

export interface Provider1HotelResponse {
  id: string;
  title: string;
  location: string;
  ci: string;
  co: string;
  rates: {
    night: string | number;
    cur: string;
  };
}

export interface Provider2FlightResponse {
  id: string;
  route: {
    from: string;
    to: string;
  };
  times: {
    depart: string;
    arrive: string;
  };
  price_usd: string | number;
}

export interface Provider2HotelResponse {
  uid: string;
  name: string;
  place: string;
  price: string | number;
}
