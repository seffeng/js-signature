/*
 * js-signature.js
 *
 * @link http://github.com/seffeng/
 * @link http://github.com/seffeng/js-signature
 *
 * @copyright Copyright (c) 2020 seffeng
 */

/* eslint-disable semi */
'use strict';

const crypto = require('crypto');

Object.defineProperty(exports, '__esModule', {
  value: true
});

const JSSignature = {
  init: function(options) {
    options = options || {};
    this.uri = '/';
    this.timesamp = null;
    this.signature = '';
    this.method = 'GET';
    this.headers = {};
    this.params = {};
    this.accessKeyId = '';
    this.accessKeySecret = '';
    this.version = '';
    this.algo = 'sha1';
    this.prefix = '';
    this.connector = '&';
    this.suffix = '';
    this.headerAccessKey = 'Access-Key-Id';
    this.headerTimestamp = 'Timestamp';
    this.headerSignature = 'Signature';
    this.headerSignatureTag = 'Signature';
    this.headerVersion = 'Version';

    this.setUri(options.uri);
    this.setMethod(options.method);
    this.setParams(options.params);
    this.setKey(options.key);
    this.setSecret(options.secret);
    this.setVersion(options.version);
    this.setAlgo(options.algo);
    this.setPrefix(options.prefix);
    this.setConnector(options.connector);
    this.setSuffix(options.suffix);
    this.setHeaderAccessKey(options.headerAccessKey);
    this.setHeaderTimestamp(options.headerTimestamp);
    this.setHeaderSignature(options.headerSignature);
    this.setHeaderSignatureTag(options.headerSignatureTag);
    this.setHeaderVersion(options.headerVersion);
  },
  setKey: function(key) {
    if (typeof key === 'string') {
      this.accessKeyId = key;
    }
    return this;
  },
  getKey: function() {
    return this.accessKeyId;
  },
  setSecret: function(secret) {
    if (typeof secret === 'string') {
      this.accessKeySecret = secret;
    }
    return this;
  },
  getSecret: function() {
    return this.accessKeySecret;
  },
  setVersion: function(version) {
    if (typeof version === 'string') {
      this.version = version;
    }
    return this;
  },
  getVersion: function() {
    return this.version;
  },
  setAlgo: function(algo) {
    if (typeof algo === 'string') {
      this.algo = algo;
    }
    return this;
  },
  getAlgo: function() {
    return this.algo;
  },
  setPrefix: function(prefix) {
    if (typeof prefix === 'string') {
      this.prefix = prefix;
    }
    return this;
  },
  getPrefix: function() {
    return this.prefix;
  },
  setConnector: function(connector) {
    if (typeof connector === 'string') {
      this.connector = connector;
    }
    return this;
  },
  getConnector: function() {
    return this.connector;
  },
  setSuffix: function(suffix) {
    if (typeof suffix === 'string') {
      this.suffix = suffix;
    }
    return this;
  },
  getSuffix: function() {
    return this.suffix;
  },
  setHeaderAccessKey: function(headerAccessKey) {
    if (typeof headerAccessKey === 'string') {
      this.headerAccessKey = headerAccessKey;
    }
    return this;
  },
  getHeaderAccessKey: function() {
    return this.headerAccessKey;
  },
  setHeaderTimestamp: function(headerTimestamp) {
    if (typeof headerTimestamp === 'string') {
      this.headerTimestamp = headerTimestamp;
    }
    return this;
  },
  getHeaderTimestamp: function() {
    return this.headerTimestamp;
  },
  setHeaderSignature: function(headerSignature) {
    if (typeof headerSignature === 'string') {
      this.headerSignature = headerSignature;
    }
    return this;
  },
  getHeaderSignature: function() {
    return this.headerSignature;
  },
  setHeaderSignatureTag: function(headerSignatureTag) {
    if (typeof headerSignatureTag === 'string') {
      this.headerSignatureTag = headerSignatureTag;
    }
    return this;
  },
  getHeaderSignatureTag: function() {
    return this.headerSignatureTag;
  },
  setHeaderVersion: function(headerVersion) {
    if (typeof headerVersion === 'string') {
      this.headerVersion = headerVersion;
    }
    return this;
  },
  getHeaderVersion: function() {
    return this.headerVersion;
  },
  getHeaders: function() {
    return {
      [this.getHeaderAccessKey()]: this.getKey(),
      [this.getHeaderTimestamp()]: this.getTimesamp(),
      [this.getHeaderSignature()]: this.getSignature(),
      [this.getHeaderVersion()]: this.getVersion()
    };
  },
  getSignature: function() {
    return this.signature;
  },
  setParams: function(params) {
    if (typeof params === 'object') {
      this.params = params;
    }
    return this;
  },
  getParams: function() {
    return this.params;
  },
  sortObject() {
    let str = this.getConnector();
    if (typeof this.params === 'object') {
      const keys = Object.keys(this.params).sort();
      for (var i in keys) {
        str += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(typeof this.params[keys[i]] === 'object' ? JSON.stringify(this.params[keys[i]]) : this.params[keys[i]]) + this.getConnector();
      }
      const strlen = (this.getConnector().toString()).length;
      if (strlen > 0) {
        str = str.substr(0, str.length - strlen);
      }
      return str;
    }
  },
  setMethod: function(method) {
    if (typeof method === 'string') {
      this.method = method.toUpperCase();
    }
    return this;
  },
  getMethod: function() {
    return this.method;
  },
  setUri: function(uri) {
    if (typeof uri === 'string') {
      this.uri = uri;
    }
    return this;
  },
  getUri: function() {
    return this.uri;
  },
  sign: function(uri, method, params) {
    this.setUri(uri);
    this.setMethod(method);
    this.setParams(params);
    const signstr = this.getPrefix() + this.getMethod() + this.getConnector() + (this.getVersion() ? (this.getHeaderVersion() + '=' + this.getVersion() + this.getConnector()) : '') +
                  this.getUri() + this.getConnector() + this.getHeaderAccessKey() + '=' + this.getKey() + this.getConnector() + this.getHeaderTimestamp() + '=' +
                  this.getTimesamp() + this.sortObject() + this.getSuffix();

    this.signature = this.getHeaderSignatureTag() + ' ' + crypto.createHmac(this.getAlgo(), this.getSecret()).update(signstr).digest('base64');
    return this;
  },
  getTimesamp() {
    this.timesamp || this.setTimesamp();
    return this.timesamp;
  },
  setTimesamp(timesamp) {
    if (typeof timesamp === 'number' || typeof timesamp === 'string') {
      this.timesamp = timesamp.toString().substr(0, 10);
    } else {
      const date = new Date();
      this.timesamp = date.getTime().toString().substr(0, 10);
    }
    return this;
  }
}

JSSignature.init();

exports.JSSignature = JSSignature;
exports.default = JSSignature;
