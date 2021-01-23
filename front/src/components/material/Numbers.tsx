import React from 'react';
import Text, {TextProps} from "./Text"

export interface NumbersProp extends TextProps {
    value: number
}
export const Numbers = ({value, ...others}:NumbersProp) => {
    let val = value;
    let unit = '';
    if(value > 1000000000){
        unit = 'b';
        val = Math.floor(value/100000000)/10;
    }
    else if(value > 1000000){
        unit = 'm';
        val = Math.floor(value/100000)/10;
    }
    else if(value > 1000){
        unit = 'k';
        val = Math.floor(value/100)/10;
    }
    return (<Text {...others}> {val+unit} </Text>)
}