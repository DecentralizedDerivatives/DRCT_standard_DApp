export const propCheck = (props, reqd, ctx) => {
  if(!Array.isArray(reqd)) {
    throw new Error("Required props must be an array of required prop names");
  }
  if(!props || Object.keys(props).length < reqd.length) {
    throw new Error("Properties must have at least as many fields as required");
  }

  reqd.forEach(p=>{
    let v = props[p];

    if(typeof v === undefined || v === null) {
      let msg = ctx?`${ctx} is missing property: ${p}`:`Missing property: ${p}`;
      throw new Error(msg);
    }
  });
}
