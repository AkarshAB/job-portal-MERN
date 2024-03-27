const express = require('express')
const cors = require('cors')
require('dotenv').config()
console.log(process.env.DB_USER)

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// username: akarshab361
// password: 12345


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2jmhavb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create DB
    const db = client.db("mernJobPortal")
    const JobsCollections = db.collection('jobs')


    // post a job
    app.post('/post-job', async (req, res) => {
      const body = req.body;
      body.createAt = new Date()
      // console.log(body)
      const result = await JobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result)
      }
      else {
        return res.status(404).send({
          message: 'Cannot insert. Try again later',
          status: false
        })
      }
    })

    // get all jobs
    app.get('/all-jobs', async (req, res) => {
      const jobs = await JobsCollections.find({}).toArray()
      res.send(jobs);
    })

    // get single job using id
    app.get('/all-jobs/:id', async (req, res) => {
      const id = req.params.id
      const job = await JobsCollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job)
    })

    // get jobs by email
    app.get('/my-jobs/:email', async (req, res) => {
      // console.log(req.params.email)
      const jobs = await JobsCollections.find({ postedBy: req.params.email }).toArray()
      res.send(jobs)
    })

    // delete jobs
    app.delete('/job/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const result = await JobsCollections.deleteOne(filter)
      res.send(result)
    })

    // update a job
    app.patch('/update-job/:id', async (req, res) => {
      const id = req.params.id;
      const jobData = req.body
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          ...jobData
        }
      }
      const result = await JobsCollections.updateOne(filter, updateDoc, options)
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
})