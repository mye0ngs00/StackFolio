import styled from "styled-components";

const Head = styled.header`
    height: 55px;
    display: flex;
    align-items: center;
    padding: 5px 20px 5px 20px;
    color: ${({theme}) => theme.default.text};
    font-weight: 900;
    font-size: 40px;
`

const Header = () => {
    return (
        <Head>
            Clone Velog Header
        </Head>
    )
}
export default Header;