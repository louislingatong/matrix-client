import React from 'react';
import {useSelector} from 'react-redux';
import {Container} from 'react-bootstrap';
import _ from 'lodash';
import ProductSearch from '../../components/product-search/ProductSearch';
import {loggedInStatus, loggedInUser} from '../../store/authSlice';

function Home() {
  const isAuthenticated = useSelector(loggedInStatus);
  const profile = useSelector(loggedInUser);

  return (
    <Container>
      {
        (!isAuthenticated || (_.isString(profile.user.role) && profile.user.role !== 'ADMIN')) && <ProductSearch/>
      }
    </Container>
  )
}

export default Home;