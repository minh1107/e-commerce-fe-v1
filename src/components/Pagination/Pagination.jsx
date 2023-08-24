import { useState,useEffect, memo, useLayoutEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationCustom({onclick, recordsNumber, recordPerPage}) {
  return (
    <Stack spacing={2}>
        {recordsNumber >= recordPerPage && <Pagination onChange={onclick} count={Math.ceil(recordsNumber/recordPerPage)} />}
    </Stack> 
  );
}

export default PaginationCustom