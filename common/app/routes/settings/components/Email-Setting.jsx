import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import FA from 'react-fontawesome';
import classnames from 'classnames';

export function UpdateEmailButton() {
  return (
    <Button
      block={ true }
      bsSize='lg'
      bsStyle='primary'
      className='btn-link-social'
      >
      <FA name='envelope' />
      Update my Email
    </Button>
  );
}

export default function EmailSettings({
  email,
  sendMonthlyEmail,
  sendNotificationEmail,
  sendQuincyEmail
}) {
  if (!email) {
    return (
      <div>
        <Row>
          <p className='large-p text-center'>
            You don't have an email id associated to this account.
          </p>
        </Row>
        <Row>
          <UpdateEmailButton />
        </Row>
      </div>
    );
  }
  return (
    <div>
      <Row>
        <p className='large-p text-center'>
          <em>{ email }</em>
        </p>
      </Row>
      <Row>
        <UpdateEmailButton />
      </Row>
      <Row>
        <Col xs={ 9 }>
          <p className='large-p'>
            Send me announcement emails
            <br />
            (we'll send you these every Thursday)
          </p>
        </Col>
        <Col xs={ 3 }>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            className={
              classnames('positive-20', { active: sendMonthlyEmail })
            }
            >
            { sendMonthlyEmail ? 'On' : 'Off' }
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={ 9 }>
          <p className='large-p'>
            Send me notification emails
            <br />
            (these will pertain to your account)
          </p>
        </Col>
        <Col xs={ 3 }>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            className={
              classnames('positive-20', { active: sendNotificationEmail })
            }
            >
            { sendNotificationEmail ? 'On' : 'Off' }
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={ 9 }>
          <p className='large-p'>
            Send me Quincy's weekly email
            <br />
            (with new articles every Tuesday)
          </p>
        </Col>
        <Col xs={ 3 }>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            className={
              classnames('positive-20', { active: sendQuincyEmail })
            }
            >
            { sendQuincyEmail ? 'On' : 'Off' }
          </Button>
        </Col>
      </Row>
    </div>
  );
}

EmailSettings.propTypes = {
  email: PropTypes.string,
  sendMonthlyEmail: PropTypes.bool,
  sendNotificationEmail: PropTypes.bool,
  sendQuincyEmail: PropTypes.bool
};
