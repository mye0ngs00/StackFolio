import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { Colorset } from "styles/styled";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    fontSize?: number
    fullWidth?: boolean
    color?: "primary" | "secondary" | "ghost"
    bold?: boolean
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
    font-size: ${({fontSize}) => fontSize+'px' || '2rem'};

    // 수정 필요!
    ${ ({color, theme})=> {
        const colorset: Colorset = !color ? theme.primary : theme[color];
        return `
            background: ${colorset.main};
            color: ${colorset.text};
            border: ${colorset.border} solid thin;
            &:hover {
                background: ${colorset.accent};
                outline: none;
            }
        `
    }}
`