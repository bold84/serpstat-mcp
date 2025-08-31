# getParsingBalance

The `tasks.getParsingBalance` method returns balance on the account, used for SERP and volume parsing. It shows cost per 1 crawled keyword.

## Authentication

This method requires API key authentication.

## Credits

This method doesn't spent API credits.

## AI Overview

Google AI Overview results are currently available within standard Desktop SERP Crawling requests at no additional cost. This allows you to access AI-generated summaries and reference sources as part of your regular SERP data. However, starting August 1, 2025, AI Overview data will become a separate optional parameter type=`regular_aio` with additional pricing. After this date, you will need to specifically enable AI Overview in your API requests and account for the additional costs in your usage billing.

## Request

```json
{
  "id": "123",
  "method": "tasks.getParsingBalance"
}
```

### Request Parameters

This method does not require any parameters.

## Response

### Success Response (200)

```json
{
  "id": "123",
  "result": {
    "available_usd": "99999.891",
    "serp_parsing_cost": "0.0004",
    "volume_parsing_cost": "0.0006"
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `result` | object | The result of the successfully processed request |
| `result.available_usd` | string | Account balance in the USA dollars |
| `result.serp_parsing_cost` | string | Cost for crawling 1 SERP |
| `result.volume_parsing_cost` | string | The cost of receiving search volume for 1 keyword |

## cURL Example

```bash
curl --request POST \
  --url 'https://serpstat.com/rt/api/v2/?token=123#tasks.getParsingBalance' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "tasks.getParsingBalance"
  }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "available_usd": "99999.891",
    "serp_parsing_cost": "0.0004",
    "volume_parsing_cost": "0.0006"
  }
}
```

## Notes

- This method provides account balance information for SERP and volume parsing services
- The response includes available balance in USD and costs for different parsing services
- SERP parsing cost represents the cost to crawl one SERP result
- Volume parsing cost represents the cost to get search volume data for one keyword
- This method does not consume API credits, making it useful for monitoring account balance
- The balance information helps users track their usage and plan their crawling activities
- Costs are displayed as string values representing dollar amounts