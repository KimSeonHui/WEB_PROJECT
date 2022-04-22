import { Paper, TableContainer , Table, TableHead } from "@mui/material";
import { TableRow, TableBody, styled, Typography, Button, Link  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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

    const openWindow = (e) => {
        e.preventDefault();
        window.open(e.target.href, '_blank', 'width=1200, height=800');
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
                    {rows.length !== 0 ? rows.map((row) => (
                        <StyledTableRow key={row.POSTID}>
                            <TableCell>{row.POSTID}</TableCell>
                            <TableCell>
                                <Link href={`/read/${row.POSTID}`} onClick={openWindow}>
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
            variant="contained"
            href="#btnClose"
            style={{
                width : '30%',
                borderRadius : '0.5rem',
                border : '0.125rem solid transparent',
                backgroundColor : '#0186d3',
                borderColor : '#0186d3',
                color : '#fff',
                fontWeight : 400,
                marginLeft : 'auto'

            }}
        >
             <ArrowDropUpIcon style=
                {{
                    width : '30%', 
                    fontSize : 20, 
                    ml : 0.5, 
                    verticalAlign : 'middle',
                    color : '#fff'
                }} 
                color='inherit'
            />
        </Button>
    </div>
}

export default WindowTable;