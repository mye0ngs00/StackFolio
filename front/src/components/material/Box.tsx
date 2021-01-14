import styled from 'styled-components';
export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: ${(props) => props.theme.default.main};
    color: ${(props) => props.theme.default.text};
`