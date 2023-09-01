import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/orders", async (req: Request, res: Response) => {
  res.send("create-orders");
});

export { router as createOrderRouter };
