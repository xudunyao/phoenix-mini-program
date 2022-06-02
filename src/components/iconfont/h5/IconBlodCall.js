/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconBlodCall = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M819.04 640.8l-9.856-12.672-0.352-0.384c-3.232-3.392-12.352-12.672-27.296-25.504-17.856-15.36-49.728-38.016-52.224-39.68l-44.576-26.944a51.456 51.456 0 0 0-22.72-4.96c-6.336 0-12.608 1.024-18.08 2.944-19.264 6.72-37.248 37.12-42.272 46.304a355.52 355.52 0 0 0-7.04 13.76l-0.672 1.408c-2.72 5.44-5.76 11.52-8.96 17.408-3.2 5.728-10.016 11.52-16.896 11.52a12.032 12.032 0 0 1-6.048-1.6c-29.856-17.152-65.248-39.36-101.312-74.144-40.704-39.232-64.864-70.272-78.24-100.544-0.8-2.08-0.736-11.456 4.576-14.08 7.328-3.648 13.28-6.048 18.56-8.16l1.216-0.544c7.552-3.072 14.72-5.984 22.912-10.976 3.52-2.24 5.44-3.296 7.04-4.224l0.8-0.48c2.944-1.6 5.728-3.136 14.208-8.832 0.352-0.256 1.92-1.536 3.52-2.912l5.44-4.928c14.208-13.696 18.88-33.856 11.872-51.296l-2.432-7.072a466.368 466.368 0 0 0-23.52-46.08c-7.04-12.096-17.696-28.16-27.104-40.864-25.472-34.368-49.056-45.344-49.152-45.376a231.456 231.456 0 0 0-10.144-5.12 60.48 60.48 0 0 0-48.224 0.48c-23.168 8.704-37.376 20.576-52.48 33.216l-3.328 2.816c-44.864 37.44-69.152 86.336-63.424 127.616 8.608 62.4 80.704 189.824 174.304 280.032 93.536 90.112 225.28 159.392 289.6 167.584 4.896 0.64 9.92 0.96 14.912 0.96 46.464 0 82.752-28.352 109.12-53.056 13.12-12.32 30.464-32.64 39.712-52.8 8.16-17.664 12.064-43.392-1.44-62.816m-479.872-174.048c16.032 36.288 43.424 71.968 88.704 115.584 39.552 38.176 78.112 62.432 110.624 81.152 9.344 5.312 19.328 8 29.632 8 26.464 0 48.32-18.112 58.272-36.096 3.744-6.816 7.04-13.44 10.688-20.768l1.504-3.072 4.576-8.96c7.488-13.504 14.624-21.696 17.728-24.512a22.304 22.304 0 0 1 2.784 0.064l39.616 23.904 0.64 0.48c9.6 6.848 33.376 24.096 46.72 35.584 11.616 9.984 19.104 17.376 21.568 19.776 0.416 0.48 0.704 0.768 0.96 0.96l7.264 9.28c0.512 1.92 0 9.248-2.944 15.68-6.4 13.92-19.68 29.216-29.12 38.048-30.208 28.288-52.992 40.32-76.192 40.32-3.072 0-6.24-0.224-9.44-0.64-49.184-6.24-172.928-68.128-262.816-154.72-89.6-86.336-153.696-205.216-160.192-252.384-3.456-24.896 14.944-58.176 46.848-84.8l3.424-2.848c13.856-11.648 23.04-19.328 39.84-25.696a19.2 19.2 0 0 1 7.168-1.824c1.408 0 2.88 0.288 4.16 0.832 1.664 0.768 4.48 2.24 6.176 3.168l1.504 0.768c0.16 0.064 15.264 8 32.64 31.424 8.64 11.584 18.144 25.92 24.192 36.352 6.656 11.552 13.312 24.32 19.712 38.016l0.64 1.28 2.08 6.272 0.256 0.608a12.64 12.64 0 0 1-0.768 0.768l-1.376 1.376a37.056 37.056 0 0 0-1.6 1.568c-5.984 3.968-8.064 5.088-10.176 6.336a149.76 149.76 0 0 0-9.664 5.696c-4.672 2.88-9.376 4.768-16 7.456a307.232 307.232 0 0 0-22.72 9.984c-31.904 15.776-36.16 54.72-26.912 75.584"
        fill={getIconColor(color, 0, '#061748')}
      />
    </svg>
  );
};

IconBlodCall.defaultProps = {
  size: 18,
};

export default IconBlodCall;
