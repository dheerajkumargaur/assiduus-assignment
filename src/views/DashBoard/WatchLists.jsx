import { Card, CardActionArea, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const WatchLists = () => {
  const data = [
    { category: 'Sales', thisMonth: '1,194.58', YTD: '11,418.29' },
    { category: 'Advertising', thisMonth: '6,879.02', YTD: '9,271.36' },
    { category: 'Inventory', thisMonth: '4,692.26', YTD: '9,768.09' },
    { category: 'Entertainment', thisMonth: '0.00', YTD: '0.00' },
    { category: 'Product', thisMonth: '4,652.10', YTD: '2,529.90' },
  ];
  
  return (
    <div>
      <Card className='rounded-lg'>
          <CardActionArea>
              <CardHeader title='Account watchlist'/>                  
              <Divider/>
                <CardContent>
                    <TableContainer>
                        <Table aria-label="Account watchlist">
                          <TableHead>
                            <TableRow className=' font-extralight'>
                              <TableCell>Account</TableCell>
                              <TableCell>This Month</TableCell>
                              <TableCell>YTD</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.thisMonth}</TableCell>
                                <TableCell>{row.YTD}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>              
          </CardActionArea>
      </Card>
    </div>
  )
}

export default WatchLists
