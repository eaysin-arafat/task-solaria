export const calculatePolygonArea = (points: string): number => {
  const coordinates = points.trim().split(" ").map(Number);
  if (coordinates.length < 6) return 0;

  const pointArray = [];
  for (let i = 0; i < coordinates.length; i += 2) {
    const x = coordinates[i];
    const y = coordinates[i + 1];
    if (isNaN(x) || isNaN(y)) return 0;
    pointArray.push({ x, y });
  }

  let area = 0;
  const n = pointArray.length;
  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = pointArray[i];
    const { x: x2, y: y2 } = pointArray[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }

  return Math.abs(area / 2);
};
