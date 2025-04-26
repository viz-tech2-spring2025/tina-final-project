import { scaleTime, scaleLog, scaleSqrt, interpolateRgb } from "d3";

// Function to get CSS variable value
function getCSSVariable(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// X axis - Time scale
export function createTimeScale(data, { marginLeft, width }) {
  const dates = data.map(d => d.dateObj || new Date(d.published));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  return scaleTime()
    .domain([minDate, maxDate])
    .range([marginLeft, width - marginLeft]);
}

// Scale for radius based on word count
export function createRadiusScale(data) {
  const counts = data.map(d => d.word_count);
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  return scaleSqrt()
    .domain([minC, maxC])
    .range([1.5, 6]);
}

// Y axis - Word count on log scale
export function createWordLogScale(data) {
  const counts = data.map(d => d.word_count);
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  return scaleLog()
    .domain([minC, maxC])
    .range([700, 350]);
}

// Generic function to create a band scale
function createBandScale(data, rangeValues) {
  const counts = data.map(d => d.word_count);
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  return scaleLog()
    .domain([minC, maxC])
    .range(rangeValues);
}

// Create specialized band scales for selections
export function createTopBandScale(data) {
  return createBandScale(data, [150, 50]);
}

export function createMiddleBandScale(data) {
  return createBandScale(data, [250, 150]);
}

export function createBottomBandScale(data) {
  return createBandScale(data, [350, 250]);
}

// Generic function to create a color scale with log interpolation
function createColorScale(data, colorStart, colorEnd) {
  const counts = data.map(d => d.word_count);
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  
  // Create a log scale for the interpolation
  const logScale = scaleLog()
    .domain([minC, maxC])
    .range([0, 1]);
  
  // Get colors from CSS variables
  const startColor = getCSSVariable(colorStart);
  const endColor = getCSSVariable(colorEnd);
  
  // Return a function that uses log scale for interpolation
  return (value) => {
    const t = logScale(value);
    const interpolator = interpolateRgb(startColor, endColor);
    return interpolator(t);
  };
}

// Color scales for each selection band
export function createTopBandColorScale(data) {
  return createColorScale(data, '--lightPink', '--pink');
}

export function createMiddleBandColorScale(data) {
  return createColorScale(data, '--lightGreen', '--green' );
}

export function createBottomBandColorScale(data) {
  return createColorScale(data, '--lightGreen','--green' );
}

export function createDefaultColorScale(data) {
  return createColorScale(data, '--green', '--green');
}

