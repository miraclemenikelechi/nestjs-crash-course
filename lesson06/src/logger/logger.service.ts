import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
    // async logToFile(entry) {
    //     const formattedEntry = `${Intl.DateTimeFormat('en-US', {
    //         dateStyle: 'short',
    //         timeStyle: 'short',
    //         timeZone: 'UTC',
    //     }).format(new Date())}\t${entry}\n`;

    //     try {
    //         if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
    //             await fsPromises.mkdir(path
    //                 .join(__dirname, '..', '..', 'logs', "logFile.log"),
    //                 formattedEntry
    //             );
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) console.error(error.message);
    //     }
    // }

    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'UTC',
        }).format(new Date())}\t${entry}\n`;

        const logDirectory = path.join(__dirname, '..', '..', 'logs');
        const logFile = path.join(logDirectory, "logFile.log");

        try {
            if (!fs.existsSync(logDirectory)) {
                await fsPromises.mkdir(logDirectory);
            }
            await fsPromises.appendFile(logFile, formattedEntry);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }


    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);

        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);

        super.error(message, stackOrContext);
    }
}
