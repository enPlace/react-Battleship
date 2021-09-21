import { render, screen } from "@testing-library/react";
import App from "./App";
import ship from "./Game-Modules/ship";
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("ship array creation", () => {
  expect(ship(2).shipArray).toStrictEqual([true, true]);
  expect(ship(3).shipArray).toStrictEqual([true, true, true]);
  expect(ship(4).shipArray).toStrictEqual([true, true, true, true]);
  expect(ship(5).shipArray).toStrictEqual([true, true, true, true, true]);
});

test('hit position on a ship, sink ship value',()=>{
  const s3 = ship(3)
  s3.hitPosition(2)
  expect(s3.shipArray).toStrictEqual([true, true, false]);
  s3.hitPosition(1)
  expect(s3.shipArray).toStrictEqual([true, false, false])
  s3.hitPosition(0)
  expect(s3.shipArray).toStrictEqual([false, false, false])
  expect(s3.isSunk).toBeTruthy()
})

test('ship name assignment', ()=>{
  const s3 = ship(3, "name")
  expect(s3.name).toBe("name")
})

