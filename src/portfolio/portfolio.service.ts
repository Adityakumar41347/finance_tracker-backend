import { Injectable } from '@nestjs/common';
import { InvestmentsService } from '../investments/investments.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly investmentsService: InvestmentsService) {}

  async getSummary(userId: string) {
    const investments = await this.investmentsService.getSummaryData(userId);

    const totalInvested = investments.reduce(
      (sum, inv) => sum + Number(inv.investedAmount), 0,
    );
    const currentValue = investments.reduce(
      (sum, inv) => sum + Number(inv.currentValue), 0,
    );
    const profit = currentValue - totalInvested;
    const profitPercentage =
      totalInvested > 0
        ? parseFloat(((profit / totalInvested) * 100).toFixed(2))
        : 0;

    // breakdown by type
    const byType: Record<string, { invested: number; current: number; count: number }> = {};
    for (const inv of investments) {
      if (!byType[inv.investmentType]) {
        byType[inv.investmentType] = { invested: 0, current: 0, count: 0 };
      }
      byType[inv.investmentType].invested += Number(inv.investedAmount);
      byType[inv.investmentType].current += Number(inv.currentValue);
      byType[inv.investmentType].count += 1;
    }

    const breakdown = Object.entries(byType).map(([type, data]) => ({
      type,
      investedAmount: parseFloat(data.invested.toFixed(2)),
      currentValue: parseFloat(data.current.toFixed(2)),
      profit: parseFloat((data.current - data.invested).toFixed(2)),
      profitPercentage:
        data.invested > 0
          ? parseFloat((((data.current - data.invested) / data.invested) * 100).toFixed(2))
          : 0,
      count: data.count,
    }));

    return {
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      profitPercentage,
      totalInvestments: investments.length,
      breakdown,
    };
  }
}
