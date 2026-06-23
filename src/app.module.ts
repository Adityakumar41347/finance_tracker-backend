import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvestmentsModule } from './investments/investments.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { User } from './users/user.entity';
import { Investment } from './investments/investment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DATABASE_HOST') as string,
        port: parseInt(config.get<string>('DATABASE_PORT') as string, 10),
        username: config.get<string>('DATABASE_USERNAME') as string,
        password: config.get<string>('DATABASE_PASSWORD') as string,
        database: config.get<string>('DATABASE_NAME') as string,
        entities: [User, Investment],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    InvestmentsModule,
    PortfolioModule,
  ],
})
export class AppModule {}
