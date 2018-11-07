import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail, Media } from '@freecodecamp/react-bootstrap';

import { FullWidthRow } from '../../helpers';

const propTypes = {
  portfolio: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    })
  )
};

function Portfolio({ portfolio = [] }) {
  if (!portfolio.length) {
    return null;
  }
  return (
    <div>
      <FullWidthRow>
        <h2 className='text-center'>Portfolio</h2>
        {portfolio.map(({ title, url, image, description, id }) => (
          <Media key={id}>
            <Media.Left align='middle'>
              {image && (
                <a href={url} rel='nofollow'>
                  <Thumbnail
                    alt={`A screen shot of ${title}`}
                    src={image}
                    style={{ width: '150px' }}
                  />
                </a>
              )}
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <a href={url} rel='nofollow'>
                  {title}
                </a>
              </Media.Heading>
              <p>{description}</p>
            </Media.Body>
          </Media>
        ))}
      </FullWidthRow>
      <hr />
    </div>
  );
}

Portfolio.displayName = 'Portfolio';
Portfolio.propTypes = propTypes;

export default Portfolio;
