import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("cannot be accessed if the user is not signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("can only be accessed if the user is signed in", async () => {
  const cookie = signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const cookie = signin();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = signin();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "valid",
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "valid",
      price: -10,
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  const title = "valid";
  const price = 25;

  const ticketsBefore = await Ticket.find({});
  expect(ticketsBefore.length).toEqual(0);

  const cookie = signin();
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  const ticketsAfter = await Ticket.find({});
  expect(ticketsAfter.length).toEqual(1);

  const [ticket] = ticketsAfter;
  expect(ticket.title).toEqual(title);
  expect(ticket.price).toEqual(price);
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "valid", price: 25 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
