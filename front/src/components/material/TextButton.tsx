import styled from 'styled-components';
import { ComponentPropsWithRef } from 'react';

interface TextButtonProps extends ComponentPropsWithRef<"button"> {
    fontSize?: number
    bold?: boolean
    color?: string
}


export default styled.button<TextButtonProps>`
    padding: 0;
    margin: 0;
    margin-bottom: 1px;
    border: none;
    background-color: transparent;
    outline: none;
    color: ${({color})=> color || "#4C74E2"};
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize ? fontSize+'px' : '1rem'};
`