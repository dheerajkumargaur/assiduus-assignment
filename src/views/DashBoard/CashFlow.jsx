import  { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardActionArea, CardContent, CardHeader, Divider } from '@mui/material'

const CashFlow = () => {

  const svgRef = useRef();
// Sample data for the stacked bar chart

  useEffect(() => {
    const data = [
      { category: 'August', values: [10, 20] },
      { category: 'September', values: [15, 25 ] },
      { category: 'October', values: [5, 10 ] },
      { category: 'November', values: [8, 10] },
      { category: 'December', values: [12, 15 ] },
      { category: 'January', values: [8, 18 ] },
    ];

    const width = 400;
    const height = 320;
    const margin = { top: 20, right: 50, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow',  'visible');

    // Create scales for x and y axes
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, 450])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(d.values))])
      .nice()
      .range([height , margin.top]);

    // Create a stack layout for the data
    const stack = d3.stack().keys([0, 1])(data.map(d => d.values));

    // Create color scale for different categories
    const color = d3.scaleOrdinal()
      .domain(data[0].values.map((_, i) => i))
      .range(['#47b747', 'green']);


      const  xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickSize(0) // Remove the tick lines        
        .tickPadding(20); // Add padding to labels


        const xAxisGroup = svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);
    
      // Remove horizontal grid lines in the x-axis
      xAxisGroup.select('.domain').remove();
      xAxisGroup.selectAll('line').remove();

      // Change the font color of x-axis labels
      xAxisGroup.selectAll('text')
      .attr('font-weight', 'bolder')
        .attr('fill', 'gray')
        .style('text-anchor', 'middle');

        
    // Append the stacked bars to the SVG
    svg.append('g')
      .selectAll('g')
      .data(stack)
      .enter().append('g')
      .attr('fill', (d, i) => color(i))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d, i) => xScale(data[i].category))
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('width', 15)
      .attr('ry', 5) //


// Add indication with different colors for "in" and "out" parts of the bars


d3.select('#in').append('div')
.style('background-color', '#47b747')
.style('width', '20px')
.style('height', '20px')
.style('display', 'inline-block')
.style('border-radius', '5px')
.style('margin-right', '5px')


d3.select('#in').append('span')
.text('In')
.attr('fill', 'gray');

d3.select('#out').append('div')
.style('background-color', 'green')
.style('width', '20px')
.style('height', '20px')
.style('display', 'inline-block')
.style('border-radius', '5px')
.style('margin-right', '5px');

d3.select('#out').append('span')
.text('Out')
.attr('fill', 'gray');
      
  }, []);

  

  return (
    <div>
    <Card className='rounded-lg pb-4'>
        <CardActionArea>
        <CardHeader
        title={
          <div className='flex flex-row items-center'>
            Total cash flow <div className='flex flex-row ml-auto text-sm font-bold'><div id='in'/>&nbsp;&nbsp;<div id='out'/></div>
          </div>
        }
      />
              <Divider/>
                <CardContent>                      
                    <svg ref={svgRef}></svg>
                </CardContent>              
          </CardActionArea>
      </Card>       
    </div>
  )
}

export default CashFlow
