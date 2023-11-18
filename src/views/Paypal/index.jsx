import { useEffect} from 'react';
import * as d3 from 'd3';

const PayPal = () => {
  useEffect(() => {
      const data = [4, 8, 15, 16, 23, 42];

      // Create an SVG element
      const svg = d3.select('body').append('svg')
        .attr('width', 400)
        .attr('height', 200);
  
      // Create bars based on the data
      svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => i * 50)
        .attr('y', (d) => 200 - d * 4)
        .attr('width', 40)
        .attr('height', (d) => d * 4)
        .attr('fill', 'steelblue');
    
  
  }, []);


  return (
    <div>
      PayPal
      PayPal
      <div id="chart"></div>
    </div>
  )
}

export default PayPal
