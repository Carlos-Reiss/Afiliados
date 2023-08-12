import cors from "cors";
import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

routes(app);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Running in port: ${port}`);
});
