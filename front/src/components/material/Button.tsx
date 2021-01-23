import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { Colorset } from "styles/styled";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    fontSize?: number
    fullWidth?: boolean
    color?: "primary" | "secondary" | "default"
    bold?: boolean
}

export const Button = styled.button<ButtonProps>`
    /* This renders the buttons above... Edit me! */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: ${({fullWidth}) => fullWidth ? "100%" : '10rem'};
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize+'px' || '1rem'};

    // 수정 필요!
    ${ ({color, theme})=> {
        const colorset: Colorset = !color ? theme.default : theme[color];
        return `
            background: ${colorset.main};
            color: ${colorset.text};
            border: thin solid ${colorset.border};
            &:focus-within {
                outline: ${colorset.accent} auto thin;
            }
        `
    }}
`
export const TextButton = styled.a<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    background: ${({theme}) => theme.mainBackground};
    text-align: center;
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize+'px' || '1rem'};

    // 수정 필요!
    ${ ({color, theme})=> {
        const colorset: Colorset = !color ? theme.default : theme[color];
        return `
            color: ${colorset.text};
            &:hover {
                color: ${colorset.accent};
            }
        `
    }}
`