import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@srt1104-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
