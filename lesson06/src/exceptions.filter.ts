import { Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type ResponseT = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
};

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(ExceptionsFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const responseT: ResponseT = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ""
        };

        switch (true) {
            case (exception instanceof HttpException):
                responseT.response = exception.getResponse();
                responseT.statusCode = exception.getStatus();
                break;

            case (exception instanceof PrismaClientValidationError):
                responseT.response = exception.message.replaceAll(/\n/g, " ");
                responseT.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
                break;

            default:
                responseT.response = "INTERNAL_SERVER_ERROR";
                responseT.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
        }

        response.status(responseT.statusCode).json(responseT);
        this.logger.error(responseT.response, ExceptionsFilter.name);
        super.catch(exception, host);
    }
}