import { TouchableOpacity } from "react-native";
import styled, {css} from "styled-components/native";


export type ButtonStyleProps = 'PRIMARY' | 'SECONDARY' 

type ButtonProps = {
    type: ButtonStyleProps

}

export const Container = styled(TouchableOpacity)<ButtonProps>`

    flex: 1;
    min-height: 56px;
    max-height: 56px;
    border-radius: 6px;
    background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`


export const Title = styled.Text`

${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
/* 
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme }) => theme.COLORS.WHITE}; */
`