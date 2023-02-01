import {Container, Title, FilterStyleProps} from './styles'
import { TouchableOpacityProps } from 'react-native'

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
    title: string;
}

export function Filter({title, active=false , ...rest}: FilterProps) {

    return (
        <Container active={active} {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}