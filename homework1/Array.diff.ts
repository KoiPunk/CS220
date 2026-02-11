export function arrayDiff(a: number[], b: number[]): number[] {
  let result: number[] = [];
  
  // itterate through a. Any value that is also in b is skipped, else, added to result[]
  for (let i = 0; i < a.length; i++) {
    const a_num = a[i]; 
    let a_is_in_b = false; // this tells us if a should be skipped

    for (var j = 0; j < b.length; j++) {
      var b_num = b[j];

      // skip a_num since it show up in b
      if (a_num === b_num) {
        a_is_in_b = true;
        break;
      }
    }

    if (!a_is_in_b) {
        result.push(a_num);
    }
  }
  
  return result;
}