import { Buttons } from '../../styles/common.js';

export default function Button({ children, onClick, $yellow, $red, $black, $blue }) {
  return (
    <Buttons onClick={onClick} $yellow={$yellow} $black={$black} $red={$red} $blue={$blue}>
      {children}
    </Buttons>
  );
}
