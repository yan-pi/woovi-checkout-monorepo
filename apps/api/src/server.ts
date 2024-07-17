import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { testConnections } from "./services/prisma-service";
import paymentRouter from "./routes/payment-route";

export const createServer = (): Express => {
  const app = express();
  testConnections();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/payments", paymentRouter)
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
