import { Button } from 'components/material/Button';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TagComponent = styled(Button)`
    margin: 0;
    font-size: 1rem;
    padding: 6px 12px;
    width: auto;
    border: none;
    border-radius: 10px;
    box-shadow: 1px 1.5px 4px ${({theme}) => theme.primary.border};
    text-decoration: none;
    &:focus-within {
        outline:none;
        box-shadow: 0 0 0 1.5px ${({theme}) => theme.primary.border};
    }
`

interface TagProps {
    name: string
}

interface TagData{
    id: string,
    name: string,
}
const getTagById = async (name:string) => ({
    id: 'a100',
    name
});
const Tag = ({name}:TagProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <Link to={`/tags/${name}`} style={{textDecoration:'none'}}>
            <TagComponent>
                { loading ? '...' : name[0].toUpperCase()+name.slice(1) }
            </TagComponent>
        </Link>
    )
}

export default Tag;