import { Button } from 'components/material/Button';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TagComponent = styled(Button)`
    margin: 0;
    font-size: 1rem;
    padding: 5px 10px;
    width: auto;
    border: none;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 1px 1.5px 4px ${({theme}) => theme.default.border};
    text-decoration: none;
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
    // const [name, setName] = useState('');

    // useEffect(()=>{
    //     ( async () => {
    //         const tag:TagData = await getTagById(name);
    //         if(!tag) return;
    //         setName(tag.name);
    //         setLoading(false);
    //     })();
    // }, [id])

    return (
        <Link to={`/tags/${name}`} style={{textDecoration:'none'}}>
            <TagComponent>
                { loading ? '...' : name }
            </TagComponent>
        </Link>
    )
}

export default Tag;