import React from 'react';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

interface SwitchProps extends Omit<ComponentPropsWithRef<"input">, 'size'>  {
    size?: 'sm'| 'md' | 'lg'
}

const ID = () => '_'+Math.random().toString(36).substr(6);


export const Switch = (props:SwitchProps) => {
    const {size, ...inputProps} = props;
    const id = 'checkbox' + ID();
    const [w, r] = size ==='md' ? [60,30] : size ==='lg' ?[84,40] : [42,26];
    return (
        <CheckBoxWrapper>
            <CheckBox id={id} type="checkbox" w={w} r={r} {...inputProps} />
            <CheckBoxLabel htmlFor={id} w={w} r={r}/>
        </CheckBoxWrapper>
    );
};
  
const CheckBoxWrapper = styled.div`
position: relative;
`;
interface CheckBoxLabelProps extends ComponentPropsWithRef<"label">{
    w: number
    r: number
}
const CheckBoxLabel = styled.label<CheckBoxLabelProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.w}px;
    height: ${props => props.r}px;
    border-radius: ${props => props.w-props.r}px;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width:  ${props => props.r-6}px;
        height:  ${props => props.r-6}px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }
`;

interface CheckBoxProps extends ComponentPropsWithRef<"input">{
    w: number
    r: number
}
const CheckBox = styled.input<CheckBoxProps>`
    opacity: 0;
    z-index: 1;
    border-radius: ${props => props.w-props.r}px;
    width: ${props => props.w}px;
    height: ${props => props.r}px;
    &:checked + ${CheckBoxLabel} {
        background: #4fbe79;
        &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width:  ${props => props.r-6}px;
        height:  ${props => props.r-6}px;
        margin-left:${props => props.w-props.r+3}px;
        transition: 0.2s;
    }
}
  `;