# getKeywordSerp

The `tasks.getKeywordSerp` method returns the raw SERP in HTML format using task ID and keyword ID.

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
  "method": "tasks.getKeywordSerp",
  "params": {
    "taskId": 5484945,
    "keywordId": 706657334
  }
}
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | integer | Yes | Crawling identifier |
| `keywordId` | integer | Yes | Id number of a required keyword for getting a raw SERP (you can get it in the SERP crawling response from the method `tasks.getTaskResult`) |

## Response

### Success Response (200)

```json
{
  "id": "123",
  "result": {
    "date": "2025-02-11",
    "serp": "<!doctype html><html itemscope=\"\"itemtype=\"http://schema.org/SearchResultsPage\"..."
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `result` | object | The result of the successfully processed request |
| `result.date` | string | SERP date in format YYYY-MM-DD |
| `result.serp` | string | A raw SERP in HTML format |

## cURL Example

```bash
curl --request POST \
  --url 'https://serpstat.com/rt/api/v2/?token=123#tasks.getKeywordSerp' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "tasks.getKeywordSerp",
    "params": {
      "taskId": 5484945,
      "keywordId": 706657334
    }
  }'
```

## Response Examples

### Example 1: Success Response

```json
{
  "id": "123",
  "result": {
    "date": "2025-02-11",
    "serp": "<!doctype html><html itemscope=\"\"itemtype=\"http://schema.org/SearchResultsPage\"..."
  }
}
```

### Error Examples

- **Error: Task is not found (Incorrect task ID)** - The provided task ID does not exist or is invalid
- **Error: Keyword is not found (Wrong keyword ID)** - The provided keyword ID does not exist or is invalid

## Notes

- This method returns the raw SERP data in HTML format for a specific keyword within a task
- The keyword ID must be obtained from the `tasks.getTaskResult` response
- The response contains the SERP date and the complete HTML representation of the search engine results page
- This is useful for detailed SERP analysis, custom parsing, or when you need the exact HTML structure of the search results
- The method does not consume API credits, making it cost-effective for retrieving raw SERP data