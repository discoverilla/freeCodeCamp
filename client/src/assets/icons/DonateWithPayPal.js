/* eslint-disable max-len */
import React, { Fragment } from 'react';

const propTypes = {};

function DonateWithPayPal(props) {
  return (
    <Fragment>
      <span className='sr-only'>Donate with PayPal</span>
      <svg
        height={31}
        version='1.1'
        viewBox='0 0 268 31'
        width={200}
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <g fill='none' fillRule='evenodd'>
          <g fillRule='nonzero'>
            <path
              d='m7.266 29.154 0.523-3.322-1.165-0.027h-5.563l3.866-24.513c0.023788-0.1548 0.15738-0.26883 0.314-0.268h9.38c3.114 0 5.263 0.648 6.385 1.927 0.526 0.6 0.861 1.227 1.023 1.917 0.17 0.724 0.173 1.589 7e-3 2.644l-0.012 0.077v0.676l0.526 0.298c0.40156 0.20344 0.7625 0.47864 1.065 0.812 0.45 0.513 0.741 1.165 0.864 1.938 0.127 0.795 0.085 1.741-0.123 2.812-0.24 1.232-0.628 2.305-1.152 3.183-0.46233 0.78655-1.084 1.4678-1.825 2-0.696 0.494-1.523 0.869-2.458 1.109-0.906 0.236-1.939 0.355-3.072 0.355h-0.73c-0.522 0-1.029 0.188-1.427 0.525-0.39744 0.3406-0.66109 0.8112-0.744 1.328l-0.055 0.299-0.924 5.855-0.042 0.215c-0.011 0.068-0.03 0.102-0.058 0.125-0.027124 0.022182-0.060964 0.03452-0.096 0.035h-4.507z'
              fill='#253B80'
              id='Path'
            />
            <path
              d='m23.048 7.667c-0.028 0.179-0.06 0.362-0.096 0.55-1.237 6.351-5.469 8.545-10.874 8.545h-2.752c-0.661 0-1.218 0.48-1.321 1.132l-1.409 8.936-0.399 2.533c-0.032166 0.20334 0.026281 0.41056 0.15996 0.56713 0.13367 0.15656 0.32918 0.24687 0.53504 0.24687h4.881c0.578 0 1.069-0.42 1.16-0.99l0.048-0.248 0.919-5.832 0.059-0.32c0.09-0.572 0.582-0.992 1.16-0.992h0.73c4.729 0 8.431-1.92 9.513-7.476 0.452-2.321 0.218-4.259-0.978-5.622-0.37907-0.42164-0.8318-0.77067-1.336-1.03z'
              fill='#179BD7'
              id='Path'
            />
            <path
              d='m21.754 7.151c-0.39497-0.11426-0.79677-0.20344-1.203-0.267-0.80268-0.12336-1.6139-0.18255-2.426-0.177h-7.352c-0.57812-3.5635e-4 -1.0702 0.42074-1.159 0.992l-1.564 9.906-0.045 0.289c0.10068-0.65161 0.66166-1.1323 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545 0.037-0.188 0.068-0.371 0.096-0.55-0.32641-0.17117-0.66661-0.31467-1.017-0.429-0.091862-0.03048-0.18421-0.059484-0.277-0.087z'
              fill='#222D65'
              id='a'
            />
            <path
              d='m9.614 7.699c0.088048-0.57153 0.58073-0.9928 1.159-0.991h7.352c0.871 0 1.684 0.057 2.426 0.177 0.50211 0.078912 0.99728 0.19694 1.481 0.353 0.365 0.121 0.704 0.264 1.017 0.429 0.368-2.347-3e-3 -3.945-1.272-5.392-1.399-1.593-3.924-2.275-7.155-2.275h-9.38c-0.66 0-1.223 0.48-1.325 1.133l-3.907 24.765c-0.036828 0.23269 0.029989 0.46984 0.18288 0.64907 0.15289 0.17923 0.37654 0.28261 0.61212 0.28293h5.791l1.454-9.225 1.564-9.906z'
              fill='#253B80'
            />
          </g>
          <text
            fill='#000000'
            fontFamily='PayPalSansSmallMedium-Regular, PayPal Sans Small Medium'
            fontSize={25}
          >
            <tspan x='44.2924805' y={19}>
              Donate with PayPal
            </tspan>
          </text>
        </g>
      </svg>
    </Fragment>
  );
}

DonateWithPayPal.displayName = 'DonateWithPayPal';
DonateWithPayPal.propTypes = propTypes;

export default DonateWithPayPal;
