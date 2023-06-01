import tw from "twin.macro";
export enum Color {
  primary = "primary",
  greyBlue = "greyBlue",
  secondary = "secondary",
  success = "success",
  error = "error",
}
export const stylePrimary = tw`
    bg-primary
    text-white
`;
export const greyBlueBg = tw`
    text-white
    bg-greyBlue
`;

export const secondaryBg = tw`
    text-black
    bg-secondary
`;

export const successBg = tw`
    text-white
    bg-success
`;

export const errorBg = tw`
    text-white
    bg-error
`;

const getBackgroundColor = (color: Color) => {
  if (color === Color.primary) {
    return stylePrimary;
  }
  if (color === Color.secondary) {
    return secondaryBg;
  }
  if (color === Color.greyBlue) {
    return greyBlueBg;
  }
  if (color === Color.success) {
    return successBg;
  }
  if (color === Color.error) {
    return errorBg;
  }
};

export default getBackgroundColor;
