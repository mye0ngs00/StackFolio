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
    background-color: transparent;
    color: ${({color}) => color || ''};
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize+'px' || '1rem'};
`

export const Head = (props:TextProps) => <Text fontSize={48} bold left {...props}/>
export const Title = (props:TextProps) => <Text fontSize={36} bold left {...props}/>
export const Subtitle = (props:TextProps) => <Text fontSize={24} left {...props}/>
export const Contents = (props:TextProps) => <Text fontSize={21} left {...props}/>
export const Infos = (props:TextProps) => <Text fontSize={16} left {...props}/>

export default Text;