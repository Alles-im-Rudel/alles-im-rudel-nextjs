import tw from "twin.macro";
import { Color } from "./BackgroundColor";
export const primary = tw`
    text-primary
`;
export const greyBlue = tw`
    text-greyBlue
`;

export const secondary = tw`
    text-secondary
`;

export const success = tw`
    text-success
`;

export const error = tw`
    text-error
`;

const getColor = (color: Color) => {
  if (color === Color.primary) {
    return primary;
  }
  if (color === Color.secondary) {
    return secondary;
  }
  if (color === Color.greyBlue) {
    return greyBlue;
  }
  if (color === Color.success) {
    return success;
  }
  if (color === Color.error) {
    return error;
  }
};

export default getColor;
