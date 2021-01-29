import { Box } from 'components/material/Box';
import Text from 'components/material/Text';
import React, { useEffect, useRef, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import styled from 'styled-components';

interface ScoreElement {
    name: string
    score: number
}

function* mapColorGenerator(){
    let i=0;
    let colors = [
        '#ffd1d1', '#ffffaa', '#ff3377', '#44aaff', '#6666ff', '#f9ac82', '#596666'
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
const DrawTreeMap = ({items, width, height, colorGenerator}:{items:ScoreElement[]; width:number; height:number; colorGenerator():string}) => {
    if(!items.length) return <></>;
    else if(items.length===1){
        return (
            <Text bold style={{padding:0, width:"100%", height:"100%", background:colorGenerator()}}>
                {items[0].name}
            </Text>
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
    let ContainerStyle= width > height ?{
        gridTemplateRows: `${leftRatio}% ${100-leftRatio}%`
    } : {
        gridTemplateColumns: `${leftRatio}% ${100-leftRatio}%`
    }
    let leftProps={
        items: left,
        width,
        height: height*leftRatio/100
    }
    let rightProps={
        items: right,
        width,
        height: height*(100-leftRatio)/100
    }
    if(width>height){
        leftProps={
            items: left,
            width: width*leftRatio/100,
            height
        }
        rightProps={
            items: right,
            width: width*(100-leftRatio)/100,
            height
        }
    }
    console.log(width, height);
    return (
        <TreeContainer style={ContainerStyle}>
            <DrawTreeMap colorGenerator={colorGenerator} {...leftProps} />
            <DrawTreeMap colorGenerator={colorGenerator} {...rightProps} />
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
        react: 1305,
        graphQL: 200,
        'c++': 180,
        ml: 120
    });
    const [sorted, setSorted] = useState<ScoreElement[]>([]);
    useEffect(()=>{
        const sortedArr = Object.entries(scores).map( ([name, score]) => ({
            name,
            score,
        })).sort((a, b) => b.score - a.score);
        setSorted(sortedArr);
    }, [scores])
    
    const generator = mapColorGenerator();
    const colorGenerator = ():string => generator.next().value || "white";
    return (
        <Box transparent style={{width:"100%"}} ref={ref as React.RefObject<HTMLDivElement>}>
            <div style={{width:mapSize, height:mapSize}}>
                <DrawTreeMap items={sorted} width={mapSize} height={mapSize} colorGenerator={colorGenerator}/>
            </div>
        </Box>
    )
}

export default Treemap;