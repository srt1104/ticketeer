import {
  Subjects,
  Publisher,
  OrderCreatedEvent,
} from "@srt1104-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
