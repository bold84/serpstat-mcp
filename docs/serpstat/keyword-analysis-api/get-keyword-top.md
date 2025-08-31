# getKeywordTop - POST

## Method Description

**DEPRECATED** - The SerpstatKeywordProcedure.getKeywordTop method shows you Google's top-100 search results for the analyzed keyword.

## Credits

1 credit per row in response. The number of charged credits corresponds to the number of results obtained upon request. You can get no more than 60000 results per one request.

## Note

Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `method` | string | Yes | Should be exact `SerpstatKeywordProcedure.getKeywordTop` |
| `params` | object | Yes | Request parameters object |
| `params.keyword` | string | Yes | Keyword to search for |
| `params.se` | string | Yes | Search engine short name (e.g., "g_us" for Google US). Refer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| `params.filters` | object | No | Filters for search. Fields are combined using the **AND** logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria |
| `params.size` | integer | No | Number of results per page in response |

## Response Structure

```json
{
  "id": "string",
  "result": {
    "data": {
      "top": [
        {
          "position": "integer",
          "url": "string",
          "domain": "string",
          "subdomain": "string",
          "types": ["string"]
        }
      ],
      "ads": [],
      "types": ["string"],
      "results": "integer"
    },
    "summary_info": {
      "page": "integer",
      "left_lines": "integer"
    }
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request / response identifier, mirrored from request |
| `result.data.top` | array | Array of top search result objects |
| `position` | integer | Position in search results (1-100) |
| `url` | string | URL of the search result |
| `domain` | string | Domain name |
| `subdomain` | string | Subdomain name |
| `types` | array | Array of snippet types present (e.g., "pic", "snip_breadcrumbs", "snip_image_thumbnail") |
| `result.data.ads` | array | Array of ad results (empty in this response) |
| `result.data.types` | array | Array of all snippet types found |
| `result.data.results` | integer | Total number of results |
| `result.summary_info.page` | integer | Current page number |
| `result.summary_info.left_lines` | integer | Number of remaining results |

## Example Request

### cURL
```bash
curl -X POST 'https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getKeywordTop' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{
  "id": "155",
  "method": "SerpstatKeywordProcedure.getKeywordTop",
  "params": {
    "keyword": "laptop",
    "se": "g_us",
    "filters": {
      "position_to": 5
    },
    "size": 10
  }
}'
```

### JavaScript
```javascript
const response = await fetch('https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getKeywordTop', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: "155",
    method: "SerpstatKeywordProcedure.getKeywordTop",
    params: {
      keyword: "laptop",
      se: "g_us",
      filters: {
        position_to: 5
      },
      size: 10
    }
  })
});

const data = await response.json();
console.log(data);
```

## Example Response

```json
{
  "id": "169",
  "result": {
    "data": {
      "top": [
        {
          "position": 1,
          "url": "https://www.bestbuy.com/site/laptop-computers/all-laptops/pcmcat138500050001.c?id=pcmcat138500050001",
          "domain": "bestbuy.com",
          "subdomain": "www.bestbuy.com",
          "types": ["pic", "snip_breadcrumbs", "snip_image_thumbnail"]
        },
        {
          "position": 2,
          "url": "https://www.walmart.com/cp/computers-laptops-tablets/1089430",
          "domain": "walmart.com",
          "subdomain": "www.walmart.com",
          "types": ["pic", "snip_breadcrumbs", "snip_image_thumbnail"]
        },
        {
          "position": 3,
          "url": "https://www.amazon.com/Notebooks-Laptop-Computers/b?ie=UTF8&node=565108",
          "domain": "amazon.com",
          "subdomain": "www.amazon.com",
          "types": ["pic", "snip_breadcrumbs", "snip_image_thumbnail"]
        },
        {
          "position": 4,
          "url": "https://www.cnet.com/tech/computing/best-laptop/",
          "domain": "cnet.com",
          "subdomain": "www.cnet.com",
          "types": ["pic", "snip_breadcrumbs"]
        },
        {
          "position": 5,
          "url": "https://en.wikipedia.org/wiki/Laptop",
          "domain": "wikipedia.org",
          "subdomain": "en.wikipedia.org",
          "types": ["pic", "snip_breadcrumbs", "snip_image_thumbnail"]
        }
      ],
      "ads": [],
      "types": ["pic"],
      "results": 6570000000
    },
    "summary_info": {
      "page": 1,
      "left_lines": 998460
    }
  }
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
- `bing_us` - Bing United States
- And many more country-specific Google variants

## Notes

- **This method is deprecated** - Consider using alternative methods for new implementations
- Maximum of 60,000 results can be obtained per request
- Results show Google's top-100 search positions
- Each result in the response costs 1 credit
- Starting June 15, 2025, credits will be consumed even for empty results
- The `filters` object supports various filtering options for position, domain, and other criteria