import {Box, Link, Divider } from '@mui/material';
import {TreeView, TreeItem } from '@mui/lab';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const getSelectedNode = (event, nodeIds) => {
    if(event.target.previousSibling !== null) {
        window.location.href = `../board/${nodeIds}`;
    }
}

const renderSubTree = (category, node) => {
    const subTree = [];
    for(let i = 0; i < category.length; i++) {
        if(node.id === String(category[i].parent)) {
            subTree.push(
            <TreeItem 
                key={category[i].id} 
                nodeId={String(category[i].id)} 
                label={category[i].name}
                sx={{mt : '4px'}}
            >
                {category[i].level < 2  ? renderSubTree(category, category[i]) : null }
            </TreeItem>); 
        }
    }
    return subTree;
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
                defaultCollapseIcon={<FolderOpenOutlinedIcon />}
                defaultExpandIcon={<FolderOutlinedIcon />}
                sx={{overflowX : 'hidden'}}
                onNodeSelect={getSelectedNode}
            >
               { Object.values(category).map((node) => ( 
                   node.parent === '#' ? (
                    <TreeItem 
                        nodeId={String(node.id)} 
                        label={node.name} 
                        key={node.id}
                        sx={{mt : '8px'}}
                    >
                        {node.level < 2  ? renderSubTree(category, node) : null }
                    </TreeItem>
                   ) : null
                )) }
            </TreeView>
        </Box>
    </Box>
}

export default Sidebar;