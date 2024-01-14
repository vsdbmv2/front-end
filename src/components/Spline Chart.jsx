import React from 'react';
import CanvasJSReact from '../static/chats/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const SplineChart = ({ name, infos }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: name
    },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      title: "Amount",
      // prefix: "$",
      includeZero: false
    },
    data: [{
      yValueFormatString: "#,###",
      xValueFormatString: "MMMM",
      type: "spline",
      dataPoints: infos
    }]
  }
  if (infos) {
    return (
      <div>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  } else {
    return <h6>Select an organism</h6>
  }
}

export default SplineChart;