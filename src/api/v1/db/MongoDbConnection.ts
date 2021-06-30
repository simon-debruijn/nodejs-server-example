import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

class MongoDbConnection {
  private static _instance: MongoDbConnection;
  private _client: MongoClient;
  private _db: Db;

  private constructor(uri: string, dbName: string) {
    const client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });

    client
      .connect()
      .then((connectedClient) => {
        this._client = connectedClient;

        this._db = this._client.db(dbName);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // client.close();
      });
  }

  static getInstance = () => {
    if (!MongoDbConnection._instance) {
      MongoDbConnection._instance = new MongoDbConnection(
        `${process.env.MONGODB_URL}`,
        `${process.env.MONGODB_DB_NAME}`
      );
    }
    return MongoDbConnection._instance;
  };

  isConnected = () => {
    return !!this._client?.isConnected();
  };

  getCollection = (name: string) => {
    return this._db?.collection(name);
  };
}

export { MongoDbConnection };
