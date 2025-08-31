# getTaskResult

The `tasks.getTaskResult` method allows getting a SERP Crawling of regular and local results using the identifiers.

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
  "method": "tasks.getTaskResult",
  "params": {
    "taskId": 5484945,
    "page": 1
  }
}
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | integer | Yes | Crawling identifier |
| `page` | integer | No | Page number |

## Response

### Success Response (200)

```json
{
  "id": "123",
  "result": {
    "task_meta": {
      "se_id": "1",
      "country_id": "23",
      "region_id": "21176",
      "device_type_id": "1"
    },
    "tops": [
      {
        "keyword_id": "706657334",
        "keyword": "burger",
        "keyword_data": {
          "top": [
            {
              "url": "https://www.kayak.com/Cheap-Metairie-Car-Rentals.20715.cars.ksp",
              "domain": "kayak.com",
              "subdomain": "www.kayak.com",
              "position": 1,
              "title": "Metairie car rentals from $37/day",
              "title_length": 33,
              "snippet": "In the past 72 hours, the cheapest rental cars were found at Thrifty ($28.70/day), Hertz ($44.97/day) and Enterprise Rent-A-Car ($47.52/day). Starting from $36.70",
              "snippet_length": 162,
              "breadcrumbs": "https://www.kayak.com › Cheap-Metairie-Car-Rentals.2...",
              "types": [
                "snip_breadcrumbs",
                "snip_image_thumbnail",
                "snip_url_in_aio"
              ],
              "spec_elements": [
                {
                  "anchor": null,
                  "content": "https://www.kayak.com › Cheap-Metairie-Car-Rentals.2...",
                  "href": null,
                  "sort_number": 0,
                  "type": "snip_breadcrumbs"
                },
                {
                  "anchor": null,
                  "content": null,
                  "href": null,
                  "sort_number": 1,
                  "type": "snip_image_thumbnail"
                },
                {
                  "anchor": null,
                  "content": null,
                  "href": null,
                  "sort_number": 2,
                  "type": "snip_url_in_aio"
                }
              ]
            }
          ],
          "ads": {
            "1": [
              {
                "url": "https://www.avis.com/en/locations/find-a-location",
                "domain": "avis.com",
                "subdomain": "www.avis.com",
                "position": 1,
                "title": "Avis Rent a Car | Avis® Car Rental",
                "text": "Avis has a wide range of car options and thousands of convenient locations",
                "breadcrumbs": "https://www.avis.com"
              }
            ],
            "2": [],
            "3": []
          },
          "results": 1050000,
          "right_spell": "",
          "types": [
            "related_search",
            "also_asks",
            "ai_overview",
            "local_pack",
            "pic",
            "ads_top"
          ],
          "top_features_content": [
            {
              "LocalPack": {
                "LocalPackSnippet": {
                  "localpack": [
                    {
                      "title": "Enterprise Rent-A-Car",
                      "ads": false,
                      "thumbnail": false,
                      "extensions": [
                        "Car rental agency",
                        "Metairie, LA",
                        "(504) 457-0180",
                        "Closed",
                        "Opens 7:30 AM"
                      ],
                      "rating": "4.2",
                      "review": "194",
                      "pricing": null,
                      "wrapped": "\"Cannot recommend highly enough.\"",
                      "options": null,
                      "position": 1
                    },
                    {
                      "title": "Enterprise Rent-A-Car",
                      "ads": false,
                      "thumbnail": false,
                      "extensions": [
                        "Car rental agency",
                        "Metairie, LA",
                        "(504) 454-2247",
                        "Closed",
                        "Opens 8 AM"
                      ],
                      "rating": "4.0",
                      "review": "413",
                      "pricing": null,
                      "wrapped": "\"It had been damaged previously, but none of that was too big of a deal.\"",
                      "options": null,
                      "position": 2
                    },
                    {
                      "title": "Budget Car Rental",
                      "ads": false,
                      "thumbnail": false,
                      "extensions": [
                        "Car rental agency",
                        "Metairie, LA",
                        "(504) 887-2952",
                        "Closed",
                        "Opens 9 AM"
                      ],
                      "rating": "3.3",
                      "review": "37",
                      "pricing": null,
                      "wrapped": "\"She gave us an additional discount.\"",
                      "options": null,
                      "position": 3
                    }
                  ]
                }
              }
            },
            {
              "PeopleAlsoAsk": {
                "PeopleAlsoAsk": {
                  "people_also_ask_block": [],
                  "people_also_ask_questions": [
                    "Which car rental company has the lowest fees?",
                    "How to get the lowest price on a rental car?",
                    "How can I pay less for a rental car?",
                    "Is it cheaper to rent a car for a week or by day?"
                  ]
                }
              }
            },
            {
              "AiOverview": {
                "AiOverview": {
                  "aio_content": {
                    "text": "To find a cheap car rental in Metairie, LA, compare prices from different rental companies, consider booking last-minute, and look for deals on smaller, more fuel-efficient cars. Here's a more detailed breakdown of how to find the best deals: 1. Compare Prices: Use online comparison websites: Sites like Kayak, Expedia, and Orbitz search multiple rental companies to find the best prices. Check multiple rental companies: Consider Thrifty, Hertz, Enterprise, Dollar, Budget, and Avis.",
                    "links": [
                      {
                        "text": "Avis",
                        "url": "https://www.avis.com/"
                      }
                    ]
                  },
                  "aio_references": [
                    {
                      "title": "Metairie car rentals from $37/day - Kayak",
                      "snippet": "End of interactive chart. What is the cheapest car rental company in Metairie? In the past 72 hours, the cheapest rental cars were...",
                      "url": "https://www.kayak.com/Cheap-Metairie-Car-Rentals.20715.cars.ksp",
                      "domain": "kayak.com",
                      "subdomain": "www.kayak.com",
                      "position": 1
                    },
                    {
                      "title": "$21 Car Rental Metairie, LA - Expedia",
                      "snippet": "",
                      "url": "https://www.expedia.com/Car-Rentals-In-Metairie.d8827.Car-Rental-Guide",
                      "domain": "expedia.com",
                      "subdomain": "www.expedia.com",
                      "position": 2
                    },
                    {
                      "title": "$33 Rental Cars in Metairie, LA - Orbitz.com",
                      "snippet": "Orbitz FAQs about car rental in Metairie. How much is car rental in Metairie? Car rental deals in Metairie cost an average of $40 ...",
                      "url": "https://www.orbitz.com/Car-Rentals-In-Metairie.d8827.Car-Rental-Guide",
                      "domain": "orbitz.com",
                      "subdomain": "www.orbitz.com",
                      "position": 3
                    }
                  ]
                }
              }
            }
          ],
          "target_fields": "[]"
        }
      }
    }
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `result` | object | The result object containing task data |
| `result.task_meta` | object | Meta information about task |
| `result.tops` | array[object] | The project's keywords result array |

## cURL Example

```bash
curl --request POST \
  --url 'https://serpstat.com/rt/api/v2/?token=123#tasks.getTaskResult' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "tasks.getTaskResult",
    "params": {
      "taskId": 5484945,
      "page": 1
    }
  }'
```

## Notes

- This method retrieves SERP crawling results using the task identifier
- The results include comprehensive SERP data such as organic results, ads, local packs, AI overview, and other SERP features
- Page parameter allows pagination through large result sets
- Task metadata includes search engine, country, region, and device type information
- Response contains detailed SERP data with positions, titles, snippets, and SERP features