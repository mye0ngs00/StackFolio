import { Box } from "components/material/Box";
import styled from "styled-components";
const Wrapper = styled.div`
    width:min(1470px, calc(100% - 30px));
    padding: 20px 0 40px 0;
`
export default ({children}:any) => (
    <Box style={{width:"100%"}}>
        <Wrapper>
            {children}
        </Wrapper>
    </Box>
);