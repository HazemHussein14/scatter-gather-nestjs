import { Injectable } from '@nestjs/common';
import {
  Flight,
  Hotel,
  Provider2FlightResponse,
  Provider2HotelResponse,
} from '../common/interfaces';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Provider2Service {
  private readonly baseUrl = "http://provider-2:4002"
  
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
      date: query.date
    }
    const data = await firstValueFrom(
      this.httpService.get<Provider2FlightResponse[]>(url, {params}),
    );

    return (data.data ?? []).map((f) => ({
      provider: 'provider2',
      id: f.id,
      from: f.route.from,
      to: f.route.to,
      departAt: f.times.depart,
      arriveAt: f.times.arrive,
      price: Number(f.price_usd),
      currency: 'USD',
    }));
  }

  async getHotels(query: {
    city: string;
    checkIn: string;
    checkOut: string;
  }): Promise<Hotel[]> {
    const url = `${this.baseUrl}/hotels?`;
    const params = {
      city: query.city,
      checkIn: query.checkIn,
      checkOut: query.checkOut
    }
    const data = await firstValueFrom(
      this.httpService.get<Provider2HotelResponse[]>(url, {params}),
    );

    return (data.data ?? []).map((h) => ({
      provider: 'provider2',
      id: h.uid,
      name: h.name,
      city: h.place,
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      pricePerNight: Number(h.price),
      currency: 'USD',
    }));
  }
}
