import { Paper, TableContainer , Table, TableHead } from "@mui/material";
import { TableRow, TableBody, styled, Link  } from "@mui/material";
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

const createData = (postId, category, title, creater, date) => {
    return {postId, category, title, creater, date};
}

const rows = [
    createData('1', '소설/시/희곡', '허상의 어릿광대', '땡구', '2021-01-11'),
    createData('2', '소설/시/희곡', '시소 첫번째', '땡구', '2021-01-11'),
    createData('3', '인문학', '안나의 토성', '땡구', '2021-01-11'),
    createData('4', '인문학', '빛을 두려워하는', '땡구', '2021-01-11'),
    createData('5', '과학', 'COSMOS', '땡구', '2021-01-11'),
];

function MainTable() {

    return <TableContainer component={Paper} sx={{mt : '20px'}}>
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>카테고리</StyledTableCell>
                    <StyledTableCell>제목</StyledTableCell>
                    <StyledTableCell>작성자</StyledTableCell>
                    <StyledTableCell>작성일</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.postId}>
                        <TableCell>{row.postId}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>
                            <Link href="/board" underline="none" sx={{color : '#000'}}>
                                {row.title}
                            </Link>
                        </TableCell>
                        <TableCell>{row.creater}</TableCell>
                        <TableCell>{row.date}</TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>

        </Table>

    </TableContainer>
}

export default MainTable;