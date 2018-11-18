import APIClient from './APIClient';
import {propCheck} from './utils';
import QBuilder from './QueryBuilder';

const Q_BASE = "api/paid/query";

/**
 * QueryClient
 *
 * Primary API to query for BUIDLHub data.
 */
export default class QueryClient {
  constructor(props) {
    propCheck(props, [
      'apiKey'
    ], "QueryClient.constructor");

    this.apiKey = props.apiKey;
    this.host = props.host || "https://smartcontractmonitor.com";

    [
      'queryBuilder',
      'sendQuery'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  queryBuilder() {
    return new QBuilder({
      buidlHub: this
    });
  }

  async sendQuery(qb) {
    let payload = qb.toJSON();
    let url = `${this.host}/${Q_BASE}/${this.apiKey}`;
    return await APIClient.instance().post(url, payload);
  }

}
