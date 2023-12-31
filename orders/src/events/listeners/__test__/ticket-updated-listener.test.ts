import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@srt1104-tickets/common";

import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 100,
  });
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    title: "new concert",
    price: 200,
    userId: new mongoose.Types.ObjectId().toHexString(),
    __v: ticket.__v + 1,
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("finds, updates, and saves a ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.__v).toEqual(data.__v);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has skipped the `versionKey`", async () => {
  const { listener, data, msg } = await setup();

  // make the event skip the `versionKey` by 1
  data.__v = data.__v + 1;

  await expect(listener.onMessage(data, msg)).rejects.toThrow();
  expect(msg.ack).not.toHaveBeenCalled();
});
