# SMS-Management-System

This is a system that manages the user's sms

## Features

- Users can create contact
- Users can get all contacts
- Users can get a single contact
- Users can delete a contact
- Users can create a message
- Users can get all messages associated with a user
- Users can delete a message

## API

### POST A CONTACT (/api/v1/contacts)

- name, number

#### Request

```
{
  "name": "oluwole",
  "phoneNumber": "12345678",
}
```

#### Response

```

{
  "message": "Successfully added oluwole",
  "data": {
    "id": 3,
    "name": "oluwole",
    "phoneNumber": 133246357,
    "updatedAt": "2019-01-14T15:46:05.146Z",
    "createdAt": "2019-01-14T15:46:05.146Z"
  }
}
```

### GET ALL CONTACTS (/api/v1/contacts/)
#### Response
```
{
    "message": "Found",
    "data": [
        {
            "id": 1,
            "name": "bimbo",
            "phoneNumber": "08023489808",
            "createdAt": "2019-01-14T14:20:53.806Z",
            "updatedAt": "2019-01-14T14:20:53.806Z"
        },
        {
            "id": 4,
            "name": "adebisi",
            "phoneNumber": "3442352434",
            "createdAt": "2019-01-14T16:23:02.236Z",
            "updatedAt": "2019-01-14T16:23:02.236Z"
        }
    ]
}
```

### GET A SINGLE CONTACT (/api/v1/contacts/:contactId)

- where contactId = 3

#### Response

```
{
  "message": "Found",
  "data": {
    "id": 3,
    "name": "oluwole",
    "phoneNumber": "133246357",
    "createdAt": "2019-01-14T15:46:05.146Z",
    "updatedAt": "2019-01-14T15:46:05.146Z"
  }
}
```

### DELETE A CONTACT (/api/v1/contacts/:contactId)

- where contactId = 3

#### Response

```
{
  "deleted": true,
  "message": "Deleted"
}
```

### POST A MESSAGE (/api/v1/messages)

- senderId, receiverId, message, status (optional)

#### Request

```
{
	"senderId": 1,
	"receiverId": 4,
	"message": "Hello there"
}
```

#### Params

senderId = 1
receiverId = 4

#### Response

```
{
  "message": "message DRAFTed",
  "data": {
      "status": "DRAFT",
      "id": 3,
      "senderId": 1,
      "receiverId": 4,
      "message": "Hello there",
      "updatedAt": "2019-01-14T16:23:10.665Z",
      "createdAt": "2019-01-14T16:23:10.665Z"
  }
}
```

### GET ALL MESSAGES (/api/v1/messages)

#### Response

```
{
    "message": "Found",
    "data": [
        {
            "id": 2,
            "message": "Hello there",
            "status": "DRAFT",
            "createdAt": "2019-01-14T16:22:06.084Z",
            "updatedAt": "2019-01-14T16:22:06.084Z",
            "senderId": 1,
            "receiverId": 1
        },
        {
            "id": 3,
            "message": "Hello there",
            "status": "DRAFT",
            "createdAt": "2019-01-14T16:23:10.665Z",
            "updatedAt": "2019-01-14T16:23:10.665Z",
            "senderId": 1,
            "receiverId": 4
        }
    ]
}
```

### GET MESSAGES BY CONTACT (/api/v1/contacts/:senderId)

- where senderId = 1

#### Response

```
{
    "message": "Found",
    "data": {
        "id": 1,
        "name": "bimbo",
        "phoneNumber": "08023489808",
        "createdAt": "2019-01-14T14:20:53.806Z",
        "updatedAt": "2019-01-14T14:20:53.806Z",
        "sentMessages": [
            {
                "id": 2,
                "message": "Hello there",
                "status": "DRAFT",
                "createdAt": "2019-01-14T16:22:06.084Z",
                "updatedAt": "2019-01-14T16:22:06.084Z",
                "senderId": 1,
                "receiverId": 1
            },
            {
                "id": 3,
                "message": "Hello there",
                "status": "DRAFT",
                "createdAt": "2019-01-14T16:23:10.665Z",
                "updatedAt": "2019-01-14T16:23:10.665Z",
                "senderId": 1,
                "receiverId": 4
            }
        ],
        "receivedMessages": [
            {
                "id": 2,
                "message": "Hello there",
                "status": "DRAFT",
                "createdAt": "2019-01-14T16:22:06.084Z",
                "updatedAt": "2019-01-14T16:22:06.084Z",
                "senderId": 1,
                "receiverId": 1
            }
        ]
    }
}
```

### DELETE A MESSAGE (/api/v1/message/:messageId)

- where messageId = 6

#### Response

```
{
    "deleted": true,
    "message": "Deleted"
}
```
