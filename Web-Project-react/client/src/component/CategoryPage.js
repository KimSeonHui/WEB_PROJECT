import { Box, Typography, Divider, Container, InputBase, Button } from '@mui/material';

function CategoryPage() {

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
                    height : '600px',
                    border : 'solid',
                    borderRadius : '6px',
                    borderColor : 'black',
                    mt : 1,
                    mb : 0
                }} 
            >
                <Box sx={{textAlign : 'center'}} >
                    <p style={{backgroundColor : '#212529', color : 'white', paddingTop : '1em', paddingBottom : '1em'}} >카테고리 전체보기</p>
                </Box>
            </Box>
        </Box>


        <Box sx={{ml : 4, verticalAlign : 'center'}}>
            <Box sx={{display : 'flex', justifyContent : 'center', mb : 3}} >
                <Button variant='outlined' type='button' sx={{mr : 1, py : 1, mt : 0.5}}>카테고리 추가</Button>
                <Button variant='outlined' type='button' sx={{mr : 1, py : 1, mt : 0.5}}>카테고리 삭제</Button>
                <Button variant='outlined' type='button' sx={{py : 1, mt : 0.5}}>저장</Button>
            </Box>
            <Box sx={{display : 'flex', alignItems : 'center'}}>
                <label htmlFor="categoryName">카테고리명</label>
                <InputBase 
                    id='categoryName'
                    name='categoryName'
                    placeholder=''
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