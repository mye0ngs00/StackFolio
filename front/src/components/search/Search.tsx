import SearchField from 'components/home/SearchField';
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
            {
                // results.map( (result:PostData) => {
                // })
            }
        </>
    )
}

export default Search;