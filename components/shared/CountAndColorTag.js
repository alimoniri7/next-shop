import { Box } from '@mui/system';
import React from 'react';

const CountAndColorTag = ({count, color}) => {
    return (
        <Box width='50px' borderRadius='10px' border='2px solid #e5e5e5' overflow='hidden' >
            <Box width='100%' height='40px' bgcolor={color}></Box>
            <Box bgcolor='#bdbdbd' padding='.3rem 0' width='100%' textAlign='center' fontWeight={900} fontSize='.8rem'  >{count}</Box>
        </Box>
    );
};

export default CountAndColorTag;