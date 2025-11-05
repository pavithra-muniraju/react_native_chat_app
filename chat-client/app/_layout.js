import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalProvider } from '../providers/GlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return(
        <GlobalProvider>
            <SafeAreaView>
                <Header />
                <Slot />
                <Footer />    
            </SafeAreaView>
        </GlobalProvider>
    );    
};

export default Layout;