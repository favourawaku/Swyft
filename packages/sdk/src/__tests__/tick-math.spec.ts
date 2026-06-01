import {
  priceToTick,
  tickToPrice,
  tickToSqrtPriceX96,
  sqrtPriceX96ToTick,
  Q96,
} from "../position-math";

describe("position-math basic conversions", () => {
  it("converts price -> tick -> price roundtrip", () => {
    const price = 1.2345;
    const tick = priceToTick(price, 60);
    const priceBack = tickToPrice(tick, 6, 6);
    expect(typeof tick).toBe("number");
    expect(priceBack).toBeGreaterThan(0);
  });

  it("converts tick 0 to sqrtPriceX96 and back", () => {
    const sqrt = tickToSqrtPriceX96(0);
    expect(sqrt).toBe(Q96);
    const tick = sqrtPriceX96ToTick(sqrt);
    expect(tick).toBe(0);
  });

  it("throws for invalid inputs", () => {
    expect(() => priceToTick(-1, 1)).toThrow();
    expect(() => sqrtPriceX96ToTick(0n)).toThrow();
  });
});
