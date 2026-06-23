import {
  Injectable, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Investment } from './investment.entity';
import { CreateInvestmentDto, UpdateInvestmentDto, QueryInvestmentDto } from './investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private readonly repo: Repository<Investment>,
  ) {}

  async create(userId: string, dto: CreateInvestmentDto): Promise<Investment> {
    const investment = this.repo.create({ ...dto, userId });
    return this.repo.save(investment);
  }

  async findAll(userId: string, query: QueryInvestmentDto) {
    const { type, search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (type) where.investmentType = type;
    if (search) where.investmentName = ILike(`%${search}%`);

    const [data, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(userId: string, id: string): Promise<Investment> {
    const investment = await this.repo.findOne({ where: { id } });
    if (!investment) throw new NotFoundException('Investment not found');
    if (investment.userId !== userId) throw new ForbiddenException('Access denied');
    return investment;
  }

  async update(userId: string, id: string, dto: UpdateInvestmentDto): Promise<Investment> {
    const investment = await this.findOne(userId, id);
    Object.assign(investment, dto);
    return this.repo.save(investment);
  }

  async remove(userId: string, id: string): Promise<void> {
    const investment = await this.findOne(userId, id);
    await this.repo.remove(investment);
  }

  async getSummaryData(userId: string) {
    const investments = await this.repo.find({ where: { userId } });
    return investments;
  }
}
