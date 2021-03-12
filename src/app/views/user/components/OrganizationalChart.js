import React, {useState, useRef} from 'react';
import {CardDeck, Card, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'
import _ from 'lodash';

const levelSettings = {
  2: {
    color: 'text-success',
    backgroundColor: 'bg-success-light',
    size: 110
  },
  3: {
    color: 'text-warning',
    backgroundColor: 'bg-warning-light',
    size: 60
  },
  4: {
    color: 'text-secondary',
    backgroundColor: 'bg-secondary-light',
    size: 20
  }
}


function Member({member}) {
  const popover = (data) => (
    <Popover id={`popover-${member.code}`} className="text-center">
      <Popover.Title as="h3" className="text-nowrap">[{data.code}]&nbsp;{data.name}</Popover.Title>
      <Popover.Content>
        <p><strong>Email</strong><br/>{data.email}</p>
      </Popover.Content>
    </Popover>
  );

  return (
    <Card className={levelSettings[member.level].backgroundColor}>
        <Card.Body>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover(member)}>
            <Button variant="link">
              <FaUserCircle size={levelSettings[member.level].size} className={levelSettings[member.level].color}/>
            </Button>
          </OverlayTrigger>
          <Group groups={member.members}/>
        </Card.Body>
    </Card>
  )
}

function Group({groups}) {
  const member = (group, i) => <Member key={i} member={group}/>;

  return (
    <CardDeck>
      {_.map(groups, member)}
    </CardDeck>
  )
}

function OrganizationalChart({data}) {
  return (
    <Group groups={data}/>
  )
}

export default OrganizationalChart;