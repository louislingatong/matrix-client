import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button, Badge} from 'react-bootstrap';
import {FaShoppingBasket} from 'react-icons/fa';
import {bagItemsCount} from '../../../../store/bagSlice';

function BagBadge() {
  const location = useLocation();
  const itemsCount = useSelector(bagItemsCount);
  return (
    <Button variant="link"
            to={{pathname: '/bag', state: {from: location.pathname}}} as={Link}>
      <FaShoppingBasket size={20}/>
      {itemsCount > 0 && <Badge>{itemsCount}</Badge>}
    </Button>
  )
};

export default BagBadge;