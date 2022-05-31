/* eslint-disable */

import React from 'react';

import IconCall from './IconCall';
import IconSafety from './IconSafety';
import IconPhone from './IconPhone';
import IconWechat from './IconWechat';
import IconExclamation from './IconExclamation';
import IconRight from './IconRight';
import IconClock from './IconClock';
import IconLocation from './IconLocation';
import IconTabsSelected from './IconTabsSelected';
import IconRadiounchecked from './IconRadiounchecked';
import IconRadiochecked from './IconRadiochecked';
import IconBack from './IconBack';
import IconWarningCircleFill from './IconWarningCircleFill';
import IconClear from './IconClear';
import IconWarning from './IconWarning';
import IconClose from './IconClose';
export { default as IconCall } from './IconCall';
export { default as IconSafety } from './IconSafety';
export { default as IconPhone } from './IconPhone';
export { default as IconWechat } from './IconWechat';
export { default as IconExclamation } from './IconExclamation';
export { default as IconRight } from './IconRight';
export { default as IconClock } from './IconClock';
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
    case 'call':
      return <IconCall key="1" {...rest} />;
    case 'safety':
      return <IconSafety key="2" {...rest} />;
    case 'phone':
      return <IconPhone key="3" {...rest} />;
    case 'wechat':
      return <IconWechat key="4" {...rest} />;
    case 'exclamation':
      return <IconExclamation key="5" {...rest} />;
    case 'right':
      return <IconRight key="6" {...rest} />;
    case 'clock':
      return <IconClock key="7" {...rest} />;
    case 'location':
      return <IconLocation key="8" {...rest} />;
    case 'tabs_selected':
      return <IconTabsSelected key="9" {...rest} />;
    case 'radiounchecked':
      return <IconRadiounchecked key="10" {...rest} />;
    case 'radiochecked':
      return <IconRadiochecked key="11" {...rest} />;
    case 'back':
      return <IconBack key="12" {...rest} />;
    case 'warning-circle-fill':
      return <IconWarningCircleFill key="13" {...rest} />;
    case 'clear':
      return <IconClear key="14" {...rest} />;
    case 'warning':
      return <IconWarning key="15" {...rest} />;
    case 'close':
      return <IconClose key="16" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
