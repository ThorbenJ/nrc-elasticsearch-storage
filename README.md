# nrc-elasticsearch-storage

A [Node-RED](http://www.nodered.org) contributed (NRC) module to use Elasticsearch as storage; using [@elastic/elasticsearch](https://github.com/elastic/elasticsearch-js).

## Install

In the directory of your settings.js file run:

```
npm install nrc-elasticsearch-storage
```
(Not yet published on npm)

Then add the following to your settings file (inside the module.exports object):

```
    storageModule: require("nrc-elasticsearch-storage")({
        nodes: <node urls>,
        index: <index name>,
        auth: <options>
    }),
```

The configuration options are passed to [`new Client()` of `@elastic/elasticsearch`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html) as is. 

Only `index` is an extra option, this is the index used for storing all Node-Red data.
The authenticated user should have full access to this index. (No other index is needed)

