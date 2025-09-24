export interface BookingComHotelResponse {
  hotelId: string;
  hotelTitle: string;
  cityLocation: string;
  checkInDate: string;
  checkOutDate: string;
  rateInformation: {
    pricePerNight: string | number;
    currencyCode: string;
  };
}

export interface ExpediaHotelResponse {
  uniqueHotelId: string;
  hotelName: string;
  locationCity: string;
  dailyRateUsd: string | number;
}

export interface BookingComHotelResponse {
  hotelId: string;
  hotelTitle: string;
  cityLocation: string;
  checkInDate: string;
  checkOutDate: string;
  rateInformation: {
    pricePerNight: string | number;
    currencyCode: string;
  };
}

export interface ExpediaHotelResponse {
  uniqueHotelId: string;
  hotelName: string;
  locationCity: string;
  dailyRateUsd: string | number;
}
