"use strict";(self.webpackChunkrxdb=self.webpackChunkrxdb||[]).push([[9153],{2980:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var o=n(5893),r=n(1151);const s={title:"HTTP Replication",slug:"replication-http.html",description:"Learn how to establish HTTP replication between RxDB clients and a Node.js Express server for data synchronization."},a="HTTP Replication from a custom server to RxDB clients",i={id:"replication-http",title:"HTTP Replication",description:"Learn how to establish HTTP replication between RxDB clients and a Node.js Express server for data synchronization.",source:"@site/docs/replication-http.md",sourceDirName:".",slug:"/replication-http.html",permalink:"/replication-http.html",draft:!1,unlisted:!1,editUrl:"https://github.com/pubkey/rxdb/tree/master/docs-src/docs/replication-http.md",tags:[],version:"current",frontMatter:{title:"HTTP Replication",slug:"replication-http.html",description:"Learn how to establish HTTP replication between RxDB clients and a Node.js Express server for data synchronization."},sidebar:"tutorialSidebar",previous:{title:"\u2699\ufe0f Replication Protocol",permalink:"/replication.html"},next:{title:"RxDB Server Replication",permalink:"/replication-server"}},l={},c=[{value:"Setup",id:"setup",level:2},{value:"Pull from the server to the client",id:"pull-from-the-server-to-the-client",level:2},{value:"Push from the Client to the Server",id:"push-from-the-client-to-the-server",level:2},{value:"pullStream$ for ongoing changes",id:"pullstream-for-ongoing-changes",level:2},{value:"pullStream$ RESYNC flag",id:"pullstream-resync-flag",level:3},{value:"Missing implementation details",id:"missing-implementation-details",level:2}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"http-replication-from-a-custom-server-to-rxdb-clients",children:"HTTP Replication from a custom server to RxDB clients"}),"\n",(0,o.jsxs)(t.p,{children:["While RxDB has a range of backend-specific replication plugins (like ",(0,o.jsx)(t.a,{href:"/replication-graphql.html",children:"GraphQL"})," or ",(0,o.jsx)(t.a,{href:"/replication-firestore.html",children:"Firestore"}),"), the replication is build in a way to make it very easy to replicate data from a custom server to RxDB clients."]}),"\n",(0,o.jsx)("p",{align:"center",children:(0,o.jsx)("img",{src:"./files/icons/with-gradient/replication.svg",alt:"HTTP replication",height:"60"})}),"\n",(0,o.jsxs)(t.p,{children:["Using ",(0,o.jsx)(t.strong,{children:"HTTP"})," as a transport protocol makes it simple to create a compatible backend on top of your existing infrastructure. For events that must be send from the server to to client, we can use ",(0,o.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",children:"Server Send Events"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"In this tutorial we will implement a HTTP replication between an RxDB client and a MongoDB express server. You can adapt this for any other backend database technologie like PostgreSQL or even a non-Node.js server like go or java."}),"\n",(0,o.jsxs)(t.p,{children:["To create a compatible server for replication, we will start a server and implement the correct HTTP routes and replication handlers. We need a push-handler, a pull-handler and for the ongoing changes ",(0,o.jsx)(t.code,{children:"pull.stream"})," we use ",(0,o.jsx)(t.strong,{children:"Server Send Events"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,o.jsxs)(t.p,{children:["RxDB does not have a specific HTTP-replication plugin because the ",(0,o.jsx)(t.a,{href:"/replication.html",children:"replication primitives plugin"})," is simple enough to start a HTTP replication on top of it.\nWe import the ",(0,o.jsx)(t.code,{children:"replicateRxCollection"})," function and start the replication from there for a single ",(0,o.jsx)(t.a,{href:"/rx-collection.html",children:"RxCollection"}),"."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\nimport { replicateRxCollection } from 'rxdb/plugins/replication';\nconst replicationState = await replicateRxCollection({\n    collection: myRxCollection,\n    replicationIdentifier: 'my-http-replication',\n    push: { /* add settings from below */ },\n    pull: { /* add settings from below */ }\n});\n"})}),"\n",(0,o.jsx)(t.p,{children:"On the server side, we start an express server that has a MongoDB connection and serves the HTTP requests of the client."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > server.ts\nimport { MongoClient } from 'mongodb';\nimport express from 'express';\nconst mongoClient = new MongoClient('mongodb://localhost:27017/');\nconst mongoConnection = await mongoClient.connect();\nconst mongoDatabase = mongoConnection.db('myDatabase');\nconst mongoCollection = await mongoDatabase.collection('myDocs');\n\nconst app = express();\napp.use(express.json());\n\n/* ... add routes from below */\n\napp.listen(80, () => {\n  console.log(`Example app listening on port 80`)\n});\n"})}),"\n",(0,o.jsx)(t.h2,{id:"pull-from-the-server-to-the-client",children:"Pull from the server to the client"}),"\n",(0,o.jsxs)(t.p,{children:["First we need to implement the pull handler. This is used by the RxDB replication to fetch all documents writes that happened after a given ",(0,o.jsx)(t.code,{children:"checkpoint"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.code,{children:"checkpoint"})," format is not determined by RxDB, instead the server can use any type of changepoint that can be used to iterate across document writes. Here we will just use a unix timestamp ",(0,o.jsx)(t.code,{children:"updatedAt"})," and a string ",(0,o.jsx)(t.code,{children:"id"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["On the client we add the ",(0,o.jsx)(t.code,{children:"pull.handler"})," to the replication setting. The handler request the correct server url and fetches the documents."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\nconst replicationState = await replicateRxCollection({\n    /* ... */\n    pull: {\n        async handler(checkpointOrNull, batchSize){\n            const updatedAt = checkpointOrNull ? checkpointOrNull.updatedAt : 0;\n            const id = checkpointOrNull ? checkpointOrNull.id : '';\n            const response = await fetch(`https://localhost/pull?updatedAt=${updatedAt}&id=${id}&limit=${batchSize}`);\n            const data = await response.json();\n            return {\n                documents: data.documents,\n                checkpoint: data.checkpoint\n            };\n        }\n        \n    }\n    /* ... */\n});\n"})}),"\n",(0,o.jsx)(t.p,{children:"The server responds with an array of document data based on the given checkpoint and a new checkpoint.\nAlso the server has to respect the batchSize so that RxDB knows when there are no more new documents and the server returns a non-full array."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > server.ts\nimport { lastOfArray } from 'rxdb/plugins/core';\napp.get('/pull', (req, res) => {\n    const id = req.query.id;\n    const updatedAt = parseInt(req.query.updatedAt, 10);\n    const documents = await mongoCollection.find({\n        $or: [\n            /**\n             * Notice that we have to compare the updatedAt AND the id field\n             * because the updateAt field is not unique and when two documents have\n             * the same updateAt, we can still \"sort\" them by their id.\n             */\n            {\n                updateAt: { $gt: updatedAt }\n            },\n            {\n                updateAt: { $eq: updatedAt }\n                id: { $gt: id }\n            }\n        ]\n    }).limit(parseInt(req.query.batchSize, 10)).toArray();\n    const newCheckpoint = documents.length === 0 ? { id, updatedAt } : {\n        id: lastOfArray(documents).id,\n        updatedAt: lastOfArray(documents).updatedAt\n    };\n    res.setHeader('Content-Type', 'application/json');\n    res.end(JSON.stringify({ documents, checkpoint: newCheckpoint }));\n});\n"})}),"\n",(0,o.jsx)(t.h2,{id:"push-from-the-client-to-the-server",children:"Push from the Client to the Server"}),"\n",(0,o.jsxs)(t.p,{children:["To send client side writes to the server, we have to implement the ",(0,o.jsx)(t.code,{children:"push.handler"}),". It gets an array of change rows as input and has to return only the conflicting documents that did not have been written to the server. Each change row contains a ",(0,o.jsx)(t.code,{children:"newDocumentState"})," and an optional ",(0,o.jsx)(t.code,{children:"assumedMasterState"}),"."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\nconst replicationState = await replicateRxCollection({\n    /* ... */\n    push: {\n        async handler(changeRows){\n            const rawResponse = await fetch('https://localhost/push', {\n                method: 'POST',\n                headers: {\n                    'Accept': 'application/json',\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(changeRows)\n            });\n            const conflictsArray = await rawResponse.json();\n            return conflictsArray;\n        }\n    }\n    /* ... */\n});\n"})}),"\n",(0,o.jsxs)(t.p,{children:["On the server we first have to detect if the ",(0,o.jsx)(t.code,{children:"assumedMasterState"}),' is correct for each row. If yes, we have to write the new document state to the database, otherwise we have to return the "real" master state in the conflict array.']}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"NOTICE:"})," For simplicity in this tutorial, we do not use transactions. In reality you should run the full push function inside of a MongoDB transaction to ensure that no other process can mix up the document state while the writes are processed. Also you should call batch operations on MongoDB instead of running the operations for each change row."]}),"\n",(0,o.jsxs)(t.p,{children:["The server also creates an ",(0,o.jsx)(t.code,{children:"event"})," that is emitted to the ",(0,o.jsx)(t.code,{children:"pullStream$"})," which is later used in the ",(0,o.jsx)(t.a,{href:"#pullstream-for-ongoing-changes",children:"pull.stream$"}),"."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > server.ts\nimport { lastOfArray } from 'rxdb/plugins/core';\nimport { Subject } from 'rxjs';\n\n// used in the pull.stream$ below\nlet lastEventId = 0;\nconst pullStream$ = new Subject();\n\napp.get('/push', (req, res) => {\n    const changeRows = req.body;\n    const conflicts = [];\n    const event = {\n        id: lastEventId++,\n        documents: [],\n        checkpoint: null\n    };\n    for(const changeRow of changeRows){\n        const realMasterState = mongoCollection.findOne({id: changeRow.newDocumentState.id});\n        if(\n            realMasterState && !changeRow.assumedMasterState ||\n            (\n                realMasterState && changeRow.assumedMasterState &&\n                /*\n                 * For simplicity we detect conflicts on the server by only compare the updateAt value.\n                 * In reality you might want to do a more complex check or do a deep-equal comparison.\n                 */\n                realMasterState.updatedAt !== changeRow.assumedMasterState.updatedAt\n            )\n        ) {\n            // we have a conflict\n            conflicts.push(realMasterState);\n        } else {\n            // no conflict -> write the document\n            mongoCollection.updateOne(\n                {id: changeRow.newDocumentState.id},\n                changeRow.newDocumentState\n            );\n            event.documents.push(changeRow.newDocumentState);\n            event.checkpoint = { id: changeRow.newDocumentState.id, updatedAt: changeRow.newDocumentState.updatedAt };\n        }\n    }\n    if(event.documents.length > 0){\n        myPullStream$.next(event);\n    }\n    res.setHeader('Content-Type', 'application/json');\n    res.end(JSON.stringify(conflicts));\n});\n"})}),"\n",(0,o.jsx)(t.h2,{id:"pullstream-for-ongoing-changes",children:"pullStream$ for ongoing changes"}),"\n",(0,o.jsxs)(t.p,{children:["While the normal pull handler is used when the replication is in ",(0,o.jsx)(t.a,{href:"/replication.html#checkpoint-iteration",children:"iteration mode"}),", we also need a stream of ongoing changes when the replication is in ",(0,o.jsx)(t.a,{href:"/replication.html#event-observation",children:"event observation mode"}),".\nThe ",(0,o.jsx)(t.code,{children:"pull.stream$"})," is implemented with server send events that are send from the server to the client."]}),"\n",(0,o.jsx)(t.p,{children:"The client connects to an url and receives server-send-events that contain all ongoing writes."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\nimport { Subject } from 'rxjs';\nconst myPullStream$ = new Subject();\nconst eventSource = new EventSource('http://localhost/pullStream', { withCredentials: true });\neventSource.onmessage = event => {\n    const eventData = JSON.parse(event.data);\n    myPullStream$.next({\n        documents: eventData.documents,\n        checkpoint: eventData.checkpoint\n    });\n};\n\nconst replicationState = await replicateRxCollection({\n    /* ... */\n    pull: {\n        /* ... */\n        stream$: myPullStream$.asObservable()\n    }\n    /* ... */\n});\n"})}),"\n",(0,o.jsxs)(t.p,{children:["On the server we have to implement the ",(0,o.jsx)(t.code,{children:"pullStream"})," route and emit the events. We use the ",(0,o.jsx)(t.code,{children:"pullStream$"})," observable from ",(0,o.jsx)(t.a,{href:"#push-from-the-client-to-the-server",children:"above"})," to fetch all ongoing events and respond them to the client."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > server.ts\napp.get('/pullStream', (req, res) => {\n    res.writeHead(200, {\n        'Content-Type': 'text/event-stream',\n        'Connection': 'keep-alive',\n        'Cache-Control': 'no-cache'\n    });\n    const subscription = pullStream$.subscribe(event => res.write('data: ' + JSON.stringify(event) + '\\n\\n'));\n    req.on('close', () => subscription.unsubscribe());\n});\n"})}),"\n",(0,o.jsx)(t.h3,{id:"pullstream-resync-flag",children:"pullStream$ RESYNC flag"}),"\n",(0,o.jsxs)(t.p,{children:["In case the client looses the connection, the EventSource will automatically reconnect but there might have been some changes that have been missed out in the meantime. The replication has to be informed that it might have missed events by emitting a ",(0,o.jsx)(t.code,{children:"RESYNC"})," flag from the ",(0,o.jsx)(t.code,{children:"pull.stream$"}),".\nThe replication will then catch up by switching to the ",(0,o.jsx)(t.a,{href:"/replication.html#checkpoint-iteration",children:"iteration mode"})," until it is in sync with the server again."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\neventSource.onerror = () => myPullStream$.next('RESYNC');\n"})}),"\n",(0,o.jsxs)(t.p,{children:["The purpose of the ",(0,o.jsx)(t.code,{children:"RESYNC"}),' flag is to tell the client that "something might have changed" and then the client can react on that information without having to run operations in an interval.']}),"\n",(0,o.jsx)(t.p,{children:"If your backend is not capable of emitting the actual documents and checkpoint in the pull stream, you could just map all events to the RESYNC flag. This would make the replication work with a slight performance drawback:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// > client.ts\nimport { Subject } from 'rxjs';\nconst myPullStream$ = new Subject();\nconst eventSource = new EventSource('http://localhost/pullStream', { withCredentials: true });\neventSource.onmessage = () => myPullStream$.next('RESYNC');\nconst replicationState = await replicateRxCollection({\n    pull: {\n        stream$: myPullStream$.asObservable()\n    }\n});\n"})}),"\n",(0,o.jsx)(t.h2,{id:"missing-implementation-details",children:"Missing implementation details"}),"\n",(0,o.jsx)(t.p,{children:"Here we only covered the basics of doing a HTTP replication between RxDB clients and a server. We did not cover the following aspects of the implementation:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Authentication: To authenticate the client on the server, you might want to send authentication headers with the HTTP requests"}),"\n",(0,o.jsxs)(t.li,{children:["Skip events on the ",(0,o.jsx)(t.code,{children:"pull.stream$"})," for the client that caused the changes to improve performance."]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>a});var o=n(7294);const r={},s=o.createContext(r);function a(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);