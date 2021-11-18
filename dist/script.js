/** Set size */

const margin = {
  top: 100,
  right: 20,
  bottom: 30,
  left: 60
};

const parentWidth = 920;
const parentHeight = 630;

const width = parentWidth - margin.left - margin.right;
const height = parentHeight - margin.top - margin.bottom;

/** Datetime functions */

const parseTime = d3.timeParse("%M:%S");
const formatTime = d3.timeFormat("%M:%S");

/** D3 containers */

var graph = d3
  .select("body")
  .append("svg")
  .attr("id", "scatterplot_graph")
  .attr("class", "graph")
  .attr("width", parentWidth)
  .attr("height", parentHeight)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .attr('class', 'tooltip');

const title = graph
  .append('text')
  .attr('id', 'title')
  .attr('class', 'title')
  .attr('x', width / 2)
  .attr('y', 0 - margin.top / 2)
  //.attr('text-anchor', 'middle')
  //.style('font-size', '30px')
  .text('titleee');

  const subtitle = graph
    .append('text')
    .attr('class', 'subtitle')
    .attr('x', width / 2)
    .attr('y', 0 - margin.top / 2 + 25)
    //.attr('text-anchor', 'middle')
    //.style('font-size', '20px')
    .text("Subtitleee");

/** Tooltip inner HTML */

const tooltipInnerHtml = (item) => {
  return ` 
    <p>
      <span class="tt-name">${item.Name}</span>
      <span class="tt-nation">${item.Nationality}</span>
      <br />Year: 
      <span class="tt-year">${item.Year}</span>
      <br />Time:
      <span class="tt-time">${formatTime(item.Time)}</span>
    </p>
    <p>
      <span='tt-doping'>${item.Doping}</span>
    </p>`;
  }

/** Load data */

const JSONFile =
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(JSONFile)
  .then((data) => {
    
    /** Parse data */
    
    data.forEach((d) => (d.Time = parseTime(d.Time)));  
  
    /** Debugger */
  
    const jsonDebug = d3
       .select("body")
       .append("div")
       .attr("id", "debugger")
       .html("<pre>" + JSON.stringify(data, null, 4) + "</pre>");
  
  })
    .catch((err) => console.error(err)
);
