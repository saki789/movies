export interface IDBSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }
  
  export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV;
  
    return {
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10),
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
    };
  };
  