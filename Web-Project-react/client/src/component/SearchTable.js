import { Paper, TableContainer , Table, TableHead, Container, Box } from "@mui/material";
import { TableRow, TableBody, styled, Link, Divider, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#003964',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)' : {
        backgroundColor : '#eceff1',
    }
}));

function SearchTable({results}) {
    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
            <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
                <Typography 
                    variant='h5' 
                    component="div" 
                    gutterBottom
                >
                    검색 결과
                </Typography>
            </Box>
            <Divider />

            <TableContainer component={Paper} sx={{mt : '20px'}}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>제목</StyledTableCell>
                            <StyledTableCell>작성자</StyledTableCell>
                            <StyledTableCell>조회수</StyledTableCell>
                            <StyledTableCell>작성일</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (
                            <StyledTableRow key={row.POSTID}>
                                <TableCell>{row.POSTID}</TableCell>
                                <TableCell>
                                    <Link href={`/read/${row.POSTID}`} underline="none" sx={{color : '#000'}}>
                                        {row.TITLE}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.CREATER}</TableCell>
                                <TableCell>{row.VIEWS}</TableCell>
                                <TableCell>{row.ADDTIME}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
            
    </Container>
}

export default SearchTable;