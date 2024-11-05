import { PolygonData } from "../App";

export const getUniqueStatuses = (data: PolygonData[]) => {
  const statuses = new Set<string>();
  data.forEach((polygon) => {
    statuses.add(polygon.status);
  });
  return Array.from(statuses).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }));
};
