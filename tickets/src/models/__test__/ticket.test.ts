import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 20 });

  // Save the first fetched ticket
  await firstInstance?.save();

  // Save the second fetched ticket and expect an error
  await expect(secondInstance?.save()).rejects.toThrow();
});

it("increments the `versionKey` on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.__v).toEqual(0);

  // save or update, indifferent in this case
  await ticket.save();
  expect(ticket.__v).toEqual(1);

  // save or update, indifferent in this case
  await ticket.save();
  expect(ticket.__v).toEqual(2);
});
