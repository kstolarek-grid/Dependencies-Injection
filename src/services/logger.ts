export interface ILogger {
  info: (message: string) => void;
  error: (message: string) => void;
}

export class Logger implements ILogger {
  info(message: string) {
    const date = new Date().toISOString();

    console.log('[INFO]', `[${date}]`, message);
  }

  error(message: string) {
    const date = new Date().toISOString();

    console.error('[ERROR]', `[${date}]`, message);
  }
}