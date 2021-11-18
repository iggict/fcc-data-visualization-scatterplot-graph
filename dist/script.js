/** Datetime functions */

const parseTime = d3.timeParse("%M:%S");
const formatTime = d3.timeFormat("%M:%S");

/** D3 elements declaration */
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip");

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
};

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
  .catch((err) => console.error(err));

