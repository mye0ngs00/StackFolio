import SearchField from 'components/search/SearchField';
import { Box } from 'components/material/Box';
import { PostData } from 'db/Post';
import { SearchData, getSearchData } from 'db/Search';
import React, { useEffect, useState } from 'react';
import { Button } from 'components/material/Button';

const Search = ({match}:any) => {
    const {params:{keyword}} = match;
    const [{results}, setSearchResult] = useState<SearchData>({
        keyword, results:[]
    })
    useEffect(()=>{
        (async()=>{
            const searchResultData = await getSearchData(keyword);
            setSearchResult(searchResultData);
        })();
    },[])
    return (
        <>
            <SearchField />
            <Box transparent direction="row" left rowSpace={30}>
                <Button color="ghost" >포스트</Button>
                <Button color="ghost" >질문게시판</Button>
            </Box>
            {
                // results.map( (result:PostData) => {
                // })
            }
        </>
    )
}

export default Search;