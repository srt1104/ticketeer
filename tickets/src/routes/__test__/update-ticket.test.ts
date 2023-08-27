import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "valid", price: 20 })
    .expect(401);
});

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = signin();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({ title: "valid", price: 20 })
    .expect(404);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const firstUserCookie = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", firstUserCookie)
    .send({ title: "valid", price: 20 })
    .expect(201);

  const secondUserCookie = signin();
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", secondUserCookie)
    .send({
      title: "updated valid title",
      price: 100,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "valid", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ price: 100 })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 100 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid updated title" })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid updated title", price: -10 })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "valid", price: 20 })
    .expect(201);

  const updatedTitle = "valid updated title";
  const updatedPrice = 100;
  const updatedResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: updatedTitle, price: updatedPrice })
    .expect(200);

  expect(updatedResponse.body.title).toEqual(updatedTitle);
  expect(updatedResponse.body.price).toEqual(updatedPrice);
});
