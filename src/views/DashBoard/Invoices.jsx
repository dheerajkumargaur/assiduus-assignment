import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button, Card, CardActionArea, CardContent, CardHeader, Divider, Dialog, DialogTitle, DialogContent} from '@mui/material'


const Invoices = () => {
    const [openModal, setOpenModal] = useState(false)
  const svgRef = useRef();
  // Sample data for the stacked bar chart
  const [data] = useState([
    { category: 'Older', values: [10] },
    { category: 'Jan 01-08', values: [15 ] },
    { category: 'Jan 09-16', values: [5 ] },
    { category: 'Jan 17-24', values: [8] },
    { category: 'Jan 25-30', values: [12 ] },
    { category: 'Future', values: [8] },
  ]);
    useEffect(() => {
      
  
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
      const stack = d3.stack().keys([0])(data.map(d => d.values));
  
      // Create color scale for different categories
      const color = d3.scaleOrdinal()
        .domain(data[0].values.map((_, i) => i))
        .range(['#47b747']);
  
  
        const  xAxis = d3.axisBottom(xScale)
          .ticks(data.length)
          .tickSize(0) // Remove the tick lines        
          .tickPadding(5); // Add padding to labels
  
  
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
  
    }, [data]);



  
  return (
    <div>
      <Card className='rounded-lg'>
          <CardActionArea>
            <CardHeader title={<div 
              className='flex flex-row items-center justify-between'>
              Invoices owed to you <Button variant="outlined" 
              onClick={ () => setOpenModal( open => !open)} 
              color='success' 
              sx={{ textTransform:'capitalize', backgroundColor: 'lightgray'}}>New Sales Invoice</Button> 
              </div>}/>                  
                <Divider/>
                <Dialog open={openModal} onClick={ () => setOpenModal( close => !close)}>
                  <DialogTitle>Upload New Sales Invoice</DialogTitle>
                  <Divider/>
                  <DialogContent>
                  <div className='p-12'>
                      <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Upload file</label>
                      <input className="block w-full h-6 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file"/>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF, XLS (MAX. 800x400kb).</p>
                  </div>           
                  </DialogContent> 
                </Dialog>
                  <CardContent>                      
                      <svg ref={svgRef}></svg>
                  </CardContent>              
            </CardActionArea>
        </Card>
    </div>
  )
}

export default Invoices
