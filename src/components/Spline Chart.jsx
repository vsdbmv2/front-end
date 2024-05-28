import React, { useMemo } from 'react';
import CanvasJSReact from '../static/chats/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function monthDiff(d1, d2) {
  if(!d1 || !d2) return 0;
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export const SplineChart = ({ name, infos }) => {
  const totalMonthDiff = useMemo(() => monthDiff(infos?.[0]?.x, infos?.[infos?.length - 1]?.x), [infos]);
  const options = {
    animationEnabled: true,
    title: {
      text: name
    },
    axisX: {
      valueFormatString: "MM/YYYY",
      interval: totalMonthDiff > 30 ? Math.round(totalMonthDiff / 30) : totalMonthDiff,
      intervalType: "month"
    },
    axisY: {
      title: "Amount",
      // prefix: "$",
      includeZero: true
    },
    data: [{
      yValueFormatString: "###,###,###",
      xValueFormatString: "MMMM YYYY",
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