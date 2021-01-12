import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
interface TextFieldProps extends ComponentPropsWithRef<"input"> {
    fullWidth?: boolean
}

export const TextField = styled.input<TextFieldProps>`
    padding: 10px;
    margin: 10px;
    size: ${({size}) => size};
    width: ${ ({fullWidth}) => fullWidth ? '100%' : '10rem' };
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