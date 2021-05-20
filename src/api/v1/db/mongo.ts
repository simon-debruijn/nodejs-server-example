import { Collection, Db, MongoClient } from 'mongodb';

class MongoDbConnection {
  private static _db: Db;

  static initialize = async (url: string, dbName: string) => {
    const client: MongoClient = new MongoClient(url, {
      useUnifiedTopology: true,
    });

    try {
      const connectedClient = await client.connect();
      MongoDbConnection._db = connectedClient.db(dbName);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      await client.close();
    }
  };

  static getCollection = async (name: string): Promise<Collection> => {
    let collection = MongoDbConnection._db?.collection(name);

    if (!collection) {
      collection = await MongoDbConnection._db?.createCollection('users');
    }
    return collection;
  };
}

const initializeMongoDb = async () => {
  await MongoDbConnection.initialize(
    process.env.MONGODB_URL ?? '',
    process.env.MONGODB_DB_NAME ?? ''
  );
};

export { MongoDbConnection, initializeMongoDb };