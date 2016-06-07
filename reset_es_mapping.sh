#! /bin/bash

curl -XDELETE "localhost:9200/message_index"
curl -XPUT "localhost:9200/message_index"
curl -XPUT "localhost:9200/message_index/_mapping/message_type" -d '{
  "message_type" : {
    "properties": {
      "User" : {
        "type": "string"
      },
      "Content": {
        "type": "string"
      }
    }
  }
}'
