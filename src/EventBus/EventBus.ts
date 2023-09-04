import { DomainEvent } from "@juandardilag/ddd-domain-layer";
import { DomainEventSubscriber } from "./DomainEventSubscriber";

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
}
