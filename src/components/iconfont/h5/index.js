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

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'blod-call':
      return <IconBlodCall {...rest} />;
    case 'share':
      return <IconShare {...rest} />;
    case 'call':
      return <IconCall {...rest} />;
    case 'safety':
      return <IconSafety {...rest} />;
    case 'phone':
      return <IconPhone {...rest} />;
    case 'wechat':
      return <IconWechat {...rest} />;
    case 'exclamation':
      return <IconExclamation {...rest} />;
    case 'right':
      return <IconRight {...rest} />;
    case 'clock':
      return <IconClock {...rest} />;
    case 'location':
      return <IconLocation {...rest} />;
    case 'tabs_selected':
      return <IconTabsSelected {...rest} />;
    case 'radiounchecked':
      return <IconRadiounchecked {...rest} />;
    case 'radiochecked':
      return <IconRadiochecked {...rest} />;
    case 'back':
      return <IconBack {...rest} />;
    case 'warning-circle-fill':
      return <IconWarningCircleFill {...rest} />;
    case 'clear':
      return <IconClear {...rest} />;
    case 'warning':
      return <IconWarning {...rest} />;
    case 'close':
      return <IconClose {...rest} />;

  }

  return null;
};

export default IconFont;
