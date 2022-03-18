import { Box, Pagination, PaginationItem, Link } from '@mui/material';

function Paginavigation({ cid, page }) {

    return <Box sx={{display : 'flex', justifyContent : 'center', mt: 6 }}>
        <Pagination 
            count={10} 
            shape="rounded" 
            color='info'
            hidePrevButton 
            hideNextButton 
            showFirstButton 
            showLastButton
            boundaryCount={5}
            defaultPage={parseInt(page)}
            renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/board/${cid}/${item.page}`}
                  {...item}
                />
            )}
        />
    </Box>
}

export default Paginavigation;