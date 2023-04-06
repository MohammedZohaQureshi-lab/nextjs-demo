import { MongoClient } from 'mongodb';
const handler = async (req, res) => {
    console.log(req.method);

    if (req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://zqureshi:Zoha12345@cluster0.q7oby7k.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result)
        client.close();
        res.status(201).json({ message: "Response Inserted" })
    }
}

export default handler