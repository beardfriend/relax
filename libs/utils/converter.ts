import { classToPlain } from 'class-transformer';
import { DeepPartial } from 'typeorm';

/*
 * newData에 있는 값이*
 * prevData에 있는 값과 같으면 바구니에 담지 않고
 * 다르면 바구니에 담는다.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dataCompareFunc<T>(prevData: DeepPartial<T>, newData: { [key: string]: any }) {
  const plainObject = classToPlain(prevData);

  const filteredData = Object.keys(newData)
    .filter((key) => Object.keys(prevData).includes(key))
    .reduce((prev: {} | undefined, current: string) => {
      if (plainObject[current] === newData[current]) {
        return;
      }
      if (plainObject[current] === null && newData[current] === undefined) {
        return;
      }
      return {
        ...prev,
        [current]: newData[current],
      };
    }, []);
  console.log(filteredData);
  if (filteredData === undefined) {
    return false;
  }
  return filteredData;
}

export function test() {
  console.log('hi');
}
