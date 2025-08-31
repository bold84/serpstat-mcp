# removeUser | Team Management API

## Overview

The [`TeamManagement.removeUser`](https://api.serpstat.com/v4/#TeamManagement.removeUser) method removes existing user from your team.

In order to remove user you need to specify the user's ID.

User's ID can be found using [`TeamManagement.getList`](https://api.serpstat.com/v4/#TeamManagement.getList) method.

If you set parameter `merge_projects` to `true` all user's projects will be transfered to the team owner, including all history data.

If a user has not been previously deactivated via [`TeamManagement.deactivateUser`](https://api.serpstat.com/v4/#TeamManagement.deactivateUser) method, they will retain access to the Serpstat UI but will lose access to all projects they own.

### Credits
This method doesn't spent API Credits.

### Caution
Use this method carefully. You can lose user's projects and their history.

## Endpoint

- **URL**: `https://api.serpstat.com/v4/#TeamManagement.removeUser`
- **Method**: `POST`
- **Authentication**: API Key

## Request

### Security

- **API Key** - Required

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Should be exact `TeamManagement.removeUser` |
| `params` | object | Yes | requred params |

#### Params Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | Yes | User id at Serpstat. Can be found using [`TeamManagement.getList`](https://api.serpstat.com/v4/#TeamManagement.getList) method. |
| `merge_projects` | boolean | Yes | `"true"` - transfer user's projects to the team owner.<br>`"false"` - projects will be deleted |

### Request Example

```json
{
  "id": "123",
  "method": "TeamManagement.removeUser",
  "params": {
    "user_id": 5555,
    "merge_projects": true
  }
}
```

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#TeamManagement.removeUser' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "TeamManagement.removeUser",
    "params": {
      "user_id": 5555,
      "merge_projects": true
    }
  }'
```

## Response

### Success Response (200)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | Yes | result object for your request |
| `result.success` | boolean | Yes | `"true"` in case of successfull deactivation, `"false"` if not |
| `result.user_id` | integer | Yes | User's identifier at Serpstat |
| `result.limits` | object | Yes | Summary info about seats in your team after this action |

#### Response Example

```json
{
  "id": "128",
  "result": {
    "success": true,
    "user_id": 5555,
    "limits": {
      "total": 10,
      "used": 2,
      "left": 8
    }
  }
}
```

## Error Handling

The API returns standard HTTP status codes and error messages. Make sure to handle potential errors in your application code.

## Rate Limiting

This method doesn't consume API credits, but be mindful of general API rate limiting when making multiple requests.

## Notes

- Always deactivate a user before removing them to avoid potential access issues
- Use `merge_projects: true` to transfer user's projects to the team owner instead of deleting them
- The user's ID can be obtained using the [`TeamManagement.getList`](https://api.serpstat.com/v4/#TeamManagement.getList) method
- This method provides information about team seat limits after the removal operation