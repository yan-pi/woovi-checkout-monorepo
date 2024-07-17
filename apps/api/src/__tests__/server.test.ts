import request from "supertest";
import { createServer } from "../server";
import { PrismaClient } from "@prisma/client";

const app = createServer();
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Server", () => {
  it("should create a installment payment", async () => {
    const res = await request(app)
      .post("/payments/payment")
      .send({
        name: "Test User",
        amount: 100,
        paymentMethod: "installments",
        installments: 2,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("slug");
    expect(res.body.totalAmount).toBe(103);
    expect(res.body.installments).toStrictEqual(["51.50", "51.50"]);
  });

  it("should create a upfront payment", async () => {
    const res = await request(app)
      .post("/payments/payment")
      .send({
        name: "Test User",
        amount: 1000,
        paymentMethod: "upfront",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("slug");
    expect(res.body.totalAmount).toBe(1000);
  });

  // it("should return payment details by slug", async () => {
  //   const payment = await prisma.payment.create({
  //     data: {
  //       amount: 200,
  //       name: "Test Payment",
  //       installments: 1,
  //       paymentMethod: "upfront",
  //       paymentStatus: "pending",
  //       slug: "test-slug",
  //     },
  //   });

  //   const res = await request(app).get(`/payments/payment/${payment.slug}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body.slug).toBe(payment.slug);
  //   expect(res.body.amount).toBe(payment.amount);
  // });

  it("should return status ok", async () => {
    const res = await request(app).get("/status");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
