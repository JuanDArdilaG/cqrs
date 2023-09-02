import { DomainEvent } from "@juandardilag/ddd-domain-layer";
import { DomainEventSubscriber } from "../DomainEventSubscriber";
import { EventBus } from "../EventBus";
import { EventEmitterBus } from "./EventEmitterBus";

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }
}
