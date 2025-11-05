import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GlobalProvider } from '../providers/GlobalContext';


export default function Layout() {
    return (
        <GlobalProvider>
            <SafeAreaView>
                <Header />
                <Slot />
                <Footer />
            </SafeAreaView>
        </GlobalProvider>

    );
}