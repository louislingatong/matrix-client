import React from 'react';
import {useSelector} from 'react-redux';
import {Container} from 'react-bootstrap';
import _ from 'lodash';
import {userData} from '../../../store/userSlice';

function UserView() {
  const user = useSelector(userData);

  return (
    <Container>
    </Container>
  )
}

export default UserView;