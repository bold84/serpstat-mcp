# deactivateUser - Team Management API

## Overview

The `deactivateUser` method deactivates active users in your team. In order to deactivate a user, you need to specify the user's ID.

User's ID can be found using the `TeamManagement.getList` method.

After deactivation, the user would lose access to Serpstat completely.

### Important Notes

- **Please note: To free a seat in your team you have to delete user from your team via** `TeamManagement.removeUser` **method after deactivating.**
- **Credits**: This method doesn't spend API Credits.

## Endpoint Details

- **URL**: `https://api.serpstat.com/v4`
- **Method**: `POST`
- **Procedure**: `TeamManagement.deactivateUser`

## Request

### Authentication

Requires API Key authentication.

### Request Body

```json
{
  "id": "string",
  "method": "TeamManagement.deactivateUser",
  "params": {
    "user_id": 5555
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Must be exact `TeamManagement.deactivateUser` |
| `params` | object | Yes | Object with params |
| `params.user_id` | integer | Yes | User identifier at Serpstat. Can be obtained via `TeamManagement.getList` method |

### Example

```json
{
  "id": "123",
  "method": "TeamManagement.deactivateUser",
  "params": {
    "user_id": 5555
  }
}
```

## Response

### Success Response (2XX)

```json
{
  "id": "string",
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

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | Yes | Result object for your request |
| `result.success` | boolean | Yes | `true` in case of successful deactivation, `false` if not |
| `result.user_id` | integer | Yes | User identifier at Serpstat |
| `result.limits` | object | Yes | Summary info about seats in your team after this action |
| `result.limits.total` | integer | Yes | Total available seats in your team |
| `result.limits.used` | integer | Yes | Seats currently used |
| `result.limits.left` | integer | Yes | Seats remaining available |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#TeamManagement.deactivateUser' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "TeamManagement.deactivateUser",
    "params": {
      "user_id": 5555
    }
  }'
```

## Related Endpoints

- [`TeamManagement.getList`](./get-list.md) - Get list of users in your team
- [`TeamManagement.addUser`](./add-user.md) - Add a new user to your team
- [`TeamManagement.activateUser`](./activate-user.md) - Activate a user in your team
- [`TeamManagement.removeUser`](./remove-user.md) - Remove a user from your team

## Error Handling

Common error scenarios:

1. **Invalid `user_id`** - Verify the user ID exists and is correct
2. **User already deactivated** - The user may already be deactivated
3. **Cannot deactivate self** - You cannot deactivate your own account
4. **Cannot deactivate team owner** - Team owner cannot be deactivated
5. **Insufficient permissions** - Only team managers can use this API
6. **Plan restrictions** - API only available for mid-tier and above plans

## Best Practices

1. Always check the `success` field in the response to confirm the operation was successful
2. Use the `id` parameter to track requests and match responses
3. Monitor your team's seat usage through the `limits` object in the response
4. **Important**: Remember to use `TeamManagement.removeUser` to completely remove the user and free up their seat
5. Use `TeamManagement.getList` to find the correct `user_id` before deactivation
6. Consider notifying the user before deactivation if applicable
7. Deactivate users who are no longer using Serpstat to maintain security and organization