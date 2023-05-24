import tw from "twin.macro";

export default tw.div`
    flex
    gap-smaller
`;

const StyledColumn = tw.div`
    w-1/2
    gap-smaller
    flex
    flex-col
`;

interface iColumn {
  children: any;
}
export const Col = ({ children }: iColumn) => {
  return <StyledColumn>{children}</StyledColumn>;
};

export const ActionRow = tw.div`
  flex
  justify-between
`;
