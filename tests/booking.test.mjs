import test from "node:test";
import assert from "node:assert/strict";
import { estimateStay } from "../lib/booking.mjs";
const d = (s) => new Date(`${s}T12:00:00`);
test("weekday room and 50% deposit", () =>
  assert.deepEqual(estimateStay(d("2026-10-05"), d("2026-10-07")), {
    total: 300,
    deposit: 150,
    nights: 2,
    hasSaturday: false,
  }));
test("Friday rate does not charge Saturday checkout", () =>
  assert.equal(estimateStay(d("2026-10-09"), d("2026-10-10")).total, 200));
test("Saturday room nights require the whole property", () =>
  assert.ok(estimateStay(d("2026-10-09"), d("2026-10-11")).error));
test("whole property Friday, Saturday, Sunday total", () =>
  assert.equal(
    estimateStay(d("2026-10-09"), d("2026-10-12"), true).total,
    5200,
  ));
test("holiday rates override weekday room rate", () =>
  assert.equal(
    estimateStay(d("2026-10-05"), d("2026-10-07"), false, true).total,
    500,
  ));
test("whole property holiday rate", () =>
  assert.equal(
    estimateStay(d("2026-10-05"), d("2026-10-07"), true, true).total,
    4000,
  ));
test("holiday room cannot bypass Saturday rule", () =>
  assert.ok(estimateStay(d("2026-10-10"), d("2026-10-11"), false, true).error));
test("missing and invalid ranges produce no quote", () => {
  assert.ok(estimateStay().error);
  assert.ok(estimateStay(d("2026-10-10"), d("2026-10-10")).error);
  assert.ok(estimateStay(d("2026-10-11"), d("2026-10-10")).error);
});
test("month boundaries charge each night", () =>
  assert.equal(
    estimateStay(d("2026-10-30"), d("2026-11-02"), true).total,
    5200,
  ));
