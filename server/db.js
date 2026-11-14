import {MongoClient} from 'mongodb';
let client, db;
export async function database(){if(db)return db;if(!process.env.MONGODB_URI)throw new Error('MONGODB_URI is required');client=new MongoClient(process.env.MONGODB_URI,{maxPoolSize:10});await client.connect();db=client.db(process.env.MONGODB_DB||'tasty_treasures');await Promise.all([db.collection('products').createIndex({slug:1},{unique:true}),db.collection('orders').createIndex({createdAt:-1}),db.collection('orders').createIndex({razorpayOrderId:1},{unique:true,sparse:true})]);return db;}
