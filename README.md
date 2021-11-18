# Visualize Data with a Scatterplot Grap

Challenge for the "Data Visualization" module of FreeCodeCamp

---

## User stories

- #**01**: I can see a title element that has a corresponding `id="title"`.
- #**02**: I can see an x-axis that has a corresponding `id="x-axis"`.
- #**03**: I can see a y-axis that has a corresponding `id="y-axis"`.
- #**04**: I can see dots, that each have a class of `dot`, which represent the data being plotted.
- #**05**: Each dot should have the properties `data-xvalue` and `data-yvalue` containing their corresponding `x` and `y` values.
- #**06**: The `data-xvalue` and `data-yvalue` of each dot should be within the range of the actual data and in the correct data format. For `data-xvalue`, integers (full years) or `Date` objects are acceptable for test evaluation. For `data-yvalue` (minutes), use `Date` objects.
- #**07**: The `data-xvalue` and its corresponding dot should align with the corresponding point/value on the x-axis.
- #**08**: The `data-yvalue` and its corresponding dot should align with the corresponding point/value on the y-axis.
- #**09**: I can see multiple tick labels on the `y-axis` with `%M:%S` time format.
- #**10**: I can see multiple tick labels on the `x-axis` that show the `year`.
- #**11**: I can see that the range of the `x-axis` labels are within the range of the actual `x-axis` data.
- #**12**: I can see that the range of the `y-axis` labels are within the range of the actual `y-axis` data.
- #**13**: I can see a legend containing descriptive text that has `id="legend"`.
- #**14**: I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.
- #**15**: My tooltip should have a data-year property that corresponds to the `data-xvalue` of the active area.

## JSON file

Here is the dataset you will need to complete this project:

https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json

```json
[
  {
    "Time": "36:50",
    "Place": 1,
    "Seconds": 2210,
    "Name": "Marco Pantani",
    "Year": 1995,
    "Nationality": "ITA",
    "Doping": "Alleged drug use during 1995 due to high hematocrit levels",
    "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
  },
  {
    "Time": "36:55",
    "Place": 2,
    "Seconds": 2215,
    "Name": "Marco Pantani",
    "Year": 1997,
    "Nationality": "ITA",
    "Doping": "Alleged drug use during 1997 due to high hermatocrit levels",
    "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
  },
  {
    "Time": "37:15",
    "Place": 3,
    "Seconds": 2235,
    "Name": "Marco Pantani",
    "Year": 1994,
    "Nationality": "ITA",
    "Doping": "Alleged drug use during 1994 due to high hermatocrit levels",
    "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
  }, 
  // ... 
]
```
