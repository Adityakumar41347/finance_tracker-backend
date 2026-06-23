import {
  IsString, IsNumber, IsDateString, IsOptional,
  IsPositive, MaxLength, IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

const INVESTMENT_TYPES = [
  'Mutual Fund', 'Stock', 'ETF', 'Bond', 'Real Estate',
  'Cryptocurrency', 'Fixed Deposit', 'Gold', 'Other',
];

export class CreateInvestmentDto {
  @IsString()
  @MaxLength(200)
  investmentName: string;

  @IsString()
  @IsIn(INVESTMENT_TYPES, {
    message: `investmentType must be one of: ${INVESTMENT_TYPES.join(', ')}`,
  })
  investmentType: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  investedAmount: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  currentValue: number;

  @IsDateString()
  purchaseDate: string;
}

export class UpdateInvestmentDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  investmentName?: string;

  @IsOptional()
  @IsString()
  @IsIn(INVESTMENT_TYPES, {
    message: `investmentType must be one of: ${INVESTMENT_TYPES.join(', ')}`,
  })
  investmentType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  investedAmount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  currentValue?: number;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;
}

export class QueryInvestmentDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
