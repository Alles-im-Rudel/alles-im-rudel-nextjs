import tw from "twin.macro";
export enum Color {
  primary = "primary",
  greyBlue = "greyBlue",
  secondary = "secondary",
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
};

export default getBackgroundColor;
