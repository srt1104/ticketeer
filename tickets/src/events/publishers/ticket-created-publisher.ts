import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@srt1104-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
