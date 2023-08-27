import request from "supertest";

import { app } from "../../app";

const createTicket = async ({
  title,
  price,
}: {
  title: string;
  price: number;
}) => {
  const cookie = signin();

  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price });
};

it("can fetch a list of tickets", async () => {
  await createTicket({ title: "valid title 1", price: 10 });
  await createTicket({ title: "valid title 2", price: 20 });
  await createTicket({ title: "valid title 3", price: 30 });

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});
