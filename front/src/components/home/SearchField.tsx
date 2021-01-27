import Tag from 'components/common/Tag';
import { Box } from 'components/material/Box';
import { TextButton } from 'components/material/Button';
import Text from 'components/material/Text';
import { TextField } from 'components/material/Textfield';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import media from 'styles/media';

const SearchWrapper = styled.div`
    margin: 20px 0 40px 0;
    width: min(920px, 100%);
    padding: 0;
    display: grid;
    grid-template-rows: auto 24px;
    gap: 5px;
    ${media.tablet`
        display: none;
    `}
`

interface SearchFieldProps{initialValue?:string}
const SearchField = ({initialValue}:SearchFieldProps) => {
    const [searchValue, setSearchValue] = useState(initialValue||'');
    const history = useHistory();
    const onSearched = ({which}:any) => which===13 && history.push(`/search/${searchValue}`)
    return (
        <Box transparent>
            <SearchWrapper>
                <Box transparent>
                    <TextField 
                        placeholder="검색어를 입력해주세요..."
                        fullWidth
                        height={50}
                        style={{ fontSize: 24 }}
                        value={searchValue}
                        onChange={({target:{value}}) => setSearchValue(value)}
                        onKeyPress={onSearched}
                    />
                </Box>
                <Tags />
            </SearchWrapper>
        </Box>
    )
}

const TagsDiv = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: calc(100% - 150px) 150px;
    padding: 0 10px;
`;

const Tags = () => {
    const history = useHistory();
    return (
        <TagsDiv>
            <Box transparent left rowSpace={10}>
                <Text bold> 인기 태그 목록 </Text>
                <Tag name="python"/>
                <Tag name="javascript"/>
                <Tag name="react"/>
                <Tag name="c++"/>
                <Tag name="database"/>
            </Box>
            <TextButton bold onClick={()=>history.push('/tags')}> 
                태그 더보기 
            </TextButton>
        </TagsDiv>
    )
}

export default SearchField;