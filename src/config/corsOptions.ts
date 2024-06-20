export const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Frontend URLs
    methods: 'GET,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  