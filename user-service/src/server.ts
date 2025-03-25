import express from 'express';
import dotenv from 'dotenv';
import { syncModels } from './models/sync';


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

( async ()=>{
    await syncModels();
    console.log("✅ Database is ready!");
    app.listen(port, () => {    
        console.log(`Server is running on http://localhost:${port}`);
      });
})();
