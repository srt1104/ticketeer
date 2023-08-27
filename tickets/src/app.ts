import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@srt1104-tickets/common";

import { createTicketRouter } from "./routes/create-ticket";
import { getTicketRouter } from "./routes/get-ticket";
import { getTicketsRouter } from "./routes/get-tickets";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
// must come after cookie-session middleware,
// as `currentUser` requires `req.session` set by cookie-session to run
app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
