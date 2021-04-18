import React from 'react';
import {useSelector} from 'react-redux';
import {Container} from 'react-bootstrap';
import ProductSearch from '../../components/product-search/ProductSearch';
import {loggedInStatus} from '../../store/authSlice';

function Home() {
  const isAuthenticated = useSelector(loggedInStatus);

  return (
    <Container>
      <ProductSearch/>
    </Container>
  )
}

export default Home;