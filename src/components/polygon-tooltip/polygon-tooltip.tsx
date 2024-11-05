import { useState } from "react";
import { PolygonData } from "../../App";
import { formatNumber } from "../../utils/format-number";
import styles from "./polygon-tooltip.module.css"; // Import the CSS module

interface TooltipProps {
  polygon?: PolygonData;
  position: { x: number; y: number };
}

const PolygonTooltip = ({ polygon, position }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!polygon) return null;

  return (
    <div
      className={`${styles.tooltip} ${isHovered ? styles.tooltipHovered : ""}`}
      style={{
        top: position.y + 10,
        left: position.x + 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.tooltipContent}>
        <span>
          Status: <span className={styles.status}>{polygon.status}</span>
        </span>
      </div>
      <div className={styles.tooltipPrice}>
        <span>
          Price: <span className={styles.price}>${polygon.price}</span>
        </span>
      </div>
      <div>
        <span>
          Total Area:{" "}
          <span className={styles.area}>
            {formatNumber(polygon?.area || 0)} m²
          </span>
        </span>
      </div>
    </div>
  );
};

export default PolygonTooltip;
