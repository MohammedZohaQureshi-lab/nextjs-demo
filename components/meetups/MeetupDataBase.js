

import { MongoClient } from 'mongodb';

export const meetupDataBase = async () => {
    const client = await MongoClient.connect('mongodb+srv://zqureshi:Zoha12345@cluster0.q7oby7k.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    return meetupsCollection;
}