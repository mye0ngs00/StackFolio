import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
interface TextFieldProps extends ComponentPropsWithRef<"input"> {
    fullWidth?: boolean
    width?: number
    height?: number
    fontSize?: number
}

export const TextField = styled.input<TextFieldProps>`
    padding: 3px 5px;
    size: ${({size}) => size};
    width: ${ ({fullWidth, width}) => fullWidth ? 'calc(100% - 10px)' : width ? width+'px' : '10rem' };
    height: ${({height}) => height ? height+'px' : ''};
    font-size: ${({fontSize}) => fontSize ? fontSize+'px' : '1rem'};
    background: transparent;
    border: none;
    border-bottom: 1.5px solid #999;
    color: #444;
    &:focus{
        outline: none;
        border-bottom: 2.5px solid ${({theme}) => theme.primary.main }
    }
    ::placeholder {
        color: ${ ({theme}) => theme.disable };
    }
`