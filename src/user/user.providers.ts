import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => {
      return connection.model('User', UserSchema);
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
