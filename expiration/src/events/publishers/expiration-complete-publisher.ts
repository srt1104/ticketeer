import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@srt1104-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
