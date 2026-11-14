import 'dotenv/config';import {database} from './db.js';import {catalog} from './catalog.js';
const db=await database();for(const p of catalog){await db.collection('products').updateOne({slug:p.slug},{$setOnInsert:p},{upsert:true});}console.log('Seeded catalog (existing products unchanged).');process.exit(0);
