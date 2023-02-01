import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {Ionicons} from '@expo/vector-icons'


export type ButtonIconStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonIconStyleProps;

}

export const Container = styled(TouchableOpacity)`

    width: 56px;
    height: 56px;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
`

export const IconDynamic = styled(Ionicons).attrs<Props>(({theme, type})=> ({
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
    size: 24

}))`


`