# activateUser - Team Management API

## Overview

The `activateUser` method activates inactive users in your team. In order to activate a user, you need to specify the user's ID (`user_id`). User's ID can be found using the `TeamManagement.getList` method.

This method duplicates Team management functionality in the [user interface](https://serpstat.com/users/management/).

### Important Notes

- **Only unregistered users or registered users who are on the Free plan and didn't have paid plan earlier can be invited to the team.**
- **The team management API is available only to team managers and for plans of mid-tier and above.**
- **Credits**: This method doesn't spend API Credits.

## Endpoint Details

- **URL**: `https://api.serpstat.com/v4`
- **Method**: `POST`
- **Procedure**: `TeamManagement.activateUser`

## Request

### Authentication

Requires API Key authentication.

### Request Body

```json
{
  "id": "123",
  "method": "TeamManagement.activateUser",
  "params": {
    "user_id": 5555
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Must be exact `TeamManagement.activateUser` |
| `params.user_id` | integer | Yes | User identifier at Serpstat |

### Example

```json
{
  "id": "123",
  "method": "TeamManagement.activateUser",
  "params": {
    "user_id": 5555
  }
}
```

## Response

### Success Response (200)

```json
{
  "id": "125",
  "result": {
    "success": true,
    "user_id": 5555,
    "limits": {
      "total": 10000,
      "used": 5,
      "left": 9995
    }
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | Yes | |
| `result.success` | boolean | Yes | `true` in case of success, `false` if operation was unsuccessful |
| `result.user_id` | integer | Yes | User identifier |
| `result.limits` | object | Yes | Your team seats credits usage |
| `result.limits.total` | integer | Yes | Total available credits |
| `result.limits.used` | integer | Yes | Credits used |
| `result.limits.left` | integer | Yes | Credits remaining |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#TeamManagement.activateUser' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "TeamManagement.activateUser",
    "params": {
      "user_id": 5555
    }
  }'
```

## Related Endpoints

- [`TeamManagement.getList`](./get-list.md) - Get list of users in your team
- [`TeamManagement.addUser`](./add-user.md) - Add a new user to your team
- [`TeamManagement.deactivateUser`](./deactivate-user.md) - Deactivate a user in your team
- [`TeamManagement.removeUser`](./remove-user.md) - Remove a user from your team

## Error Handling

Common error scenarios:

1. **Invalid `user_id`** - Verify the user ID exists and is correct
2. **User already active** - The user may already be active or not eligible for activation
3. **Insufficient permissions** - Only team managers can use this API
4. **Plan restrictions** - API only available for mid-tier and above plans

## Best Practices

1. Always check the `success` field in the response to confirm the operation was successful
2. Use the `id` parameter to track requests and match responses
3. Monitor your team's credit usage through the `limits` object in the response
4. Use `TeamManagement.getList` to find the correct `user_id` before activation