import { initDB, seedDB } from '../services/api';

const setupDB = async () => {
  const db = await initDB();
  await seedDB(db);
}

setupDB();
