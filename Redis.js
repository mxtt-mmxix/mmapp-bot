const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');

module.exports = {
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    hget: promisify(client.hget).bind(client),
    llen: promisify(client.llen).bind(client),
    lpush: promisify(client.lpush).bind(client),
    ltrim: promisify(client.ltrim).bind(client)
};