# addUser - Team Management API

## Overview

The `addUser` method invites new users to join your team. In order to send an invitation, you need to specify the user's email address.

This method duplicates Team management functionality in the [user interface](https://serpstat.com/users/management/).

### Important Notes

- **Only unregistered users or registered users who are on the Free plan and didn't have paid plan earlier can be invited to the team.**
- **The team management API is available only to team managers and for plans of mid-tier and above.**
- **Credits**: This method doesn't spend API Credits.

## Endpoint Details

- **URL**: `https://api.serpstat.com/v4`
- **Method**: `POST`
- **Procedure**: `TeamManagement.addUser`

## Request

### Authentication

Requires API Key authentication.

### Request Body

```json
{
  "id": "123",
  "method": "TeamManagement.addUser",
  "params": {
    "email": "john.doe@example.local"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Must be exact `TeamManagement.addUser` |
| `params.email` | string | Yes | User email |

### Example

```json
{
  "id": "123",
  "method": "TeamManagement.addUser",
  "params": {
    "email": "john.doe@example.local"
  }
}
```

## Response

### Success Response (200)

```json
{
  "id": "126",
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
| `result.success` | boolean | Yes | `true` in case of successful addition, `false` if not |
| `result.user_id` | integer | Yes | User's identifier at Serpstat |
| `result.limits` | object | Yes | Summary info about seats in your team after this action |
| `result.limits.total` | integer | Yes | Total available seats in your team |
| `result.limits.used` | integer | Yes | Seats currently used |
| `result.limits.left` | integer | Yes | Seats remaining available |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#TeamManagement.addUser' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "TeamManagement.addUser",
    "params": {
      "email": "john.doe@example.local"
    }
  }'
```

## Related Endpoints

- [`TeamManagement.getList`](./get-list.md) - Get list of users in your team
- [`TeamManagement.activateUser`](./activate-user.md) - Activate a user in your team
- [`TeamManagement.deactivateUser`](./deactivate-user.md) - Deactivate a user in your team
- [`TeamManagement.removeUser`](./remove-user.md) - Remove a user from your team

## Error Handling

Common error scenarios:

1. **Invalid email format** - Ensure the email is properly formatted
2. **User already exists in team** - The user may already be a member of your team
3. **User not eligible for invitation** - Only unregistered users or Free plan users without prior paid plans can be invited
4. **Insufficient permissions** - Only team managers can use this API
5. **Plan restrictions** - API only available for mid-tier and above plans
6. **Team seat limit reached** - No more available seats in your team

## Best Practices

1. Always check the `success` field in the response to confirm the operation was successful
2. Use the `id` parameter to track requests and match responses
3. Monitor your team's seat usage through the `limits` object in the response
4. Verify email addresses before sending invitations to ensure they're valid
5. Use `TeamManagement.getList` to check if a user is already in your team before attempting to add them
6. Consider implementing email validation on your end before making API calls