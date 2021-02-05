import { Box } from 'components/material/Box';
import Text from 'components/material/Text';
import React, { useEffect, useRef, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface ScoreElement {
    name: string
    score: number
    color: string
}

function* mapColorGenerator(){
    let i=0;
    let colors = [
        '#ffd1d1', '#ffffaa', '#ff3377', '#44aaff', '#6666ff', '#f9ac82', '#59afff', '#d1ffd1'
    ]
    while(true){
        yield colors[i];
        i++;
        if(i>=colors.length) i%=colors.length;
    }
}
const TreeContainer = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
`
const TreeLeaf = styled(Text)`
    padding: 0;
    width: 100%;
    height: 100%;
    color: black;
    background: ${props => props.color};
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
        z-index:1;
        box-shadow: 0 15px 15px rgba(0,0,0,0.3);
    }
`
const DrawTreeMap = ({items, width, height}:{items:ScoreElement[]; width:number; height:number}) => {
    const history = useHistory();
    if(!items.length) return <></>;
    else if(items.length===1){
        return (
            <TreeLeaf bold color={items[0].color} onClick={()=>history.push(`/tags/${items[0].name}`)}>
                {items[0].name}
            </TreeLeaf>
        )
    }
    const sum = items.reduce((acc, item) => acc + item.score, 0);

    let leftSum = 0;
    let idx = 0;
    for(idx; idx<items.length; idx++){
        leftSum+=items[idx].score;
        if(leftSum >= sum/2) break;
    }
    const [left, right] = [items.slice(0,idx+1), items.slice(idx+1, items.length)];
    const leftRatio = Math.floor(100*leftSum/sum);
    const ContainerStyle= width < height ?{
        gridTemplateRows: `${leftRatio}% ${100-leftRatio}%`
    } : {
        gridTemplateColumns: `${leftRatio}% ${100-leftRatio}%`
    }
    const leftProps= width<height ? {
        width,
        height: height*leftRatio/100
    } : {
        width: width*leftRatio/100,
        height
    }
    const rightProps= width<height ? {
        width,
        height: height*(100-leftRatio)/100
    } : {
        width: width*(100-leftRatio)/100,
        height
    }
    return (
        <TreeContainer style={ContainerStyle}>
            <DrawTreeMap items={left} {...leftProps} />
            <DrawTreeMap items={right} {...rightProps} />
        </TreeContainer>
    )
}

const Treemap = () =>{
    const { ref, width } = useDimensions();
    const [ mapSize, setMapSize ] = useState(0);

    useEffect(()=>{
        setMapSize(Math.min(width, 400))
    },[width])

    const [scores, setScores] = useState({
        javascript: 804,
        python: 490,
        react: 1905,
        algorithm: 1000,
        graphQL: 200,
        css: 690,
        'c++': 180,
        ml: 120
    });
    const [sorted, setSorted] = useState<ScoreElement[]>([]);
    const generator = mapColorGenerator();
    const colorGenerator = ():string => generator.next().value || "white";
    useEffect(()=>{
        const sortedArr = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map( ([name, score]) => ({
                name,
                score,
                color: colorGenerator()
            }));
        setSorted(sortedArr);
    }, [scores])
    
    return (
        <Box transparent style={{width:"100%"}} ref={ref as React.RefObject<HTMLDivElement>}>
            <div style={{width:mapSize, height:mapSize}}>
                <DrawTreeMap items={sorted} width={mapSize} height={mapSize}/>
            </div>
        </Box>
    )
}

export default Treemap;