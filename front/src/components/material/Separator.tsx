import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: ${({theme})=>theme.divider};

    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid ${({theme})=>theme.divider};
    }

    &:not(:empty)::before {
        margin-right: 1.5em;
    }

    &:not(:empty)::after {
        margin-left: 1.5em;
    }
`