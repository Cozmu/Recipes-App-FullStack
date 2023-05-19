import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <main>
      <Header />
      <SearchBar />
      <Footer />
      { pathname === '/meals' ? <Meals /> : <Drinks /> }
    </main>
  );
}

export default Recipes;
