const app = require("../../index");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/herrahiphop",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("GET /api/articles", async () => {
    await supertest(app).get("/api/articles")
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([])
});

test('POST /api/articles', async () => {
    await supertest(app)
        .post('/api/articles')
        .send({title: "New Article"})
        .expect(200);
});