import config from '../config'

export default class UserAPI {
  static getUser() {
    return fetch(`${config.API_ROOT}/${config.USER_ID}`)
      .then(res => res.json());
  }

  static updateUserMatchingGroups(data) {

    return fetchPUT(`${config.API_ROOT}/${config.USER_ID}`, {
      instagramMatchGroups: data.instagramMatchGroups,
      twitterMatchGroups: data.twitterMatchGroups
    });

    // return fetch(`${config.API_ROOT}/${config.USER_ID}`, {
    //   method: 'PUT',
    //   body: data
    // })
    //   .then(res => res => res.json());
  }
}

function fetchPUT(url, data) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (this.status >=200 && this.status <= 400) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });

}
