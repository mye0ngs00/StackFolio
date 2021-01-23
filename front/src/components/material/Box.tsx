import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

export interface BoxProps extends ComponentPropsWithRef<"div"> {
    transparent?: boolean
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "normal"
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | "stretch"
    direction?: "row" | "row-reverse" | "column" | "column-reverse"
    left?: boolean
    right?: boolean
    rowSpace?: number
    columnSpace?: number
}

export const Box = styled.div<BoxProps>`
    display: flex;
    align-items: ${({alignItems}) => alignItems || "center"};
    ${({left, right, justifyContent}) => (!left && !right) ? `justify-content: ${justifyContent || "center"};` : ''};
    ${({left}) => left ? `justify-content: flex-start;` : ''}
    ${({right}) => right ? `justify-content: flex-end;` : ''}
    flex-direction: ${({direction}) => direction || "row"};
    ${({rowSpace}) => rowSpace && `& > *:nth-child(n+2){margin-left:${rowSpace}px;}`}
    ${({columnSpace}) => columnSpace && `& > *:nth-child(n+2){margin-top:${columnSpace}px;}`}

    background-color: ${({transparent,theme}) => transparent? 'transparent': theme.default.main};
    color: ${(props) => props.theme.default.text};
`