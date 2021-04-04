import { NatsSubjects } from './NatsSubjects'

export interface EventProductUpdated {
   subject: NatsSubjects.ProductUpdated,
   data: {
      id: string,
      title: string,
      price: number,
      authorId: string,
      description: string,
   }
}