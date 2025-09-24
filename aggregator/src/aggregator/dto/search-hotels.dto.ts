/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class SearchHotelsDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;
}
