import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
interface TextFieldProps extends ComponentPropsWithRef<"input"> {
    fullWidth?: boolean
    width?: number
    height?: number
}

export const TextField = styled.input<TextFieldProps>`
    padding: 5px;
    margin: 10px;
    size: ${({size}) => size};
    width: ${ ({fullWidth, width}) => fullWidth ? '100%' : width ? width+'px' : '10rem' };
    height: ${({height}) => height ? height+'px' : ''};
    background: transparent;
    border: none;
    border-bottom: 2px solid white;
    color: white;
    &:focus{
        outline: none;
    }
    ::placeholder {
        color: ${ ({theme}) => theme.disable };
    }
`