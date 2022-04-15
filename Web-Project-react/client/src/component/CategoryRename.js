import { useState } from 'react';
import {InputBase, Box } from "@mui/material";

function CategoryRename({name}) {
    return <Box >
            <InputBase
                name='renameForm'
                placeholder={`${name}`}
                disabled={true}
                sx={{
                    width : '100%',
                    border : 1, 
                    borderRadius: '6px', 
                    borderColor : '#d3d3d3',
                    py : 1,
                    pl : 1
                }}
            />;
    </Box>
}

export default CategoryRename;