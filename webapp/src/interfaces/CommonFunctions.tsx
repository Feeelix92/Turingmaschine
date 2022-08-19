export function cartesianProduct(arr: any[]) {
  return arr.reduce(
    function (a: any[], b: any[]) {
      return a
        .map(function (x: any[]) {
          return b.map(function (y: any) {
            return x.concat([y]);
          });
        })
        .reduce(function (a: string | any[], b: any) {
          return a.concat(b);
        }, []);
    },
    [[]]
  );
}
