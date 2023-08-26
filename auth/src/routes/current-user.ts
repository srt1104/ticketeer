import express from "express";
import { currentUser } from "@srt1104-tickets/common";

const router = express.Router();

router.get("/api/users/current-user", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
