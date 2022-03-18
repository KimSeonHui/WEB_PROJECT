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
const maxRow = 20;

function BoardTable({cid, page}) {
    const getData = async () => {
        const res = await axios.get(`/board/${cid}/${page}`);

        if(res.statusText === 'OK') {
            const data = await res.data.post;
            for(let i = (page * maxRow) - maxRow; i < (page * maxRow); i++) {
                if( i > data.length - 1) {
                    //i++;
                    break;
                }
                else {
                    const val = data[i];
                    rows.push(createData(val.POSTID, val.TITLE, val.CREATER, val.VIEWS, val.ADDTIME))
                }
            }
        }
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
                            <Link href={`/read/${row.postId}`} underline="none" sx={{color : '#000'}}>
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