# Frontend Assignment

This repository contains a frontend project focused on SVG polygon filtering and tooltip display. Users can filter polygons by criteria such as status, price, and area, and see details about each polygon on hover.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/eaysin-arafat/task-solaria.git
   cd task-solaria
   ```

2. Install Dependencies:

   ```bash
   yarn
   ```

3. Run the Project Locally:

   ```bash
   yarn dev
   ```

### Task Overview

#### 1. Polygon Filtering

The application filters SVG polygons based on status, price, and area. Only polygons matching the selected criteria will be displayed on the SVG.
**Filter Criteria:**

- Status: Filters polygons by specific status values.
- Price: Allows filtering within a price range.
- Area: Filters polygons by calculated area range.

#### 2. Display Polygon Data on Hover

When a user hovers over a polygon, a tooltip appears near the cursor, displaying the polygon's status, price, and area.

### Code Reference

#### App.tsx

The main application component that renders:

- The background image as an SVG.
- **`FilterControl`** for user filter inputs.
- **`PolygonTooltip`** to show polygon data on hover.

#### usePolygon.ts (Custom Hook)

- The **`usePolygon`** hook manages polygon filtering, visibility, and hover state.

**Key Elements:**

- **PolygonData Interface:** Defines the polygon structure with fields for code, status, price, and area.
- **Filters Interface:** Represents the filter criteria.

**Functions:**

- **`updateAreasAndFilters`**: Calculates polygon areas and updates area range filters.
- **`applyFilters`**: Filters and toggles polygon visibility based on criteria.
- **`handleFilterChange`**: Updates filters based on user input.
- **`resetFilter`**: Resets all filter settings to their default values.

**Events:**

- **`handleMouseEnter` & `handleMouseLeave`**: Sets the tooltip data and position when a polygon is hovered.

#### FilterControl.tsx

Renders the control panel for filtering by status, price, and area.

**Components:**

- **Status Filter**: Buttons to filter polygons by status.
- **Price & Area Sliders**: Range sliders for filtering by price and area.
- **Clear Filter**: Button to reset all filter criteria.

#### PolygonTooltip.tsx

Displays the tooltip with polygon details on hover.

**Tooltip Elements:**

- Status, Price, and Area information for the hovered polygon.
- **Hover Effect**: Adds a CSS style change when the tooltip itself is hovered.

### File Structure

```bash
/src
  ├── assets
  │   ├── 0-floor.png         # SVG background image
  │   ├── polygon.tsx         # Polygon SVG component
  │   └── data.json           # Polygon data for status, price, etc.
  ├── components
  │   ├── filter-control
  │   │   └── filter-control.tsx # Filter controls for polygon visibility
  │   ├── polygon-tooltip
  │   │   └── polygon-tooltip.tsx # Tooltip for displaying polygon data
  ├── hooks
  │   └── usePolygon.ts       # Custom hook for polygon visibility and filtering
  ├── utils
  │   ├── calculate-polygon-area.ts # Utility to calculate polygon area
  │   └── format-number.ts         # Utility for number formatting
  └── App.tsx                 # Main app component
```

#### Utilities

- **`calculate-polygon-area.ts`**: Calculates the area of a polygon based on its data points.
- **`format-number.ts`**: Utility for formatting numbers, used for prices and areas in tooltips.

### Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety in components and hooks.
- **CSS Modules**: For styling and scoped CSS.

🎨 Screenshots

### Example Usage

- **To filter polygons**: Use the filter panel's sliders or status buttons.
- **To view polygon details**: Hover over a polygon to display its details in the tooltip.
- **To reset filters**: Click the "Clear Filter" button.
