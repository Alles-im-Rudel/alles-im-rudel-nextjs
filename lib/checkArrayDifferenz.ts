export const checkArrays = (
  arrayOne: [{ id: number }] | [],
  arrayTwo: [{ id: number }] | []
) => {
  return (
    arrayOne.some(
      (itemOne) => !arrayTwo.some((itemTwo) => itemTwo.id === itemOne.id)
    ) ||
    arrayTwo.some(
      (arrayTwo) => !arrayOne.some((itemOne) => itemOne.id === arrayTwo.id)
    )
  );
};
