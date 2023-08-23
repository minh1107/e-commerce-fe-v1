import { useState,useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationCustom({onclick, pageNumbers}) {
    const [countNumber, setCountNumber] = useState(1)
    useEffect(() => {
        setCountNumber(Math.ceil(pageNumbers/process.env.REACT_APP_LIMIT_RECORD || 1))
    }, [])
    console.log(countNumber)
  return (
    <Stack spacing={2}>
        {pageNumbers >= 16 && <Pagination onChange={onclick} count={countNumber} />}
    </Stack> 
  );
}

export default PaginationCustom