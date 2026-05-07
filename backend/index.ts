import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://advanced-mern-auth.up.railway.app',
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(DIRNAME,"/frontend/dist")));
app.use("/",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "frontend","dist","index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});

