// src/providers/provider1.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  Flight,
  Hotel,
  Provider1FlightResponse,
  Provider1HotelResponse,
} from '../common/interfaces';

@Injectable()
export class Provider1Service {
  private readonly baseUrl = 'http://provider-1:4001';

  constructor(private readonly httpService: HttpService) {}

  async getFlights(query: {
    from: string;
    to: string;
    date: string;
  }): Promise<Flight[]> {
    const url = `${this.baseUrl}/flights`;
    const params = {
      from: query.from,
      to: query.to,
      date: query.date,
    };

    const response = await firstValueFrom(
      this.httpService.get<Provider1FlightResponse[]>(url, { params }),
    );

    const flights = this.mapFlightsResponse(response.data || []);

    return flights;
  }

  async getHotels(query: {
    city: string;
    checkIn: string;
    checkOut: string;
  }): Promise<Hotel[]> {
    const url = `${this.baseUrl}/hotels`;
    const params = {
      city: query.city,
      checkIn: query.checkIn,
      checkOut: query.checkOut,
    };

    const response = await firstValueFrom(
      this.httpService.get<Provider1HotelResponse[]>(url, { params }),
    );

    const hotels = this.mapHotelsResponse(response.data || []);

    return hotels;
  }

  sayHello(): string {
    return 'Hello from Provider 1';
  }

  private mapFlightsResponse(responses: Provider1FlightResponse[]): Flight[] {
    return responses.map((flight) => ({
      provider: 'provider1',
      id: flight.flightId,
      from: flight.origin,
      to: flight.dest,
      departAt: flight.dep,
      arriveAt: flight.arr,
      price: Number(flight.fare.amount),
      currency: flight.fare.cur,
    }));
  }

  private mapHotelsResponse(responses: Provider1HotelResponse[]): Hotel[] {
    return responses.map((hotel) => ({
      provider: 'provider1',
      id: hotel.id,
      name: hotel.title,
      city: hotel.location,
      checkIn: hotel.ci,
      checkOut: hotel.co,
      pricePerNight: Number(hotel.rates.night),
      currency: hotel.rates.cur,
    }));
  }
}
