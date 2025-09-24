// src/aggregator/aggregator.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Provider1Service } from '../providers/provider1.service';
import { Provider2Service } from '../providers/provider2.service';
import { Flight, Hotel } from '../common/interfaces';
import { SearchFlightsDto } from './dto/search-flights.dto';
import { SearchHotelsDto } from './dto/search-hotels.dto';

interface ProviderCall<T> {
  name: string;
  call: Promise<T[]>;
}

interface SearchResult<T> {
  data: T[];
  errors: Array<{ provider: string; error: string }>;
}

@Injectable()
export class AggregatorService {
  private readonly logger = new Logger(AggregatorService.name);

  constructor(
    private readonly provider1Service: Provider1Service,
    private readonly provider2Service: Provider2Service,
  ) {}

  async searchFlights(query: SearchFlightsDto): Promise<SearchResult<Flight>> {
    const providerCalls: ProviderCall<Flight>[] = [
      {
        name: 'provider1',
        call: this.provider1Service.getFlights(query),
      },
      {
        name: 'provider2',
        call: this.provider2Service.getFlights(query),
      },
    ];

    return this.executeProviderCalls(providerCalls);
  }

  async searchHotels(query: SearchHotelsDto): Promise<SearchResult<Hotel>> {
    const providerCalls: ProviderCall<Hotel>[] = [
      {
        name: 'provider1',
        call: this.provider1Service.getHotels(query),
      },
      {
        name: 'provider2',
        call: this.provider2Service.getHotels(query),
      },
    ];

    return this.executeProviderCalls(providerCalls);
  }

  private async executeProviderCalls<T>(
    providerCalls: ProviderCall<T>[],
  ): Promise<SearchResult<T>> {
    const results = await Promise.allSettled(
      providerCalls.map((call) => call.call),
    );

    const data: T[] = [];
    const errors: Array<{ provider: string; error: string }> = [];

    results.forEach((result, index) => {
      const providerName = providerCalls[index].name;

      if (result.status === 'fulfilled') {
        // Ensure result.value is an array and flatten i
        const resultData = Array.isArray(result.value) ? result.value : [];
        data.push(...resultData);
      } else {
        const errorMessage =
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason);

        this.logger.error(
          `Provider ${providerName} failed: ${errorMessage}`,
          result.reason instanceof Error ? result.reason.stack : undefined,
        );

        errors.push({
          provider: providerName,
          error: errorMessage,
        });
      }
    });

    this.logger.log(
      `Search completed: ${data.length} items found, ${errors.length} provider errors`,
    );

    return { data, errors };
  }
}
