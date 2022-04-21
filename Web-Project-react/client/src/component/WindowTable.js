import { Paper, TableContainer , Table, TableHead } from "@mui/material";
import { TableRow, TableBody, styled, Typography, Button  } from "@mui/material";
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

function WindowTable({rows, setSearching}) {
    const onClick = () => {
        setSearching(false);
    }
   
    return <div  style=
        {{
            width : '100%',
            marginTop : '8px',
            marginBottom : '8px',
            marginRight: 'auto',
            marginLeft: 'auto'
        }}>
            <div style=
                {{
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
                >
                    검색창 보기
                </Button>
            </div>
  
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
                    {rows.length !== undefined ? rows.map((row) => (
                        <StyledTableRow key={row.POSTID}>
                            <TableCell>{row.POSTID}</TableCell>
                            <TableCell>{row.TITLE}</TableCell>
                            <TableCell>{row.CREATER}</TableCell>
                            <TableCell>{row.ADDTIME}</TableCell>
                        </StyledTableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

export default WindowTable;