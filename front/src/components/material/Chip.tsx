import styled from 'styled-components';
import { Button } from './Button';

const Chip = styled(Button)`
    margin: 0;
    font-size: 1rem;
    background-color: #F3E3DF;
    padding: 5px 15px;
    width: auto;
    border: none;
    font-weight: bold;
    border-radius: 20px;
    box-shadow: 1px 1px 2px ${({theme}) => theme.default.border};
    text-decoration: none;
    &:focus-within {
        outline:none;
        box-shadow: 0 0 0 1px ${({theme}) => theme.default.border};
    }
`

export default Chip;