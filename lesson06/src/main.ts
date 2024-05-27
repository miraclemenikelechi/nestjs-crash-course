import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ExceptionsFilter } from './exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true // for logs
    });

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

    app.useLogger(app.get(LoggerService)); // set up logger globally
    app.setGlobalPrefix('api'); // set up global prefix
    app.enableCors(); // for cors

    await app.listen(8000);
}
bootstrap();
