import { DomainEventClass, DomainEvent } from "@juandardilag/ddd-domain-layer";

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;
  on(domainEvent: T): Promise<void>;
}
