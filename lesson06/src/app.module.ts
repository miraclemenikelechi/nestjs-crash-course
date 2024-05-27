import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        UsersModule, DatabaseModule,
        EmployeesModule, LoggerModule,
        ThrottlerModule.forRoot([
            { name: "short", ttl: 1000, limit: 3 }, // not more than 3 requests in a second
            { name: "long", ttl: 60000, limit: 100 } // not more than 100 requests in 1 minute
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }],
})
export class AppModule { }
