import request from "supertest";
import { createServer } from "../server";
import { PrismaClient } from "@prisma/client";
import WebSocket from "ws";

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
    const mockPayment = {
      name: "Test User",
      amount: 100,
      paymentMethod: "installments",
      installments: 2,
      paymentStatus: "pending", // Use string value as defined in your Prisma model
      slug: "test-slug-installments",
    };

    const res = await request(app)
      .post("/payments/payment")
      .send(mockPayment);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("slug");
    expect(res.body.totalAmount).toBe(103);
    expect(res.body.installments).toStrictEqual(["51.50", "51.50"]);
  });

  it("should create an upfront payment", async () => {
    const mockPayment = {
      name: "Test User",
      amount: 1000,
      paymentMethod: "upfront",
      paymentStatus: "pending", // Use string value as defined in your Prisma model
      slug: "test-slug-upfront",
    };

    const res = await request(app)
      .post("/payments/payment")
      .send(mockPayment);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("slug");
    expect(res.body.totalAmount).toBe(1000);
  });

  // it("should receive WebSocket message on payment completion", (done) => {
  //   const mockPayment = {
  //     name: "Test User",
  //     amount: 200,
  //     paymentMethod: "upfront",
  //     installments: 1,
  //     paymentStatus: "pending",
  //     slug: "test-slug-websocket",
  //   };

  //   const ws = new WebSocket(`ws://localhost:3001/payments/payment/${mockPayment.slug}`);

  //   ws.on("message", (data) => {
  //     const message = JSON.parse(data.toString());
  //     expect(message).toHaveProperty("slug", mockPayment.slug);
  //     expect(message).toHaveProperty("paymentStatus", "completed");
  //     done();
  //   });
  //   ws.close(); // Fechar a conexão WebSocket após receber a mensagem esperada
    
  //   // Simular a conclusão do pagamento após um atraso (comportamento simulado)
  //   setTimeout(async () => {
  //     await prisma.payment.update({
  //       where: { slug: mockPayment.slug },
  //       data: { paymentStatus: "completed" },
  //     });
  //   }, 500); // Ajustar o tempo conforme necessário com base no comportamento da sua aplicação
  // });

  // it("should return payment details by slug", async () => {
  //   const mockPayment = {
  //     name: "Test Payment",
  //     amount: 300,
  //     paymentMethod: "upfront",
  //     installments: 1, // Ensure installments are included
  //     paymentStatus: "pending", // Use string value as defined in your Prisma model
  //     slug: "test-slug-details",
  //   };

  //   await prisma.payment.create({
  //     data: mockPayment,
  //   });

  //   const res = await request(app).get(`/payments/payment/${mockPayment.slug}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body.slug).toBe(mockPayment.slug);
  //   expect(res.body.amount).toBe(mockPayment.amount);
  // });

  it("should return status ok", async () => {
    const res = await request(app).get("/status");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
