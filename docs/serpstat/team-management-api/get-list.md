# getList - Team Management API

## Overview

The `getList` method returns a list of all users in your team. This list includes the team owner as well.

This method duplicates basic UI functions: get list of your team members or search for specific member.

### Important Notes

- **Credits**: This method doesn't spend API Credits.

## Endpoint Details

- **URL**: `https://api.serpstat.com/v4`
- **Method**: `POST`
- **Procedure**: `TeamManagement.getList`

## Request

### Authentication

Requires API Key authentication.

### Request Body

```json
{
  "id": "string",
  "method": "TeamManagement.getList",
  "params": {
    "search": "@",
    "page": 1,
    "size": 10
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Must be exact `TeamManagement.getList` |
| `params` | object | No | Optional object for filtering, pagination and search purposes |
| `params.search` | string | No | Optional part of email of member you need to find |
| `params.page` | integer | No | Page number for pagination |
| `params.size` | integer | No | Records per page |

### Example

```json
{
  "id": "123",
  "method": "TeamManagement.getList",
  "params": {
    "search": "@",
    "page": 1,
    "size": 10
  }
}
```

## Response

### Success Response (200)

```json
{
  "id": "string",
  "result": {
    "data": [
      {
        "user_id": 5555,
        "email": "john.doe@example.local",
        "status": 1,
        "first_name": "John",
        "last_name": "Doe"
      }
    ],
    "summary_info": {
      "total": "1",
      "page": 1
    },
    "limits": {
      "total": 10,
      "used": 1,
      "left": 9
    }
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | Yes | Result object for your request |
| `result.data` | array[object] | Yes | Array of objects contains info about your team members |
| `result.data[].user_id` | integer | Yes | User's identifier at Serpstat |
| `result.data[].email` | string | Yes | User's email address |
| `result.data[].status` | integer | Yes | User's status (1 = active, other values may indicate different states) |
| `result.data[].first_name` | string | Yes | User's first name |
| `result.data[].last_name` | string | Yes | User's last name |
| `result.summary_info` | object | Yes | Object contains data about search results and pagination |
| `result.summary_info.total` | string | Yes | Total number of matching records |
| `result.summary_info.page` | integer | Yes | Current page number |
| `result.limits` | object | Yes | Object contains summary info about seats in your team |
| `result.limits.total` | integer | Yes | Total available seats in your team |
| `result.limits.used` | integer | Yes | Seats currently used |
| `result.limits.left` | integer | Yes | Seats remaining available |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#TeamManagement.getList' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "TeamManagement.getList",
    "params": {
      "search": "@",
      "page": 1,
      "size": 10
    }
  }'
```

## Related Endpoints

- [`TeamManagement.addUser`](./add-user.md) - Add a new user to your team
- [`TeamManagement.activateUser`](./activate-user.md) - Activate a user in your team
- [`TeamManagement.deactivateUser`](./deactivate-user.md) - Deactivate a user in your team
- [`TeamManagement.removeUser`](./remove-user.md) - Remove a user from your team

## Error Handling

Common error scenarios:

1. **Invalid pagination parameters** - Ensure `page` and `size` are positive integers
2. **Invalid search query** - Search parameter should be a string
3. **Empty results** - No users match the search criteria or team is empty
4. **Insufficient permissions** - Only team managers can use this API
5. **Plan restrictions** - API only available for mid-tier and above plans

## Best Practices

1. Always check the `data` array to see if users were returned
2. Use the `summary_info.total` field to determine if there are more results to fetch
3. Implement pagination using the `page` and `size` parameters for large teams
4. Use the `search` parameter to quickly find specific team members
5. Monitor your team's seat usage through the `limits` object in the response
6. Use the `user_id` from the response for other team management operations
7. Cache the results when possible to reduce API calls for frequently accessed team information