## [OpenMediaPortal](https://github.com/OpenMediaPortal/OpenMediaPortal) Version 1

 - [Library](#index-library)
   - [Index](#index-library)
   - [Create](#create-library)
   - [Update](#update-library)
   - [Destroy](#destroy-library)
 - [File](#index-file)
   - [Index](#index-file)
   - [Show](#show-file)
   - [Create](#create-file)
   - [Update](#update-file)
   - [Destroy](#destroy-file)
 - [Sync](#index-sync)
   - [Index](#index-sync)
   - [Show](#show-sync)
   - [Start](#start-sync)
   - [Destroy All](#destroy-all-sync)
   - [Destroy](#destroy-sync)
 - [Stream](#show-stream)
   - [Show](#show-stream)


---


## Index Library
  List all libraries

| Method | URL |
| :--- | :--- |
| `Get` | `/library` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "libkey": { "libmime": "", "libpath": [] } }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/",
  type: "GET",
  success: function(r) {
    console.log(JSON.stringify(r,null,2));
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "music": {
    "libmime": "audio",
    "libpath": [
      "/srv/Music/"
    ]
  },
  "photos": {
    "libmime": "image",
    "libpath": [
      "/srv/Photos2014/",
      "/srv/Photos2014/",
      "/srv/Photos2015/",
      "/srv/Photos2016/"
    ]
  },
  "tv": {
    "libmime": "video",
    "libpath": [
      "/srv/TV/"
    ]
  },
  "movies": {
    "libmime": "video",
    "libpath": [
      "/srv/Movies/"
    ]
  },
  "other": {
    "libmime": "",
    "libpath": [
      "/srv/Other/"
    ]
  }
}
```
</details>


---


## Create Library
  Create a new library entry

| Method | URL |
| :--- | :--- |
| `POST` | `/library` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | Content-Type: application/json |
| **Data** | `{ "libkey": { "libmime": "", "libpath": [] } }` |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "libkey": { "libmime": "", "libpath": [] } }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 400 | `{ "error": "Bad Format", "message": "Invalid Type", "property": "libkey" }` |
| 415 | `{ "error": "Unsupported Media Type" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library",
  type: "POST",
  headers: { "Content-Type": "application/json" },
  data: '{ "podcasts": { "libmime": "audio", "libpath": ["/srv/podcasts"] } }',
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "podcasts": {
    "libmime": "audio",
    "libpath": [
      "/srv/podcasts"
    ]
  }
}
```
</details>


---


## Update Library
  Update (or create) an existing library entry

| Method | URL |
| :--- | :--- |
| `PUT` | `/library/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | Content-Type: application/json |
| **Data** | `{ "libmime": "", "libpath": [] }` |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "libmime": "", "libpath": [] }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 400 | `{ "error": "Bad Format", "message": "Invalid Type" }` |
| 415 | `{ "error": "Unsupported Media Type" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music",
  type: "PUT",
  headers: { "Content-Type": "application/json" },
  data: '{ "libmime": "audio", "libpath": ["/srv/music"] }',
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "libmime": "audio",
  "libpath": [
    "/srv/music"
  ]
}
```
</details>


---


## Destroy Library
  Delete a library entry, and remove all file information in that library

  Does *not* delete files from the file system

| Method | URL |
| :--- | :--- |
| `DELETE` | `/library/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 204 | None |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music",
  type: "DELETE"
});
```
</details>


---


## Index File
  Lists all files contained in a library

| Method | URL |
| :--- | :--- |
| `GET` | `/library/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | `group=:group&sort=:sort` |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "group": [], "index": {}, "lookup": {}, "files": [] }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music?group=artist,album,title",
  type: "GET",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "group": [
    "artist",
    "album",
    "title"
  ],
  "index": {
    "artist": {
      "Queen": [
        [
          0,
          0
        ]
      ]
    },
    "album": {
      "News of the World": [
        [
          0,
          0
        ]
      ]
    },
    "title": {
      "We Are the Champions": [
        [
          0,
          0
        ]
      ]
    }
  },
  "lookup": {
    "57d85c655ee7711200250df0": 0
  },
  "files": [
    {
      "_id": "57d85c655ee7711200250df0",
      "artist": "Queen",
      "album": "News of the World",
      "title": "We are the Champions",
      "mimetype": "audio/mpeg",
      "name": "We are the Champions.mp3"
    }
  ]
}
```
</details>


---


## Show File
  Returns the single file information contained in a library

| Method | URL |
| :--- | :--- |
| `GET` | `/library/:libkey/:id` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "_id": "", "mimetype": "", "path": "", "name": "", "library": "" }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music/57d85c655ee7711200250df0",
  type: "GET",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "_id": "57d85c655ee7711200250df0",
  "artist": "Queen",
  "album": "News of the World",
  "title": "We Are the Champions",
  "mimetype": "audio/mpeg",
  "path": "/srv/Music/Queen/News of the World/We are the Champions.mp3",
  "name": "We are the Champions.mp3",
  "library": "music"
}
```
</details>


---


## Create File
---
  Add the file information to a library

| Method | URL |
| :--- | :--- |
| `POST` | `/library/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | Content-Type: application/json |
| **Data** | `{ "mimetype": "", "path": "", "name": "", "library": "" }` |

#### Success Response
| Code | Body |
| :--- | :--- |
| 201 | `{ "_id": "", "mimetype": "", "path": "", "name": "", "library": "" }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |
| 400 | `{ "error": "Bad Format" }` |
| 415 | `{ "error": "Unsupported Media Type" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music",
  type: "POST",
  headers: { "Content-Type": "application/json" },
  data: '{ "mimetype": "audio/mpeg", "path": "/srv/Music/test.mp3", "name": "Test.mp3", "library": "music" }',
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "_id": "57d85ebe5ee7711200250e00",
  "mimetype": "audio/mpeg",
  "path": "/srv/Music/test.mp3",
  "name": "Test.mp3",
  "library": "music"
}
```
</details>


---


## Update File
  Update the information of a file in a library

| Method | URL |
| :--- | :--- |
| `PUT` | `/library/:libkey/:id` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | Content-Type: application/json |
| **Data** | `{ "mimetype": "", "path": "", "name": "", "library": "" }` |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "_id": "", "mimetype": "", "path": "", "name": "", "library": "" }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |
| 400 | `{ "error": "Bad Format" }` |
| 415 | `{ "error": "Unsupported Media Type" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music/57d85ebe5ee7711200250e00",
  type: "PUT",
  headers: { "Content-Type": "application/json" },
  data: '{ "mimetype": "audio/mpeg", "path": "/srv/Music/test.mp3", "name": "Test.mp3", "library": "music" }',
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "_id": "57d85ebe5ee7711200250e00",
  "mimetype": "audio/mpeg",
  "path": "/srv/Music/test.mp3",
  "name": "Test.mp3",
  "library": "music",
}
```
</details>


---


## Destroy File
  Delete information of a file in a library

  Does *not* delete the file from the file system

| Method | URL |
| :--- | :--- |
| `DELETE` | `/library/:libkey/:id` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 204 | None |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/library/music/57d85ebe5ee7711200250e00",
  type: "DELETE",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>


---


## Index Sync
  List all sync information

| Method | URL |
| :--- | :--- |
| `GET` | `/sync` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `[ { "_id": "", "library": "", "lastSynced": "", "status": { "syncing": false, "syncTime": 0, "totalFiles": 0 } } ]` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/sync",
  type: "GET",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
[
  {
    "_id": "57d85c655ee7711200250d95",
    "library": "music",
    "lastSynced": "2016-09-13T20:07:01.518Z",
    "status": {
      "syncing": false,
      "syncTime": 123,
      "totalFiles": 1
    }
  }
]
```
</details>


---


## Show Sync
  List specific sync information for a library

| Method | URL |
| :--- | :--- |
| `GET` | `/sync/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `[ { "_id": "", "library": "", "lastSynced": "", "status": { "syncing": false, "syncTime": 0, "totalFiles": 0 } } ]` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/sync/music",
  type: "GET",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "_id": "57d85c655ee7711200250d95",
  "library": "music",
  "lastSynced": "2016-09-13T20:07:01.518Z",
  "status": {
    "syncing": false,
    "syncTime": 123,
    "totalFiles": 1
  }
}
```
</details>


---


## Start Sync
  Initiate a sync on a library

  Will throw a `409` error if a sync is already in progress

| Method | URL |
| :--- | :--- |
| `PUT` | `/sync/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | `{ "_id": "", "library": "", "lastSynced": "", "status": { "syncing": true, "syncTime": 0, "totalFiles": 0 } }` |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |
| 409 | `{ "_id": "", "library": "", "lastSynced": "", "status": { "syncing": true, "syncTime": 0, "totalFiles": 0 } }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/sync/music",
  type: "PUT",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>

<details>
<summary><strong>Sample Response</strong></summary>

```json
{
  "_id": "57d85c655ee7711200250d95",
  "library": "music",
  "lastSynced": "2016-09-13T20:30:39.982Z",
  "status": {
    "syncing": true,
    "syncTime": 0,
    "totalFiles": 0
  }
}
```
</details>


---


## Destroy All Sync
  Remove all sync and file information for *all* libraries

  Does *not* delete files from the file system

| Method | URL |
| :--- | :--- |
| `DELETE` | `/sync` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 204 | None |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/sync",
  type: "DELETE",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>


---


## Destroy Sync
  Remove all sync and file information for a specific library

  Does *not* delete files from the file system

| Method | URL |
| :--- | :--- |
| `DELETE` | `/sync/:libkey` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 204 | None |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
$.ajax({
  url: "/sync/music",
  type: "DELETE",
  success: function(r) {
    console.log(JSON.stringify(r,null,2))
  }
});
```
</details>


---


## Show Stream
  Serve file data using the appropriate mimetype

  No file compression is done

  Raw binary file is piped through the response body

| Method | URL |
| :--- | :--- |
| `GET` | `/stream/:id` |

| Parameters | |
| :--- | :--- |
| **URL** | None |
| **Headers** | None |
| **Data** | None |

#### Success Response
| Code | Body |
| :--- | :--- |
| 200 | Binary Data |

#### Error Response
| Code | Body |
| :--- | :--- |
| 404 | `{ "error": "Not Found" }` |

<details>
<summary><strong>Sample Call</strong></summary>

```javascript
  var audio = $("<audio controls/>");
  audio.src = "/stream/57d85c655ee7711200250df0";
  audio.type = "audio/mpeg";
  audio[0].load();
  audio[0].play();
```
</details>


---
