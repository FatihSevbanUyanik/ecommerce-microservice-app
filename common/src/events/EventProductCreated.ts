import { NatsSubjects } from './NatsSubjects'

export interface EventProductCreated {
   subject: NatsSubjects.ProductCreated,
   data: {
      id: string,
      title: string,
      price: number,
      authorId: string,
      description: string,
   }
}