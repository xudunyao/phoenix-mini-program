/* eslint-disable */

import React from 'react';

import IconBlodCall from './IconBlodCall';
import IconShare from './IconShare';
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
export { default as IconBlodCall } from './IconBlodCall';
export { default as IconShare } from './IconShare';
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
    case 'blod-call':
      return <IconBlodCall key="1" {...rest} />;
    case 'share':
      return <IconShare key="2" {...rest} />;
    case 'call':
      return <IconCall key="3" {...rest} />;
    case 'safety':
      return <IconSafety key="4" {...rest} />;
    case 'phone':
      return <IconPhone key="5" {...rest} />;
    case 'wechat':
      return <IconWechat key="6" {...rest} />;
    case 'exclamation':
      return <IconExclamation key="7" {...rest} />;
    case 'right':
      return <IconRight key="8" {...rest} />;
    case 'clock':
      return <IconClock key="9" {...rest} />;
    case 'location':
      return <IconLocation key="10" {...rest} />;
    case 'tabs_selected':
      return <IconTabsSelected key="11" {...rest} />;
    case 'radiounchecked':
      return <IconRadiounchecked key="12" {...rest} />;
    case 'radiochecked':
      return <IconRadiochecked key="13" {...rest} />;
    case 'back':
      return <IconBack key="14" {...rest} />;
    case 'warning-circle-fill':
      return <IconWarningCircleFill key="15" {...rest} />;
    case 'clear':
      return <IconClear key="16" {...rest} />;
    case 'warning':
      return <IconWarning key="17" {...rest} />;
    case 'close':
      return <IconClose key="18" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
