/* eslint-disable */

import React from 'react';

import IconLocation from './IconLocation';
import IconTabsSelected from './IconTabsSelected';
import IconRadiounchecked from './IconRadiounchecked';
import IconRadiochecked from './IconRadiochecked';
import IconBack from './IconBack';
import IconWarningCircleFill from './IconWarningCircleFill';
import IconClear from './IconClear';
import IconWarning from './IconWarning';
import IconClose from './IconClose';
export { default as IconLocation } from './IconLocation';
export { default as IconTabsSelected } from './IconTabsSelected';
export { default as IconRadiounchecked } from './IconRadiounchecked';
export { default as IconRadiochecked } from './IconRadiochecked';
export { default as IconBack } from './IconBack';
export { default as IconWarningCircleFill } from './IconWarningCircleFill';
export { default as IconClear } from './IconClear';
export { default as IconWarning } from './IconWarning';
export { default as IconClose } from './IconClose';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'location':
      return <IconLocation key="1" {...rest} />;
    case 'tabs_selected':
      return <IconTabsSelected key="2" {...rest} />;
    case 'radiounchecked':
      return <IconRadiounchecked key="3" {...rest} />;
    case 'radiochecked':
      return <IconRadiochecked key="4" {...rest} />;
    case 'back':
      return <IconBack key="5" {...rest} />;
    case 'warning-circle-fill':
      return <IconWarningCircleFill key="6" {...rest} />;
    case 'clear':
      return <IconClear key="7" {...rest} />;
    case 'warning':
      return <IconWarning key="8" {...rest} />;
    case 'close':
      return <IconClose key="9" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
