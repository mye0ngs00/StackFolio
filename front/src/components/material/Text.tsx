import styled from 'styled-components';
import { Box, BoxProps } from './Box';

export interface TextProps extends BoxProps{
    bold?: boolean
    color?: string
    fontSize?: number
}

const Text = styled(Box)<TextProps>`
    width: auto;
    padding: 5px;
    background-color: ${({theme}) => theme.mainBackground};
    color: ${({color}) => color || ''};
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize+'px' || '1rem'};
`
export default Text;