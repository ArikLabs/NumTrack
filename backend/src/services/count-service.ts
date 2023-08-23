import cron from 'node-cron';
import { createClient } from 'redis';
import { Counter } from '../models/Counter';

const redisClient = createClient({ url: 'redis://redis:6379' });

redisClient.on('error', (error) => {
  console.error('Redis error', { error });
});

type store = { user: string; operation: string; totalCount: number };

class CountService {
  private storage = redisClient;

  public async init() {
    await this.storage.connect();

    cron.schedule('*/ * * * *', async () => {
      await this.dumpStorage();
    });
  }

  public async getCount(): Promise<number> {
    const store = await this.storage.lIndex('count', -1);

    if (!store) return 0;
    return JSON.parse(store).totalCount;
  }

  public async changeCount(user: string, operation: string): Promise<void> {
    const prevCount = await this.getCount();
    const newCount = operation === '-' ? prevCount - 1 : prevCount + 1;

    await this.storage.rPush(
      'count',
      JSON.stringify({
        user,
        operation,
        totalCount: newCount,
      }),
    );
  }

  public async getAllRecords(): Promise<store[]> {
    const records = await this.storage.lRange('count', 0, -1);
    return records.map((record) => JSON.parse(record));
  }

  private async dumpStorage(): Promise<void> {
    try {
      const count = await this.getCount();
      if (count === 0) return;
      await Counter.create({ count: count });
      await this.storage.DEL('count');
    } catch (error) {
      console.warn('Failed to dump storage', { error });
    }
  }
}

export default new CountService();
