# Keyword Volume Checker API

Use a keyword search volume checker to optimize your keyword list:

- Discover the popularity and trends of keywords
- Identify low-competition keywords
- Estimate demand and assess competition in your niche
- Key Features of API Keyword Volume Checker

Set up the keyword volume scanning to automatically collect results for your tasks:

- Desktop search engine results
- Specified region and city for Google search results
- Supports any language
- Get your data in JSON using API requests

In the response you would get a estimated volume of search requests for your keyword monthly for the last year and PPC advertising cost.

To get precise results you have to set right search region. List of all search regions available [here](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit?gid=75443986#gid=75443986).

## Response Example

```json
{
  "id": "123",
  "result": {
    "total": 1,
    "page": 1,
    "pageSize": 10,
    "taskMeta": {
      "typeId": "1",
      "seId": "1",
      "regionId": "2840",   <---- Your search region
      "match": "exact"
    },
    "keywords": [
      {
        "keyword": "vitos",     <---- Your keyword
        "keyword.raw": "vitos",
        "status": 2,
        "cost": 0.33,           <---- PPC advertising cost
        "searchVolume": 60500,  <--- Actual Search Volume
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 49500        <--- Search Volumne
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 49500
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 49500
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 49500
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 49500
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 49500
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 60500
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 60500
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 60500
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 60500
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 60500
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 60500
          }
        ],
        "competition": 3
      }
    ]
  }
}
```

## Credits and pricing

This API has separate billing and credits type for this API are not included in any available subscription plan. [Contacts sales](https://data.serpstat.com/api-keyword-volume-checker/) for details.

- The cost varies from $0.001 to $0.0005 depending on the volume of credits required
- The minimum budget for the service is $300
- Unlimited number of requests per day and month.
- Credits for Keyword Volume API Checker don't expire at the end of the month, you can use them when it is convenient for you.
- All keywords accepted to task are billed after task submission.
- Charged credits are not refundable.

## API Methods Overview

- [`addKeywordListFreq`](/docs/serpstat-public-api/c18po8yuu2j06-add-keyword-list-freq) — Submit your crawling task;
- [`getTaskResultFreq`](/docs/serpstat-public-api/v91plc4ro30g6-get-task-result) — Get crawled results from that task;
- [`getTaskStatus`](/docs/serpstat-public-api/ysi42jt8k737w-get-task-status) — Check your task status.

All available methods description [here](/docs/serpstat-public-api/1uyfsa142buo9-serpstat-keyword-volume-checker-api).