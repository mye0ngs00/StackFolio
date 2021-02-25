import Tag from 'components/common/Tag';
import { Box } from 'components/material/Box';
import { Subtitle } from 'components/material/Text';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(Box)`
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.divider};
    padding: 10px;
`

interface TrendTagsProps {
    tags: string[]
}
const TrendTags = ({tags}:TrendTagsProps) => (
    <Wrapper left rowSpace={5}>
        <Subtitle> 인기 태그 목록 </Subtitle>
        <Box left rowSpace={5}>
            {tags.map((tag, idx) => 
                <Tag key={idx} color="primary" name={tag} />
            )}
        </Box>
    </Wrapper>
)

export default TrendTags;