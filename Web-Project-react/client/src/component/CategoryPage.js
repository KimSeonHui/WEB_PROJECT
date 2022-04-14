import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Container, InputBase, Button} from '@mui/material';
import {TreeView, TreeItem } from '@mui/lab';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

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

function CategoryPage({categories}) {
    const [category, setCategory] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [name, setName] = useState('');

    const onChange = (e) => {
        setName(e.target.value);
    }

    const handleToggle = (e, nodeIds) => {
        setExpanded(nodeIds);
    }

    const expandingAll = () => {
        const parents = [];
        if(categories.length !== undefined && expanded.length === 0) {          
            for(let i = 0; i < categories.length; i++) {
                for(let j = 0; j < categories.length; j++) {
                    if(categories[i].id === String(categories[j].parent)) {
                        parents.push(categories[i].id);
                    }
                }
            }
            setExpanded(parents);
        }
    }

    useEffect(()=> {
        setCategory(categories);
        expandingAll();
    }, [categories]);

    const selectedNode = (e, nodeId) => {
        setSelected(nodeId);        
    }

    const getSelectedNode = () => {
        let selectedNode = null;
        for(let i = 0; i < category.length; i++) {
            if(category[i].id === String(selected)) {
                selectedNode = category[i];
            }
        }

        return selectedNode;
    }

    const addCategory = () => {
        const selectedNode = getSelectedNode();

        if(selectedNode !== null && selectedNode.level === '2') {
            alert('더 이상 하위 카테고리를 생성할 수 없습니다.');
            return false;
        }

        const newNode = {
            id : String(category.length + 1),
            name : name, 
            parent : (selected === -1) ? '#' : selected,
            level : (selected === -1) ? '0' :`${parseInt(selectedNode.level + 1)}`
        }

        const allCategory = category.concat(newNode);
        setCategory(allCategory);
    }

    const deleteCategory = () => {
        console.log('selected', selected);
        const children = [];
        for(let i = 0; i < category.length; i++) {
            if(selected === String(category[i].parent)) {
                children.push(category[i]);
            }
        }

        console.log('children', children);

        if(children.length > 0) {
            if(window.confirm('하위 카테고리와 글도 모두 삭제 됩니다.\n카테고리를 삭제하시겠습니까?')) {
                let removeChildren = category.concat([]);

                children.forEach((child) => {
                    const index = removeChildren.indexOf(child);
                    removeChildren = removeChildren.slice(0, index).concat(removeChildren.slice(index+1, removeChildren.length));
                });

                const allCategory = removeChildren.slice(0, selected-1).concat(removeChildren.slice(selected, removeChildren.length));
                setCategory(allCategory);
            }
            else {
                return false;
            }

        }
        else {
            const allCategory = category.slice(0, selected-1).concat(category.slice(selected, category.length));
            setCategory(allCategory);
        }
    }

    return <Container maxWidth="xl">
    <Box sx={{width : "100%", p : '20px'}}>
    <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            카테고리 관리
        </Typography>
    </Box>
    <Divider />

    <Box sx={{display : 'flex', justifyContent : 'center', mt : 3}} >
        <Box sx={{display : 'flex', flexDirection : 'column' }} >
            <InputBase 
                name='categorySearch'
                placeholder='카테고리 검색'
                sx={{
                    width : '350px',
                    border : 1, 
                    borderRadius: '6px', 
                    borderColor : '#d3d3d3',
                    py : 1,
                    pl : 1
                }}
            />
            <Box sx={{
                    width : '350px',
                    border : 'solid',
                    borderRadius : '6px',
                    borderColor : 'black',
                    mt : 1,
                    mb : 0,
                    pb : 2
                }} 
            >
                <Box sx={{textAlign : 'center'}} >
                    <p style={{backgroundColor : '#212529', color : 'white', paddingTop : '1em', paddingBottom : '1em'}} >
                        카테고리 전체보기
                    </p>
                </Box>
                <Box sx={{overflowX : 'auto', ml : 4}}>
                        < TreeView
                            aria-label="rich object"
                            defaultCollapseIcon={<FolderOpenOutlinedIcon />}
                            defaultExpandIcon={<FolderOutlinedIcon />}
                            expanded={expanded}
                            onNodeToggle={handleToggle}
                            onNodeSelect={selectedNode}
                        >
                            { category.length !== undefined ? Object.values(category).map((node) => ( 
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
                            )) : null }
                        </TreeView>
                    </Box>
            </Box>
        </Box>


        <Box sx={{ml : 4, verticalAlign : 'center'}}>
            <Box sx={{display : 'flex', justifyContent : 'center', mb : 3}} >
                <Button variant='outlined' type='button' sx={{mr : 1, py : 1, mt : 0.5}} onClick={addCategory}>카테고리 추가</Button>
                <Button variant='outlined' type='button' sx={{mr : 1, py : 1, mt : 0.5}} onClick={deleteCategory}>카테고리 삭제</Button>
                <Button variant='outlined' type='button' sx={{py : 1, mt : 0.5}}>저장</Button>
            </Box>
            <Box sx={{display : 'flex', alignItems : 'center'}}>
                <label htmlFor="categoryName">카테고리명</label>
                <InputBase 
                    id='categoryName'
                    name='categoryName'
                    placeholder=''
                    value={name}
                    onChange={onChange}
                    sx={{
                        width : '200px',
                        border : 1, 
                        borderRadius: '6px', 
                        borderColor : '#d3d3d3',
                        py : 1,
                        pl : 1,
                        ml : 1
                    }}
                />
            </Box>

        </Box>

    </Box>

</Box>
</Container>
}

export default CategoryPage;