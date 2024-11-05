import { useCallback, useEffect, useRef, useState } from "react";
import data from "../assets/data.json";
import { calculatePolygonArea } from "../utils/calculate-polygon-area";
import { getUniqueStatuses } from "../utils/get-unique-statuses";

export interface PolygonData {
  code: number;
  status: string;
  price: number;
  area?: number;
}

export interface Filters {
  selectedStatus: string | null;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

const usePolygon = () => {
  const prices = data.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const initialFilters: Filters = {
    selectedStatus: null,
    minPrice,
    maxPrice,
    minArea: 0,
    maxArea: 0,
  };

  const [filters, setFilters] = useState<Filters>({ ...initialFilters });
  const [hoveredPolygon, setHoveredPolygon] = useState<PolygonData | null>(
    null
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const calculatedAreasRef = useRef<number[]>([]);

  const updateAreasAndFilters = (svgElement: SVGElement) => {
    const areas = data.map((polygon) => {
      const points =
        svgElement
          .querySelector(`polygon[data-code="${polygon.code}"]`)
          ?.getAttribute("points") || "";
      return calculatePolygonArea(points);
    });
    calculatedAreasRef.current = areas;

    const newMinArea = Math.min(...areas);
    const newMaxArea = Math.max(...areas);

    if (filters.minArea === 0 && filters.maxArea === 0) {
      setFilters((prev) => ({
        ...prev,
        minArea: newMinArea,
        maxArea: newMaxArea,
      }));
    }
  };

  const filterPolygon = (polygon: PolygonData, area: number) => {
    const matchesStatus =
      !filters.selectedStatus || polygon.status === filters.selectedStatus;
    const matchesPrice =
      polygon.price >= filters.minPrice && polygon.price <= filters.maxPrice;
    const matchesArea = area >= filters.minArea && area <= filters.maxArea;
    return matchesStatus && matchesPrice && matchesArea;
  };

  const applyFilters = useCallback(() => {
    const svgElement = document.querySelector(
      "#uuid-59b76a1b-abe3-40a4-afca-d4837b2fbc74"
    ) as SVGElement;
    if (!svgElement) return;

    updateAreasAndFilters(svgElement);

    data.forEach((polygon, index) => {
      const area = calculatedAreasRef.current[index];
      const polygonElement = svgElement.querySelector(
        `polygon[data-code="${polygon.code}"]`
      ) as SVGPolygonElement;

      if (polygonElement) {
        const isVisible = filterPolygon(polygon, area);
        polygonElement.setAttribute(
          "visibility",
          isVisible ? "visible" : "hidden"
        );

        polygonElement.onmouseenter = (event) =>
          handleMouseEnter(event, { ...polygon, area });
        polygonElement.onmouseleave = handleMouseLeave;
      }
    });
  }, [filters]);

  const handleMouseEnter = (
    event: MouseEvent,
    polygon: PolygonData & { area: number }
  ) => {
    setHoveredPolygon(polygon);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredPolygon(null);
  };

  const handleFilterChange = (field: string, value: number | string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilter = () => {
    setFilters(initialFilters);
  };

  const statusOptions = [
    { value: "", label: "All" },
    ...getUniqueStatuses(data),
  ];

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    hoveredPolygon,
    tooltipPosition,
    calculatedAreasRef,
    maxPrice,
    minPrice,
    statusOptions,
    handleFilterChange,
    filters,
    resetFilter,
  };
};

export default usePolygon;
