import { Db, MongoClient } from 'mongodb';

class MongoDbConnection {
  private static _instance: MongoDbConnection;
  private _client: MongoClient;
  private _db: Db;

  private constructor(url: string, dbName: string) {
    const client = new MongoClient(url, {
      useUnifiedTopology: true,
    });

    client
      .connect()
      .then((connectedClient) => {
        this._client = connectedClient;
        this._db = this._db = this._client.db(dbName);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        client.close();
      });
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    return new MongoDbConnection(
      process.env.MONGODB_URL ?? '',
      process.env.MONGODB_DB_NAME ?? ''
    );
  }

  isConnected() {
    return !!this._client?.isConnected();
  }

  getCollection(name: string) {
    return this._db.collection(name);
  }
}

export { MongoDbConnection };
