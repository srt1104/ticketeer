import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
    __v: number;
    status: OrderStatus;
  };
}
