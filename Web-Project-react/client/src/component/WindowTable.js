import { Paper, TableContainer , Table, TableHead, Box } from "@mui/material";
import { TableRow, TableBody, styled, Typography, Button, Link  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#003964',
        color: theme.palette.common.white,
        fontSize : '12px',
        fontWeight : 300
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)' : {
        backgroundColor : '#eceff1',
    }
}));

function WindowTable({rows, setSearching}) {
    const onClick = () => {
        setSearching(false);
    }

    const openWindow = (e) => {
        e.preventDefault();
        window.open(e.target.href, '_blank', 'width=1200, height=800');
    }
   
    return <Box  
        component='div'
        sx={{
            my : '8px',
        }}>
            <Box 
            component='div'
            sx={{
                    display : 'flex',
                    justifyContent : 'space-between'
                }}
            
            >
                <Typography 
                    variant='h6' 
                    component="div" 
                    sx={{mb : 2}}
                >
                    검색 결과
                </Typography>

                <Button 
                    variant="contained" 
                    onClick={onClick}
                    sx={{mb : 2}}
                >
                    검색창 보기
                </Button>
            </Box>
  
            <TableContainer component={Paper} >
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>제목</StyledTableCell>
                        <StyledTableCell>작성자</StyledTableCell>
                        <StyledTableCell>작성일</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length !== 0 ? rows.map((row) => (
                        <StyledTableRow key={row.POSTID}>
                            <TableCell>{row.POSTID}</TableCell>
                            <TableCell>
                                <Link 
                                    href={`/read/${row.POSTID}`} 
                                    onClick={openWindow} 
                                    underline='none' 
                                    sx={{
                                        color : '#000',
                                        fontFamily : '"Roboto","Helvetica","Arial",sans-serif',
                                        fontWeight : 400,
                                        fontSize : '0.875rem',
                                    }}
                                >
                                    {row.TITLE}
                                </Link>
                            </TableCell>
                            <TableCell>{row.CREATER}</TableCell>
                            <TableCell>{row.ADDTIME}</TableCell>
                        </StyledTableRow>
                    )) 
                    :  <StyledTableRow sx={{textAlign : 'center'}}>
                            <TableCell colSpan={4}>검색 결과가 없습니다.</TableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>

        <Button 
            component='a'
            variant="contained"
            href="#btnClose"
            sx={{
                width : '30%',
                color : '#fff',
                fontWeight : 400,
                ml : 28,
                mt : 2

            }}
        >
            TOP <ArrowDropUpIcon />
        </Button>
    </Box>
}

export default WindowTable;