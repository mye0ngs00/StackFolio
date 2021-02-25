import { Box } from "components/material/Box";
import styled from "styled-components";
const MainWrapper = styled.div`
    width:min(1470px, calc(100% - 30px));
    padding: 20px 0 40px 0;
`

// 데스크탑 이상 사이즈의 화면에서 양측 여백을 관리하는 Wrapper
export default ({children}:any) => (
    <Box style={{width:"100%"}}>
        <MainWrapper>
            {children}
        </MainWrapper>
    </Box>
);