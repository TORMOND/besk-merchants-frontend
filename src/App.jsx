import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import ProductPage from './Pages/ProductPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignupPage';
import Cart from './Pages/Cart';
import FilteredCategoryPage from './Pages/FilteredCategories';
import ForgotPassword from './Pages/ForgotPassword';
import Contacts from './Pages/Contacts';
import OrdersPage from './Pages/OrdersPage';
import ProfilePage from './Pages/ProfilePage';
import ReturnPolicy from './Pages/ReturnPolicy';
import About from './Pages/About';
import TermsConditions from './Pages/TermsConditions';
import Catalog from './Pages/Catalog';
import FrequentQuestions from './Pages/FrequentQuestions';
import SearchCatalog from './Pages/SearchCatalog';
import Paypal from './Pages/PayPal';

function App() {

  return (
    <div className="App">
<Router>
   
  <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/LoginPage' element={<LoginPage />}></Route>
    <Route path='/SignupPage' element={<SignUpPage />}></Route>
    <Route path='/Orders' element={<OrdersPage />} ></Route>
    <Route path='/ForgotPassword' element={<ForgotPassword />} ></Route>
    <Route path='/cart' component={Cart} element={<Cart/>}></Route>
    <Route path="/cart:param1" element={<Cart/>} />
    <Route path='/paypal' element={<Paypal/>}></Route>
    <Route path='/FrequentQuestions' element={<FrequentQuestions/>}></Route>
    <Route path='/catalog/:categ/:searchTerm' element={<Catalog/>}></Route>
    <Route path='/search-catalog/:searchTerm' element={<SearchCatalog/>}></Route>
    <Route path='/return-policy' element={<ReturnPolicy />}></Route>
    <Route path='/About' element={<About />}></Route>
    <Route path='/Terms & Conditions' element={<TermsConditions />}></Route>
    <Route path='/Profile' element={<ProfilePage />}></Route>
    <Route path='/contactUs' element={<Contacts/>}></Route>
    <Route path='/ProductPage/:id' component={ProductPage} element={<ProductPage/>}></Route>
    <Route path='/Category/:categoryName' element={<FilteredCategoryPage />}></Route>
    <Route path="*"  element={<NotFound />}></Route>
  </Routes>

</Router>

    </div>
  );
}

export default App;
