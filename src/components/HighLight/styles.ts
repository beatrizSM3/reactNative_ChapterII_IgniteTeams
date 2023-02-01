import styled, {css} from "styled-components/native";


export const Container = styled.View`

width: 100%;
margin: 32px 0;


`

export const Title = styled.Text`

font-size: 24px;
text-align: center;

${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `};

/* 
font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
color: ${({theme}) => theme.COLORS.WHITE}; */
`




export const SubTitle = styled.Text`

font-size: 24px;
text-align: center;


${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `};

/* 
font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
color: ${({theme}) => theme.COLORS.GRAY_300}; */


`