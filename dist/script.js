/** Size */

const margin = {
  top: 80,
  right: 25,
  bottom: 30,
  left: 45,
};

const parentWidth = 900;
const parentHeight = 480;

const width = parentWidth - margin.left - margin.right;
const height = parentHeight - margin.top - margin.bottom;

const radius = 8;

/** Datetime functions */

const parseTime = d3.timeParse("%M:%S");
const formatTime = d3.timeFormat("%M:%S");
const formatInt = d3.format("d");
/*const addMinutes = (date, minutes) => (
  new Date(date.getTime() + minutes*60000)
);*/

/** D3 containers */

const graph = d3
  .select("body")
  .append("div")
  .attr("class", "container")
  .append("svg")
  .attr("id", "graph")
  .attr("class", "graph")
  .attr("width", parentWidth)
  .attr("height", parentHeight)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip");

const title = graph
  .append("text")
  .attr("id", "title")
  .attr("class", "title")
  .attr("x", width / 2)
  .attr("y", 0 - margin.top / 2)
  //.attr("text-anchor", "middle")
  //.style("font-size", "30px")
  .text("titleee");

const subtitle = graph
  .append("text")
  .attr("class", "subtitle")
  .attr("x", width / 2)
  .attr("y", 0 - margin.top / 2 + 25)
  //.attr('text-anchor', 'middle')
  //.style('font-size', '20px')
  .text("Subtitleee");

/** X and Y scales */

const xScale = d3.scaleTime().range([0, width]);
// domain will set in data loading

const yScale = d3.scaleLinear().range([0, height]);
// domain will set in data loading

// Color for the points
const color = d3.scaleOrdinal(d3.schemeCategory10);

/** Axis */

const xAxis = graph
  .append("g")
  .attr("id", "x-axis")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`);
// call will set in data loading

const yAxis = graph.append("g").attr("id", "y-axis").attr("class", "y-axis");
// call will set in data loading

/** Axis legends */

/* TODO
const xLegend = xAxis
  .append("text")
  .attr("class", "legend")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Best Time (minutes)");

const yLegend = yAxis
  .append("text")
  .attr("class", "legend")
  .attr("transform", "rotate(-90)")
  .attr("x", -160)
  .attr("y", -44)
  .text("Time in Minutes");
*/

/** Tooltip inner HTML */

const tooltipInnerHtml = (item) => {
  const innerHtml = ` 
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
  console.log(innerHtml);
  return innerHtml;
};

/** Load data */

const JSONFile =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(JSONFile)
  .then((data) => {
    /** Parse data */

    data.forEach((d) => (d.Time = parseTime(d.Time)));

    /** Set scales */

    const [xMin, xMax] = d3.extent(data, (d) => d.Year);

    xScale.domain([xMin - 1, xMax + 1]);

    yScale.domain(d3.extent(data, (d) => d.Time));

    /** Set axis */

    xAxis.call(d3.axisBottom(xScale).tickFormat(formatInt));

    yAxis.call(d3.axisLeft(yScale).tickFormat(formatTime));

    /** Graph dots */

    graph
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(d.Time))
      .attr("r", radius)
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d) => d.Time.toISOString())
      .style("fill", (d) => color(!d.Doping))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(300).style("opacity", 0.9);
        tooltip
          .attr("data-year", d.Year)
          .style("top", (event.pageY || event.x) + "px")
          .style("left", (event.pageX || event.y) + "px")
          .html(tooltipInnerHtml(d));
      })
      .on("mouseout", function () {
        tooltip.transition().duration(300).style("opacity", 0);
      });
  })
  .catch((err) => console.error(err));
