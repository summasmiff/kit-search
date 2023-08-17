import Cancelable from "cancelable-promise";

function request(opts) {
  return new Cancelable((resolve, reject) => {
    fetch(encode_url(opts.url, opts.params), opts).then(function (resp) {
      fetchBody(resp, resolve, reject);
    }, reject);
  });
}

function get(url, params) {
  return request({
    url: url,
    method: "GET",
    params: params,
    headers: {
      accept: "application/json",
    },
  });
}

function fetchBody(resp, resolve, reject) {
  let success = resp.status >= 200 && resp.status < 300;
  resp.text().then(function (text) {
    if (!text || text === "") {
      if (success) {
        resolve(null);
      } else {
        reject({ status: resp.status });
      }
    } else {
      try {
        let jsonResp = JSON.parse(text);
        if (success) {
          resolve(jsonResp);
        } else {
          jsonResp.status = resp.status;
          reject(jsonResp);
        }
      } catch (e) {
        reject(e);
      }
    }
  }, reject);
}


function encode_url(base, params) {
  if (!params) return base;
  let encoded = encode_params(params);
  if (encoded === "") return base;
  return [base, encoded].join(base.indexOf("?") >= 0 ? "&" : "?");
}

function encode_params(params) {
  var encoded = [];
  encode(encoded, [], params);
  return encoded.join("&");
}

function encode(params, context, o) {
  if (o === null) return;
  if (o === undefined) return;
  let i;
  let n;
  let k;
  let v;
  switch ({}.toString.call(o)) {
    case "[object Boolean]":
    case "[object Number]":
    case "[object String]":
      params.push(`${context.join("")}=${encodeURIComponent(o)}`);
      return;
    case "[object Array]":
      n = context.pop();
      for (i = 0; i < o.length; i++) {
        context.push(`${n}[]`);
        encode(params, context, o[i]);
        context.pop();
      }
      return;
    case "[object Object]":
      for ([k, v] of Object.entries(o)) {
        if (context.length) context.push(`[${encodeURIComponent(k)}]`);
        else context.push(encodeURIComponent(k));
        encode(params, context, v);
        context.pop();
      }
      return;
    default: return;
  }
}

const ajax = { get: get };
export default ajax;
