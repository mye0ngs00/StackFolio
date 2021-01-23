import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
interface TextFieldProps extends ComponentPropsWithRef<"input"> {
    fullWidth?: boolean
    width?: number
    height?: number
}

export const TextField = styled.input<TextFieldProps>`
    padding: 10px;
    margin: 10px;
    size: ${({size}) => size};
    width: ${ ({fullWidth, width}) => fullWidth ? '100%' : width ? width+'px' : '10rem' };
    height: ${({height}) => height ? height+'px' : ''};
    background: ${ ({theme}) => theme.default.main };
    border-color: ${ ({theme}) => theme.default.border };
    border-radius: 3px;
    color: ${ ({theme}) => theme.default.text };
    &:focus{
        outline-color: ${ ({theme}) => theme.default.accent };
    }
    ::placeholder {
        color: ${ ({theme}) => theme.disable };
    }
`