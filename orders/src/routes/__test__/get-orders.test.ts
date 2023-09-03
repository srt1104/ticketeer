import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async ({
  id,
  title,
  price,
}: {
  id: string;
  title: string;
  price: number;
}) => {
  const ticket = Ticket.build({ id, title, price });
  await ticket.save();

  return ticket;
};

it("fetches orders for a particular user", async () => {
  // Create three tickets
  const ticketOne = await buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert 1",
    price: 100,
  });
  const ticketTwo = await buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert 2",
    price: 200,
  });
  const ticketThree = await buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert 3",
    price: 300,
  });

  // Create one order as User #1
  const userOneCookie = signin();
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOneCookie)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as User #2
  const userTwoCookie = signin();
  const orderResponseTwo = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookie)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const orderResponseThree = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookie)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwoCookie)
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderResponseTwo.body.id);
  expect(response.body[1].id).toEqual(orderResponseThree.body.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
