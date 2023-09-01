import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@srt1104-tickets/common";

import { createOrderRouter } from "./routes/create-order";
import { getOrderRouter } from "./routes/get-order";
import { getOrdersRouter } from "./routes/get-orders";
import { deleteOrderRouter } from "./routes/delete-order";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
// must come after cookie-session middleware,
// as `currentUser` requires `req.session` set by cookie-session to run
app.use(currentUser);

app.use(createOrderRouter);
app.use(getOrderRouter);
app.use(getOrdersRouter);
app.use(deleteOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
