import { NatsSubjects } from '../types/NatsSubjects'

export interface EventProductUpdated {
   subject: NatsSubjects.ProductUpdated,
   data: {
      id: string,
      title: string,
      price: number,
      version: number, 
      quantity?: number,
      placeholder:string;
      isQuantityRestricted: boolean
   }
}