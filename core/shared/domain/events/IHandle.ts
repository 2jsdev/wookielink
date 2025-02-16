import { IDomainEvent } from './IDomainEvent';

export interface IHandle<T extends IDomainEvent> {
  setupSubscriptions(event: T): Promise<void>;
}
