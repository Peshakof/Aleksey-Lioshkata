import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Carousel from './components/image carousel';
import ImgForm from './components/add-img-form';
import Dashboard from './components/dashboard';
import RegisterPage from './components/register page';
import LoginPage from './components/login page';
import ProtectedRoute from './components/protected-route';
import Logout from './components/logout';
import UserProfile from './components/user profile';
import ImageInfo from './components/image-info';
import Category from './components/dashboard/category';

import { Auth } from './components/contexts/user-context';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import { GlobalStyles } from './global';

import './App.css';

function App(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');
  const appRef = useRef();

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const readCookie = () => {
    const authCookie = Cookies.get('token') !== undefined;
    if(authCookie) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    readCookie();
  },[]);

  return (
    <div className="App" >
      <Auth>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
          <Router >
            <Navigation toggleTheme={toggleTheme} appRef={appRef}/>
            <div ref={appRef}>
              <Switch>
                <Route path="/" exact component={Carousel} />
                <ProtectedRoute path="/upload-image" exact component={ImgForm} />
                <ProtectedRoute path="/user-profile" exact component={UserProfile} />
                {/* <ProtectedRoute path="/image-info/:id" exact component={ImageInfo} /> */}
                <Route path="/image-info/:id" exact component={ImageInfo}  />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dashboard/sport" exact render={() => (<Category category={"sport"} />)} />
                <Route path="/dashboard/pet" exact render={() => (<Category category={"pet"} />)} />
                <Route path="/dashboard/cars" exact render={() => (<Category category={"cars"} />)} />
                <Route path="/dashboard/people" render={() => (<Category category={"people"} />)} />
                <Route path="/dashboard/landscape" render={() => (<Category category={"landscape"} />)} />
                <Route path="/dashboard/houses" exact render={() => (<Category category={"houses"} />)} />
                <Route path="/dashboard/nature" exact render={() => (<Category category={"nature"} />)} />
                <Route path="/dashboard/high-tech" exact render={() => (<Category category={"high-tech"} />)} />
                <Route path="/dashboard/places" exact render={() => (<Category category={"places"} />)} />
                <Route path="/signup" exact component={RegisterPage}/>
                <Route path="/signin" exact component={LoginPage}/>
                <Route path="/logout" exact component={Logout}/>
              </Switch>
            </div>
            <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
          </Router>
        </ThemeProvider>
      </Auth>
    </div>
  );
}

export default App;