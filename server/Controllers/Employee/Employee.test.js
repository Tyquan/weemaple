const app = require("../../index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const EmployeeApi = require('./Employee');

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

test("GET /api/employees", async () => {
    await supertest(app).get("/api/employees")
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([])
});

