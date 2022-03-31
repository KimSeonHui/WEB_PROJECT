import {Box, Link, Divider } from '@mui/material';
import ListIcon from '@mui/icons-material/ListOutlined';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';



const createData = () => {
    const data = [
        {id : '1', name : '카테고리', href : '/setting/category', icon : <ListIcon />},
        {id : '2', name : '게시글', href : '/setting/post', icon : <FileIcon />},
        {id : '3', name : '회원', href : '/setting/user', icon : <PersonIcon />},
    ];
    return data;
}



function SettingSidebar({session}) {
    return <Box
        sx={{
            width : '250px',
            height : '100vh',
            backgroundColor : '#f8f9fa',
        }}
    >
        <Link
             href={`/setting?order=${session.user}`}
             underline='none' 
             sx={{
                 color : '#6c757d', 
                 fontSize : '26px', 
                 display : 'flex',
                 justifyContent: 'center',
                 py : '15px',
            }}
        >
            매뉴얼 관리
        </Link>
        <Divider />
        <Box sx={{pl : '55px', pt : '15px', textAlign : 'left'}} >
           {createData().map((node) => (
               <Link
                key={node.id}
                href={node.href}
                underline='none'
                color={'#333333'}
                sx={{display : 'block', mb : 2}}
               >
                   {node.icon} {node.name} 
               </Link>
           ))}
        </Box>
    </Box>
}

export default SettingSidebar;