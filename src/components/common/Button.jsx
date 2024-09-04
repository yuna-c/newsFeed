import { Buttons } from '../../styles/common.js';

export default function Button({ children, $yellow, $red, $black, $blue, ...props }) {
  return (
    <Buttons className="Button" $yellow={$yellow} $black={$black} $red={$red} $blue={$blue} {...props}>
      {children}
    </Buttons>
  );
}
