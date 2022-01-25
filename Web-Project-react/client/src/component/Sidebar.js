import {Box, Link, Divider } from '@mui/material';
import {TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const renderTreeItem = (data) => {
    const dataArr = Object.values(data);
    const items = [];

    if(data !== {}) {
        dataArr.map(node => {
            items.push(<TreeItem nodeId={String(node.id)} label={node.name} key={node.id}></TreeItem> )
        });

        return items; 

    }     
}

   

function Sidebar({category}) {
    return <Box
        sx={{
            width : '250px',
            height : '100vh',
            backgroundColor : '#f8f9fa',
        }}
    >
        <Link
             href="/" 
             underline='none' 
             sx={{
                 color : '#6c757d', 
                 fontSize : '26px', 
                 display : 'flex',
                 justifyContent: 'center',
                 py : '15px',
            }}
        >
            매뉴얼
        </Link>
        <Divider />
        <Box sx={{pl : '20px', pt : '15px'}} >
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{overflowX : 'hidden'}}
            >
               {renderTreeItem(category)}
            </TreeView>
        </Box>
    </Box>
}

export default Sidebar;