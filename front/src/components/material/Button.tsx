import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { Colorset } from "styles/styled";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    fullWidth?: boolean
    color?: "primary" | "secondary" | "default"
}
export const Button = styled.button<ButtonProps>`
    /* This renders the buttons above... Edit me! */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: ${({fullWidth}) => fullWidth ? "100%" : "11rem"};

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
