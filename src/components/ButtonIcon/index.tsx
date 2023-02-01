import { TouchableOpacityProps, Text } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { Container, ButtonIconStyleProps, IconDynamic } from "./styles";
import { useTheme } from "styled-components/native";


interface ButtonIconProps extends TouchableOpacityProps{
    type? : ButtonIconStyleProps;
    icon: keyof typeof Ionicons.glyphMap;

}

export function ButtonIcon({icon,type= 'PRIMARY', ...rest}: ButtonIconProps){

    const {COLORS} = useTheme();

    const color =  type === 'SECONDARY' ? COLORS.RED_DARK : COLORS.GREEN_700


    return (
        <Container {...rest}>
            
           {/* <IconDynamic icon={`${icon}`} type={type}/> */}
           <Ionicons name={`${icon}`} size={24} color={color} type={type} />
           
        </Container>
    )
}

