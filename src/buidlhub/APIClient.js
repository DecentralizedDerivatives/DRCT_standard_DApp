import axios from 'axios';
const MAX_TRIES = 5;

const _axiosDo = (method, url, payload, cb, ctx) => {

  return axios({
    method: method,
    url,
    data: payload
  })
  .then(result=>{
    if(result.data.error) {
      cb(new Error(result.data.error), ctx);
    } else {
      cb(null, ctx, result);
    }
  })
  .catch(e=>{
    if(ctx.tries < MAX_TRIES) {
      console.log("Problem sending to API server. Will retry", e);
      setTimeout(()=>{
        _axiosDo(method, url, payload, cb, {
          ...ctx,
          tries: ctx.tries+1
        });
      }, 500);
    } else {
      console.log("Exceeded max tries to send to API server. Giving up", e);
      cb(e, ctx);
    }
  });
}

const axiosPost = (url, payload, cb, ctx) => {
  return _axiosDo("POST", url, payload, cb, ctx);
}

const axiosGet = (url, cb, ctx) => {
  return _axiosDo("GET", url, undefined, cb, ctx);
}



let client = null;
export default class APIClient {

  static instance() {
    if(!client) {
      client = new APIClient();
    }
    return client;
  }

  get(url) {
    return new Promise((done,err)=>{
      let cb = (e, ctx, result) => {
        if(e) {
          err(e);
        } else if(result){
          done(result);
        } else {
          done({})
        }
      };
      return axiosGet(url, cb, {
        tries: 0
      });
    });
  }

  post(url, payload) {
    return new Promise((done,err)=>{
      let cb = (e, ctx, result) => {
        if(e) {
          err(e);
        } else if(result){
          done(result);
        } else {
          done({})
        }
      };

      return axiosPost(url, payload, cb, {
        tries: 0
      });
    });
  }
}
