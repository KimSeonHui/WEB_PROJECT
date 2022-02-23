import { Paper, TableContainer , Table, TableHead } from "@mui/material";
import { TableRow, TableBody, styled, Link  } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from "axios";
import { useEffect } from "react";

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

const createData = (postId, title, creater, views, date) => {
    return {postId, title, creater, views, date};
}

const rows = [];

function BoardTable({cid}) {
    const getData = async () => {
        axios.get(`/board/${cid}`)
        .then((res) => res.data.post.map((val) => 
            rows.push(createData(val.POSTID, val.TITLE, val.CREATER, val.VIEWS, val.ADDTIME))
        ))
    }

    useEffect(() => {
        getData();
    }, []);
    

    return <TableContainer component={Paper} sx={{mt : '20px'}}>
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
                {rows.map((row) => (
                    <StyledTableRow key={row.postId}>
                        <TableCell>{row.postId}</TableCell>
                        <TableCell>
                            <Link href={`/board/`} underline="none" sx={{color : '#000'}}>
                                {row.title}
                            </Link>
                        </TableCell>
                        <TableCell>{row.creater}</TableCell>
                        <TableCell>{row.views}</TableCell>
                        <TableCell>{row.date}</TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>

        </Table>

    </TableContainer>
}

export default BoardTable;