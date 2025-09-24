import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AggregatorService } from './aggregator.service';
import { SearchFlightsDto } from './dto/search-flights.dto';
import { SearchHotelsDto } from './dto/search-hotels.dto';
import { Flight, Hotel, SearchResult } from 'src/common/interfaces';

@Controller('search')
export class AggregatorController {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @Get('flights')
  async searchFlights(
    @Query(new ValidationPipe({ transform: true })) query: SearchFlightsDto,
  ): Promise<SearchResult<Flight>> {
    return this.aggregatorService.searchFlights(query);
  }

  @Get('hotels')
  async searchHotels(
    @Query(new ValidationPipe({ transform: true })) query: SearchHotelsDto,
  ): Promise<SearchResult<Hotel>> {
    return this.aggregatorService.searchHotels(query);
  }
}
