import { Connection } from 'mongoose';
import { AdvertisementSchema } from './advertisement.schema';

export const advertisementProviders = [
  {
    provide: 'ADVERTISEMENT_MODEL',
    useFactory: (connection: Connection) => {
      return connection.model('Advertisement', AdvertisementSchema);
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
