import express from 'express';
import dotenv from 'dotenv';
import { syncModels } from './models/sync';
import clientRoutes from './routes/client.routes';


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api",clientRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

( async () => {
    await syncModels();
    console.log("✅ Database is ready!");
    app.listen(port, () => {    
        console.log(`Server is running on http://localhost:${port}`);
      });
})();
