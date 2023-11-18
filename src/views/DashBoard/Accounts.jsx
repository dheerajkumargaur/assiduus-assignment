import {useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardActionArea, CardContent, CardHeader, Divider, Select, FormControl, MenuItem, InputLabel, Box  } from '@mui/material'

const colors = ['#47b747', '#24bd24', '#5ad75a', '#40df40', '#09d109']; 


const Accounts = () => {
  const svgRef = useRef(null);

  const data1 = [22, 28, 38, 31, 20, 30, 18, 20, 25, 26]
  const [data, setData] = useState(data1);

  useEffect(() => {

    const w = 400
    const h = 200

    // Create setting up an SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow',  'visible')


      // setting the scaling

      const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
      const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([300, 0]);

      const generatedScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);



      // setting the axes
      const  xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(i => i + 9)
        .tickSize(0); // Remove the tick lines

      const  yAxis = d3.axisLeft(yScale)
        .ticks(5);

      // Append the x-axis to the SVG
      const xAxisGroup = svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    
      // Remove horizontal grid lines in the x-axis
      xAxisGroup.select('.domain').remove();
      xAxisGroup.selectAll('line').remove();

      // Change the font color of x-axis labels
      xAxisGroup.selectAll('text')
      .attr('font-weight', 'bolder')
        .attr('fill', 'gray'); // Change the font color of x-axis labels



    // Create line graph based on the data
    svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generatedScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => colors[i % colors.length]) // Apply different colorss
      .attr('stroke-width', 1.5);
  
      

}, [data]);
  


const generateRandomData = () => {
 // Generate random data for your chart between 18 and 40
 const randomData = Array.from({ length: 10 }, () => Math.floor(Math.random() * (40 - 18 + 1)) + 18);
  d3.select(svgRef.current).selectAll('*').remove();
  return randomData;
};



  return (
    <div>
    <Card className='rounded-lg p-4'>
          <CardHeader title={<div className='flex flex-row items-center justify-between'
          >Checking account<FormControl>
          <InputLabel id="demo-simple-select-label">Manage</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Manage"
            onChange={() => setData(generateRandomData)}
          >
            <MenuItem value={10}>Manage</MenuItem>
            <MenuItem value={20}>Check Account</MenuItem>
            <MenuItem value={30}>Invoice</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label1">January</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={10}
            label="January"
            onChange={() => setData(generateRandomData)}
          >
            <MenuItem value={10}>January</MenuItem>
            <MenuItem value={20}>Febuary</MenuItem>
            <MenuItem value={30}>March</MenuItem>
          </Select>
        </FormControl>
          </div>
          }/>                  
              <Divider/>
                <CardContent>                      
                    <svg ref={svgRef}></svg>
                </CardContent> 
      </Card>
    </div>
  )
}

export default Accounts
