// V2, memoria técnica, tablas A2–A4. Cantidades monetarias en USD.
export function fixedDebtRatio(stockBillions, gdpBillions) {
  if (!Number.isFinite(stockBillions) || stockBillions < 0 || !Number.isFinite(gdpBillions) || gdpBillions <= 0) throw new RangeError('Magnitudes fuera de dominio');
  return stockBillions / gdpBillions * 100;
}
export function annualGrossChange(soldBarrelsPerDay, priceDelta) {
  if (!Number.isFinite(soldBarrelsPerDay) || soldBarrelsPerDay < 0 || !Number.isFinite(priceDelta)) throw new RangeError('Supuestos fuera de dominio');
  return soldBarrelsPerDay * 365 * priceDelta / 1e6;
}
export function fiscalMargin(brent, threshold) {
  return brent - threshold;
}
