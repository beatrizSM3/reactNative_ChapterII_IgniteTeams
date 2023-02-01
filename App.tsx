import { StatusBar } from 'react-native';
import { Groups } from '@screens/Groups';
import { Players } from '@screens/Players';
import { NewGroup } from '@screens/NewGroup';
import {ThemeProvider} from 'styled-components/native';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';
import theme from '@theme/index';
import { Loading } from '@components/Loading';
import { Routes } from './src/Routes/index';

export default function App() {

   const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' backgroundColor='transparent'  translucent />
      {fontsLoaded?  <Routes/>: <Loading/>}
    </ThemeProvider>
  );
}

