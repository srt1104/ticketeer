import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@srt1104-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
