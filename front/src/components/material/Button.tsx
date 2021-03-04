import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { Colorset } from "styles/styled";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    fontSize?: number
    fullWidth?: boolean
    color?: "primary" | "secondary" | "ghost" | "text"
    bold?: boolean
    disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: ${({fullWidth}) => fullWidth ? "100%" : '8rem'};
    font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
    font-size: ${({fontSize}) => fontSize ? fontSize+'px' : '1rem'};
    outline: none;

    ${ ({color, theme, disabled})=> {
        const colorset: Colorset = !color ? theme.primary : color==="text" ? theme.ghost : theme[color];
        return `
            background: ${ disabled? colorset.disabled : colorset.main};
            color: ${colorset.text};
            border: ${colorset.border} solid thin;
            ${!disabled &&`
                &:hover {
                    background: ${color==="text" ? 'transparent' : colorset.accent };
                    outline: none;
                }
            `}
        `
    }}
`