# getTopCompetitorsDomainsHistory | Serpstat Public API

The `RtApiSerpResultsProcedure.getTopCompetitorsDomainsHistory` method returns the list of domains for the required region, which were listed in the **top-20** for two any project keywords.

**Credits**: This method does not spend API credits.

## Request

### Security: API Key

### Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| method | string | required | Should be exact `RtApiSerpResultsProcedure.getTopCompetitorsDomainsHistory` |
| params | object | required | The object with parameters |
| projectId | integer | required | Project ID |
| &nbsp;&nbsp;&nbsp;&nbsp;Example: |  |  | `853932` |
| projectRegionId | integer | required | Region ID |
| &nbsp;&nbsp;&nbsp;&nbsp;Example: |  |  | `293402` |
| page | integer | required | Page number |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `1` |
| pageSize | integer | required | Number of results per page |
| &nbsp;&nbsp;&nbsp;&nbsp;>= |  |  | `20` |
| &nbsp;&nbsp;&nbsp;&nbsp;<= |  |  | `500` |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `100` |
| dateFrom | string<date> | required | Start date of the period for which the data is required |
| &nbsp;&nbsp;&nbsp;&nbsp;Example: |  |  | `2021-07-26` |
| &nbsp;&nbsp;&nbsp;&nbsp;Match pattern: |  |  | `^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$` |
| dateTo | string<date> | required | Date of last withdrawal of positions |
| &nbsp;&nbsp;&nbsp;&nbsp;Example: |  |  | `2021-07-27` |
| &nbsp;&nbsp;&nbsp;&nbsp;Match pattern: |  |  | `^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$` |
| sort | string |  | Sorting by parameters |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values: |  |  | `sum_traffic` — by traffic distribution, `keywords_count` — by the number of keywords, `avg_position` — by average position, `position_ranges` — by position distribution tops, `ads_count` — by number of ads |
| &nbsp;&nbsp;&nbsp;&nbsp;Allowed values: |  |  | `domain`, `sum_traffic`, `keywords_count`, `avg_position`, `position_ranges`, `ads_count` |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `sum_traffic` |
| sortRange | string |  | |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values: |  |  | `top1\top2` ... — position distribution by position, `keywords_count_bottom\keywords_count_top` — distribution by ads, `avg_position_top\avg_position_bottom` — average position by ads |
| &nbsp;&nbsp;&nbsp;&nbsp;Allowed values: |  |  | `top1`, `top2`, `keywords_count_bottom`, `keywords_count_top`, `avg_position_top`, `avg_position_bottom` |
| order | string |  | |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values: |  |  | `desc` — descending order, `asc` — ascending order |
| &nbsp;&nbsp;&nbsp;&nbsp;Allowed values: |  |  | `desc`, `asc` |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `desc` |
| domains | array[string] | required | All domains in top 20 for two project keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;Match pattern: |  |  | `["domain1.com", "domain2.com"]` |

## Responses

### 200 OK

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| result | object | required | Contains the answer |
| data | object | required | Object with data |
| &nbsp;&nbsp;&nbsp;&nbsp;projectId | integer |  | Project ID |
| &nbsp;&nbsp;&nbsp;&nbsp;projectRegionId | integer |  | Region ID |
| &nbsp;&nbsp;&nbsp;&nbsp;competitors | array[object] |  | Array of competitors |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;domain | string |  | Domain name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dates | array[object] |  | Array of dates with results |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date | string |  | Date |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result | object |  | Result data |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;traffic_distribution | object |  | Traffic distribution |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Traffic distribution value |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avg_position | object |  | Average position |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Average position value |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keywords_count | object |  | Keywords count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Keywords count value |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keywords_by_ranges | object |  | Keywords by position ranges |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top1 | object |  | Top 1 keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 1 count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top3 | object |  | Top 3 keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 3 count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top5 | object |  | Top 5 keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 5 count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top10 | object |  | Top 10 keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 10 count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top20 | object |  | Top 20 keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 20 count |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top101 | object |  | Top 101+ keywords |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | number |  | Top 101+ count |
| summary_info | object | required | Summary data block |
| &nbsp;&nbsp;&nbsp;&nbsp;page | integer |  | Current page number |
| &nbsp;&nbsp;&nbsp;&nbsp;page_total | integer |  | Total number of pages |
| &nbsp;&nbsp;&nbsp;&nbsp;count | integer |  | Number of items per page |
| &nbsp;&nbsp;&nbsp;&nbsp;total | integer |  | Total number of items |
| &nbsp;&nbsp;&nbsp;&nbsp;sort | string |  | Sorting parameter |
| &nbsp;&nbsp;&nbsp;&nbsp;order | string |  | Order direction |
| spent_limits | integer | required | This method does not spend API credits. |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiSerpResultsProcedure.getTopCompetitorsDomainsHistory' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "RtApiSerpResultsProcedure.getTopCompetitorsDomainsHistory", "params": { "projectId": 853932, "projectRegionId": 293402, "page": 1, "pageSize": 20, "dateFrom": "2021-07-26", "dateTo": "2021-07-27", "sort": "domain", "sortRange": "keywords_count_top", "order": "asc", "domains": [ "adidas.com", "nike.com" ] } }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": {
      "projectId": 853932,
      "projectRegionId": 293402,
      "competitors": [
        {
          "domain": "adidas.com",
          "dates": [
            {
              "date": "2021-07-26",
              "result": {
                "traffic_distribution": {
                  "value": 19.39
                },
                "avg_position": {
                  "value": 2.7
                },
                "keywords_count": {
                  "value": 12
                },
                "keywords_by_ranges": {
                  "top1": {
                    "value": 5
                  },
                  "top3": {
                    "value": 3
                  },
                  "top5": {
                    "value": 3
                  },
                  "top10": {
                    "value": 1
                  },
                  "top20": {
                    "value": 0
                  },
                  "top101": {
                    "value": 0
                  }
                }
              }
            },
            {
              "date": "2021-07-27",
              "result": {
                "traffic_distribution": {
                  "value": 17.25
                },
                "avg_position": {
                  "value": 3.1
                },
                "keywords_count": {
                  "value": 12
                },
                "keywords_by_ranges": {
                  "top1": {
                    "value": 6
                  },
                  "top3": {
                    "value": 2
                  },
                  "top5": {
                    "value": 2
                  },
                  "top10": {
                    "value": 2
                  },
                  "top20": {
                    "value": 0
                  },
                  "top101": {
                    "value": 0
                  }
                }
              }
            }
          ]
        },
        {
          "domain": "nike.com",
          "dates": [
            {
              "date": "2021-07-26",
              "result": {
                "traffic_distribution": {
                  "value": 7.63
                },
                "avg_position": {
                  "value": 15.1
                },
                "keywords_count": {
                  "value": 9
                },
                "keywords_by_ranges": {
                  "top1": {
                    "value": 0
                  },
                  "top3": {
                    "value": 2
                  },
                  "top5": {
                    "value": 1
                  },
                  "top10": {
                    "value": 3
                  },
                  "top20": {
                    "value": 2
                  },
                  "top101": {
                    "value": 1
                  }
                }
              }
            },
            {
              "date": "2021-07-27",
              "result": {
                "traffic_distribution": {
                  "value": 7.68
                },
                "avg_position": {
                  "value": 14.6
                },
                "keywords_count": {
                  "value": 9
                },
                "keywords_by_ranges": {
                  "top1": {
                    "value": 0
                  },
                  "top3": {
                    "value": 2
                  },
                  "top5": {
                    "value": 1
                  },
                  "top10": {
                    "value": 3
                  },
                  "top20": {
                    "value": 2
                  },
                  "top101": {
                    "value": 1
                  }
                }
              }
            }
          ]
        }
      ]
    },
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 20,
      "total": 2,
      "sort": "domain",
      "order": "asc"
    },
    "spent_limits": 0
  }
}