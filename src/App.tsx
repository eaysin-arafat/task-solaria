import image from "./assets/0-floor.png";
import Polygon from "./assets/polygon.tsx";
import FilterControl from "./components/filter-control/filter-control.tsx";
import { PolygonTooltip } from "./components/index.tsx";
import usePolygonVisibility from "./hooks/usePolygon.ts";

export interface PolygonData {
  code: number;
  status: string;
  price: number;
  area?: number;
}

const App: React.FC = () => {
  const {
    hoveredPolygon,
    tooltipPosition,
    calculatedAreasRef,
    handleFilterChange,
    maxPrice,
    minPrice,
    statusOptions,
    filters,
    resetFilter,
  } = usePolygonVisibility();

  return (
    <section>
      <img
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#272727",
          objectFit: "cover",
        }}
        src={image}
        alt="Background Image"
      />

      {/* Filter Controls */}
      <FilterControl
        calculatedAreasRef={calculatedAreasRef}
        resetFilter={resetFilter}
        filters={filters}
        handleFilterChange={handleFilterChange}
        maxPrice={maxPrice}
        minPrice={minPrice}
        statusOptions={statusOptions}
      />

      <Polygon />

      <PolygonTooltip
        polygon={hoveredPolygon || undefined}
        position={tooltipPosition}
      />
    </section>
  );
};

export default App;
