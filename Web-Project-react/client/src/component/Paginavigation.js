import { Box, Pagination, PaginationItem, Link } from '@mui/material';

const maxRow = 20;


function Paginavigation({ cid, page, post }) {

    console.log('pagination post', post)

    return <Box sx={{display : 'flex', justifyContent : 'center', mt: 6 }}>
        <Pagination 
            count={post.length !== undefined ? Math.ceil(400 / maxRow) : 0} 
            shape="rounded" 
            color='info'
            hidePrevButton 
            hideNextButton 
            showFirstButton 
            showLastButton
            boundaryCount={10}
            defaultPage={parseInt(page)}
            renderItem={(item) => {
                if(item.page <= 10 || item.type === 'last') {
                    return <PaginationItem
                    component={Link}
                    href={`/board/${cid}/${item.page}`}
                    type={item.type}
                    page={item.page}
                    selected={item.selected}
                    shape='rounded'
                    color='info'
                  />
                  
                }           
                
            }}
        />
    </Box>
}

export default Paginavigation;