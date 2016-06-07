#! /bin/bash

curl -XPOST "localhost:9200/message_index/message_type" -d '{
  "User": "Test",
  "Content": "Lorem ipsum dolor sit amet, ut cum regione quaeque quaerendum. Duo an dolore lobortis salutandi, vel cu appareat delicata, mea ut oratio laoreet. An ubique commune pri, at has ornatus accumsan delicata. Adhuc dicam oblique ne duo. Sea cu epicurei antiopam. Ad nobis gubergren mei, modo deserunt eam in."
}'


curl -XPOST "localhost:9200/message_index/message_type" -d '{
  "User": "Test",
  "Content": "His aeque definitiones signiferumque ad, nam ne stet homero latine, ne pri novum veniam. Usu errem quaestio ea, case putant at mea. Vix quando legere libris no, quod molestiae adversarium no qui. Adhuc eirmod ea ius. Est eu sonet tacimates. Latine efficiendi usu ex, cum summo mediocritatem ut."
}'

curl -XPOST "localhost:9200/message_index/message_type" -d '{
  "User": "Test1",
  "Content": "Alii elitr id usu, in quas accusamus usu, adhuc definiebas sed an. In noluisse interesset per, vulputate definitiones his in. Pro id perpetua argumentum, eripuit minimum referrentur ad qui. Sea ut facete feugiat propriae. No case homero abhorreant mea, ea nam aeque iudico equidem. Dolorem fastidii cu his, labore inimicus eam ne."
}'

curl -XPOST "localhost:9200/message_index/message_type" -d '{
  "User": "Test2",
  "Content": "Pro eius mollis liberavisse at. Fastidii signiferumque no vel, rebum consetetur eu mea. Eu ius meis maiorum senserit, ei mel vide simul mucius, in mel augue forensibus. Eos delenit ocurreret cu, ea qui justo dolorem."
}'

curl -XPOST "localhost:9200/message_index/message_type" -d '{
  "User": "Test",
  "Content": "His aeque definitiones signiferumque ad, nam ne stet homero latine, ne pri novum veniam. Usu errem quaestio ea, case putant at mea. Vix quando legere libris no, quod molestiae adversarium no qui. Adhuc eirmod ea ius. Est eu sonet tacimates. Latine efficiendi usu ex, cum summo mediocritatem ut."
}'
