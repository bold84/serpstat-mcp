# exportSuggestions - POST

## Method Description

Export suggestions data for a given keyword.

## Credits

1 credit per row in response

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keyword` | string | Yes | Keyword for which you want to get suggestions |
| `se` | string | Yes | Search engine short name (e.g., g_uk for Google UK) |
| `filters` | object | No | Filters to apply to the results |
| `sort` | object | No | Sort parameters |
| `page` | integer | No | Page number (default: 1) |
| `page_size` | integer | No | Number of items per page (default: 100, max: 10000) |

## Response Structure

```json
{
  "result": {
    "suggestions": [
      {
        "keyword": "string",
        "se": "string",
        "count": "integer",
        "type": "string"
      }
    ]
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `suggestions` | array | Array of suggestion objects |
| `keyword` | string | Suggested keyword |
| `se` | string | Search engine code |
| `count` | integer | Number of times this suggestion appears |
| `type` | string | Type of suggestion |

## Example Request

### cURL
```bash
curl -X POST 'https://api.serpstat.com/v3/exportSuggestions' \
-H 'Authorization: Bearer YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "keyword": "seo tools",
  "se": "g_us",
  "page": 1,
  "page_size": 100
}'
```

### JavaScript
```javascript
const response = await fetch('https://api.serpstat.com/v3/exportSuggestions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    keyword: 'seo tools',
    se: 'g_us',
    page: 1,
    page_size: 100
  })
});

const data = await response.json();
console.log(data);
```

## Example Response

```json
{
  "result": {
    "suggestions": [
      {
        "keyword": "best seo tools",
        "se": "g_us",
        "count": 1250,
        "type": "related"
      },
      {
        "keyword": "free seo tools",
        "se": "g_us",
        "count": 2100,
        "type": "related"
      },
      {
        "keyword": "seo tools for small business",
        "se": "g_us",
        "count": 850,
        "type": "related"
      }
    ]
  },
  "status": "ok",
  "code": 200
}
```

## Search Engine Short Names

Common search engine codes include:
- `g_us` - Google United States
- `g_uk` - Google United Kingdom
- `g_ca` - Google Canada
- `g_au` - Google Australia
- `g_de` - Google Germany
- `g_fr` - Google France
- `g_es` - Google Spain
- `g_it` - Google Italy
- `g_nl` - Google Netherlands
- `g_br` - Google Brazil
- `g_ru` - Google Russia
- `g_in` - Google India
- `g_jp` - Japan
- `g_kr` - Google Korea
- `g_cn` - Google China
- `y_us` - Yahoo United States
- `b_us` - Bing United States

## Notes

- This is an export endpoint that can return large amounts of data
- Use pagination to manage response size
- The `page_size` parameter can be set up to 10,000 for bulk data retrieval
- Results are sorted by relevance by default