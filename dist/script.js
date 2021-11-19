/** Size */

const margin = {
  top: 80,
  right: 25,
  bottom: 60,
  left: 65,
};

const parentWidth = 900;
const parentHeight = 480;

const width = parentWidth - margin.left - margin.right;
const height = parentHeight - margin.top - margin.bottom;

const radius = 8; // dot radius

/** Datetime functions */

const parseTime = d3.timeParse("%M:%S");
const formatTime = d3.timeFormat("%M:%S");
const formatInt = d3.format("d");
/*const addMinutes = (date, minutes) => (
  new Date(date.getTime() + minutes*60000)
);*/

/** Color range */

const dopingColor = d3.scaleOrdinal(d3.schemeCategory10)
  .domain([false, true]);

/*
const getComplementaryColor = (color = '') => {
   const colorPart = color.slice(1);
   const ind = parseInt(colorPart, 16);
   let iter = ((1 << 4 * colorPart.length) - 1 - ind).toString(16);
   while (iter.length < colorPart.length) {
      iter = '0' + iter;
   };
   return '#' + iter;
}; */

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
  .attr("y", -margin.top / 2)
  .text("Doping in Le tour de France");

const subtitle = graph
  .append("text")
  .attr("class", "subtitle")
  .attr("x", width / 2)
  .attr("y", -margin.top / 2 + margin.top / 2.5)
  .text("Fastest Alpe d'Huez climbs");

/** X and Y scales */

const xScale = d3.scaleTime().range([0, width]);
// domain will set in data loading

const yScale = d3.scaleLinear().range([0, height]);
// domain will set in data loading

/** Axis */

const xAxis = graph
  .append("g")
  .attr("id", "x-axis")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`);
  // call will set in data loading

const yAxis = graph
  .append("g")
  .attr("id", "y-axis")
  .attr("class", "y-axis");
  // call will set in data loading

/** Axis labels */

const xLabel = xAxis
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", 45)
  .style("text-anchor", "end")
  .text("edition (year)");

const yLabel = yAxis
  .append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("x", -10)
  .attr("y", -50)
  .text("time (minutes)");

/** Legends */

const legend = graph
  .append("g")
  .attr("id", "legend")
  .attr("class", "legend");

const legendLabel = legend
  .selectAll("g")
  .data(dopingColor.domain())
  .enter()
  .append("g")
  .attr("class", "legend-label")
  .attr("transform", (d, i) => (
     `translate(0, ${height/2 - i*20})`
   ));

const legendLabelColor = legendLabel
  .append("rect")
  .attr("class", "legend-label-color")
  .attr("x", width - 18)
  .attr("rx", 5) // border radius
  .attr("ry", 5) // border radius
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", dopingColor);

const legendLabelText = legendLabel
  .append('text')
  .attr("class", "legend-label-text")
  .attr('x', width - 24)
  .attr('y', 9)
  .attr('dy', '.35em')
  .style('text-anchor', 'end')
  .text((d) => (
    (!d) ? 'No doping allegations'
         : 'Involved in doping allegations'
  ));


/** Tooltip inner HTML */

const tooltipInnerHtml = (item) => {
  const color = dopingColor(item.Doping == "");
  return ` 
    <p>
      <span class="tt-name" style="color: ${color}">${item.Name}</span>
      (<span class="tt-nation">${item.Nationality}</span>)
      <br />Year: 
      <span class="tt-year">${item.Year}</span>
       | Time:
      <span class="tt-time">${formatTime(item.Time)}</span>
    </p>
    <p class="tt-doping">${item.Doping}</p>`;
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

    const dot = graph
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
      .style("fill", (d) => dopingColor(d.Doping == ""))
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
