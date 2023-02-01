import {NavigationContainer} from '@react-navigation/native';
import theme from '@theme/index';
import { View } from 'react-native';
import { AppRoutes } from './app.routes';


export function Routes(){
    return(
        <View style={{flex: 1, backgroundColor: theme.COLORS.GRAY_600}}>
            <NavigationContainer>
                <AppRoutes/>
            </NavigationContainer>
        </View>
    );
}



