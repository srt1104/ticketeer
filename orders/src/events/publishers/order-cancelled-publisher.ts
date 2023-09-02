import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@srt1104-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
