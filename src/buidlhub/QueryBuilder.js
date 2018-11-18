
class EventStruct {
  constructor(props) {

    this.groupAttribute = null;
    this.index = 0;
    this.name = props.name;

    [
      'groupByAttribute',
      'withIndex',
      'toJSON'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  groupByAttribute(idx) {
    this.groupAttribute = idx;
    return this;
  }

  withIndex(idx) {
    this.index = idx;
    return this;
  }

  toJSON() {
    return {
      index: this.index,
      groupAttribute: this.groupAttribute,
      name: this.name
    }
  }

}

class FieldStruct {
  constructor(props) {
    this.name = props.name;

    [
      'withValue',
      'toJSON'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  withValue(v) {
    this.value = v;
    return this;
  }

  toJSON() {
    return {
      name: this.name,
      value: this.value
    }
  }
}

class QueryStruct {
  constructor(props) {
    this.id = props.id;

    this._field = null;
    this.logEvents = [];
    this._groupLimit = null;

    [
      'field',
      'logEvent',
      'groupLimit',
      'toJSON'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  field(name) {
    this._field = new FieldStruct({
      name
    });
    return this._field;
  }

  logEvent(name) {
    let e = new EventStruct({
      name
    });
    this.logEvents.push(e);
    return e;
  }

  groupLimit(limit) {
    this._groupLimit = limit;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      field: this._field,
      logEvents: this.logEvents,
      groupLimit: this._groupLimit
    }
  }
}

export default class QueryBuilder {
  constructor(props) {
    this.buidlHub = props.buidlHub;

    this.queries = [];
    this._offset = 0;
    this._pageSize = 10;
    this._orderBy = {
      field: "blockNumber",
      direction: "desc"
    };

    [
      'offset',
      'pageSize',
      'orderBy',
      'query',
      'execute',
      'toJSON'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  offset(o) {
    this._offset = o;
    return this;
  }

  pageSize(size) {
    this._pageSize = size;
    return this;
  }

  orderBy(field, direction) {
    if(!field || !direction) {
      return;
    }

    this._orderBy = {
      field,
      direction
    };
    return this;
  }

  query(id) {
    let q = new QueryStruct({
      id
    });
    this.queries.push(q);
    return q;
  }

  toJSON() {
    return {
      queries: this.queries,
      orderBy: this._orderBy,
      offset: this._offset,
      pageSize: this._pageSize
    }
  }

  async execute() {
    return this.buidlHub.sendQuery(this);
  }
}
