/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSafety = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M864.402286 179.541333h-24.380953c-212.74819 0-305.834667-93.135238-305.834666-93.135238L512 64.316952l-22.186667 22.186667S396.726857 181.735619 181.735619 181.735619H128.585143V609.52381c0 110.83581 37.64419 274.822095 372.345905 398.969904l11.068952 4.388572 11.068952-4.388572c334.701714-124.14781 372.394667-288.182857 372.394667-398.969904V179.541333h-31.061333z m-13.263238 425.545143c0 62.073905 0 228.303238-339.139048 354.645334-339.139048-126.342095-339.139048-290.377143-339.139048-354.645334V226.06019h11.117715c192.804571 0 294.765714-70.89981 328.021333-99.718095 33.255619 28.769524 135.216762 99.718095 328.021333 99.718095h8.874667l2.243048 379.026286z m-403.407238-11.068952l-117.516191-88.649143-44.275809 35.449905 192.804571 175.055238c88.649143-192.804571 259.31581-339.090286 259.315809-339.090286l-19.943619-22.137905c-137.411048 70.89981-270.384762 239.37219-270.384761 239.372191z"
        fill={getIconColor(color, 0, '#8F929D')}
      />
    </Svg>
  );
};

IconSafety.defaultProps = {
  size: 18,
};

IconSafety = React.memo ? React.memo(IconSafety) : IconSafety;

export default IconSafety;
