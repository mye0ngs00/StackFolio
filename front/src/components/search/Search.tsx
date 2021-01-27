import SearchField from 'components/home/SearchField';
import { Box } from 'components/material/Box';
import { TextButton } from 'components/material/Button';
import { PostData } from 'db/Post';
import { SearchData, getSearchData } from 'db/Search';
import React, { useEffect, useState } from 'react';

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
                <TextButton bold>포스트</TextButton>
                <TextButton bold>질문게시판</TextButton>
            </Box>
            {
                // results.map( (result:PostData) => {
                // })
            }
        </>
    )
}

export default Search;