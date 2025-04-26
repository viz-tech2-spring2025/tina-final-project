# Unfreezing the Archive

An interactive visualization of the Svalbardposten newspaper archive (2006-2024), focusing on climate-related discourse in Europe's northernmost community. This project is part of a Master of Fine Arts thesis in Information Design and Data Visualization at Northeastern University.

![Project Screenshot](./src/assets/project-screenshot.png)

## About the Project

"Unfreezing the Archive" explores how climate change is discussed in Svalbard, an Arctic archipelago where environmental changes are directly visible and impact daily life. The project visualizes articles from Svalbardposten (the local newspaper) and allows users to explore relationships between different climate-related keywords over time.

### Key Features

- Interactive visualization of 16,786 articles spanning from 2006 to 2024
- Ability to filter and compare discussions around different climate-related keywords
- Visual indication of article length and publication date
- Responsive design with tooltip information on hover

## Dataset

The dataset comprises over 16,000 articles in Norwegian from Svalbardposten's digital archive (2006-2024) with associated metadata. Data was collected programmatically using Python to access the newspaper's RSS feed with permission for research purposes. The full article texts remain proprietary and are not publicly distributed.

## Technologies Used

- **React.js** - Frontend framework
- **D3.js** (implied through scaling functions) - Data visualization
- **Vite** - Build tool and development server
- **JavaScript/JSX** - Programming language
- **HTML/CSS** - Web structure and styling

## Project Structure
## Project Structure

- `public/` - Public assets
  - `data/` - CSV data files
- `src/` - Source code
  - `assets/` - Static assets
    - `northernlights-adobe-77917007.mov` - Background video
  - `components/` - React components
    - `ArchiveChart.jsx` - Main data visualization chart
    - `Axes.jsx` - Chart axes
    - `Circle.jsx` - Circle elements for articles
    - `CircleLegend.jsx` - Legend component
    - `Filter.jsx` - Keyword filtering controls
    - `IntersectionText.jsx` - Text for keyword intersections
    - `Page.jsx` - Main page layout
    - `Tooltip.jsx` - Tooltip for article information
  - `utils/` - Utility functions
    - `data-scales.js` - D3 scaling functions
    - `keywords.js` - Keyword translations
  - `main.jsx` - Application entry point
  - `App.jsx` - Main application component
  - `styles.css` - Global styles
- `index.html` - HTML entry point
- `about.html` - About page
- `archive.html` - Archive visualization page
- `package.json` - Project dependencies
- `vite.config.js` - Vite configuration
- `README.md` - Project documentation

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

 ```
   git clone <repository-url>
   cd tina-final-project
   ```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Start the development server:

```
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5175`

## How to Use

1. Navigate to the Archive page using the arrow button on the home page
2. Use the dropdown menus on the left side to select keywords you want to explore
3. Articles containing:
- Both selected keywords will appear in the top band (pink color)
- Only the first keyword will appear in the middle band
- Only the second keyword will appear in the bottom band
4. Hover over circles to view article details
5. Use the reset button to clear your selections

## Data Visualization Logic

The visualization represents each article as a circle:
- Position on X-axis: Publication date (2006-2024)
- Position on Y-axis: Article word count (logarithmic scale)
- Circle size: Proportional to article word count
- Circle color: Varies by keyword match and position band

When keywords are selected, articles reorganize into three bands based on their keyword matches, making it easy to identify relationships between climate-related topics.

## Dependencies

- React
- D3
- React Spring

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Svalbardposten](https://www.svalbardposten.no) for providing research access to their digital archive

## MFA Thesis Context

This project is a component of a broader Master of Fine Arts thesis in Information Design and Data Visualization at Northeastern University. Its primary aim is to ideate and prototype possible interactive interfaces that facilitate access to large digital archives.

## Contact

For further information contact: [Tina L. Rosado](https://www.linkedin.com/in/tinalrosado)