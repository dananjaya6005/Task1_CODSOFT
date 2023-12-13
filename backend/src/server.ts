import express, { Request, Response } from 'express';
import blog from './routes/blog';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/blog', blog);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));


