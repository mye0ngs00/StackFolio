import { Button } from 'components/material/Button';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface TagContainerProps {
    small?: boolean
}
const TagComponent = styled(Button)<TagContainerProps>`
    margin: 0px;
    font-size: 1rem;
    font-weight: normal;
    padding: 3px 9px;
    width: auto;
    text-decoration: none;
    opacity: 0.9;
    box-sizing: border-box;
    border-radius: 9px;
    &:focus-within {
        outline:none;
        box-shadow: 0 0 0 1.5px ${({theme}) => theme.primary.border};
    }
    padding: ${({small}) => small ? '1px 9px' : '3px 9px'};
`

interface TagProps {
    name: string
    color?: "primary" | "secondary"
    small?: boolean
}

interface TagData{
    id: string,
    name: string,
}
const getTagById = async (name:string) => ({
    id: 'a100',
    name
});
const Tag = ({name, color, small}:TagProps) => {
    const [loading, setLoading] = useState(false);
    color = color || "primary";
    const history = useHistory();

    return (
        <TagComponent color={color} onClick={()=>history.push(`/tags/${name}`)} small={small}>
            { loading ? '...' : name[0].toUpperCase()+name.slice(1) }
        </TagComponent>
    )
}

export default Tag;