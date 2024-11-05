import { Filters } from "../../hooks/usePolygon";
import { formatNumber } from "../../utils/format-number";
import styles from "./filter-control.module.css";

interface StatusOption {
  value: string;
  label: string;
}

interface FilterProps {
  statusOptions: StatusOption[];
  filters: Filters;
  handleFilterChange: (field: keyof Filters, value: number | string) => void;
  resetFilter: () => void;
  minPrice: number;
  maxPrice: number;
  calculatedAreasRef: React.RefObject<number[]>;
}

const FilterControl = (props: FilterProps) => {
  const {
    calculatedAreasRef,
    filters,
    handleFilterChange,
    maxPrice,
    minPrice,
    statusOptions,
    resetFilter,
  } = props;

  const currentAreas = calculatedAreasRef.current || [];
  const minArea = currentAreas.length > 0 ? Math.min(...currentAreas) : 0;
  const maxArea = currentAreas.length > 0 ? Math.max(...currentAreas) : 0;

  // Variables for slider track styling
  const priceSliderTrackLeft =
    ((filters.minPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const priceSliderTrackRight =
    100 - ((filters.minPrice - minPrice) / (maxPrice - minPrice)) * 100;

  const areaSliderTrackLeft =
    ((filters.minArea - minArea) / (maxArea - minArea)) * 100;
  const areaSliderTrackRight =
    100 - ((filters.maxArea - minArea) / (maxArea - minArea)) * 100;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItem}>
        <span className={styles.title}>Type</span>
        <div className={styles.buttonGroup}>
          {statusOptions.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.filterButton} ${
                filters.selectedStatus === value ? styles.activeButton : ""
              }`}
              onClick={() => handleFilterChange("selectedStatus", value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>
          <label htmlFor="priceRangeSlider" className={styles.title}>
            Price:
          </label>

          <div className={styles.title}>
            <span>Min: ${formatNumber(filters.minPrice)}</span>
            <span>Max: ${formatNumber(filters.maxPrice)}</span>
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            style={{ zIndex: filters.minPrice > filters.maxPrice - 1 ? 5 : 3 }}
          />

          <div
            className={styles.sliderTrack}
            style={{
              left: `${priceSliderTrackLeft}%`,
              right: `${priceSliderTrackRight}%`,
            }}
          />
        </div>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>
          <label htmlFor="areaRangeSlider" className={styles.title}>
            Area:
          </label>

          <div className={styles.title}>
            <span>Min: {formatNumber(filters.minArea)} m²</span>
            <span>Max: {formatNumber(filters.maxArea)} m²</span>
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={minArea}
            max={maxArea}
            value={filters.minArea}
            onChange={(e) => handleFilterChange("minArea", e.target.value)}
            style={{ zIndex: filters.minArea > filters.maxArea - 1 ? 5 : 3 }}
          />

          <div
            className={styles.sliderTrack}
            style={{
              left: `${areaSliderTrackLeft}%`,
              right: `${areaSliderTrackRight}%`,
            }}
          />
        </div>

        <button
          className={styles.clearFilterButton}
          onClick={resetFilter}
          style={{
            marginTop: ".6rem",
          }}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default FilterControl;
