# SERP Scraper API

SERP Scraper API offers the following key benefits for SEO specialists and business owners:

- Deep understanding of competitors' SERP positions
- Identification of industry leaders' effective SEO strategies
- Research of high-ranking pages' meta tags
- Analysis of URL structure and internal linking
- Tracking search position dynamics
- SERP changes monitoring

SERP Scraper becomes an indispensable tool for making data-driven decisions in SEO and improving website visibility in search engines.

## AI Overview

> Google AI Overview results are currently available within standard Desktop and Mobile SERP Scraper requests at no additional cost. This allows you to access AI-generated summaries and reference sources as part of your regular SERP data. However, **starting August 1, 2025, AI Overview data will become a separate optional parameter with additional pricing**. After this date, you will need to specifically enable AI Overview in your API requests and account for the additional costs in your usage billing.

## Credits and pricing

This API has separate billing and credits type for this API are not included in any available subscription plan. [Contacts sales](https://data.serpstat.com/serp-api-scraper/) for details.

- The cost varies from $0.0013 to $0.00065 per one keyword depending on the volume of credits required.
- The minimum budget for the service is $300 ( ~ 230,000 SERPs)
- Unlimited number of requests per day and month.
- Perform analysis regardless of the availability of a pricing plan or available credits.
- Credits for SERP Scraper don't expire at the end of the month, you can use them when it is convenient for you.
- All keywords accepted to task are billed after task submission.
- Charged credits are not refundable.
- "Pay as you go" and recurring billing options are not available for this API

## API Methods and Flow

Description for all available [methods of Serpstat SERP Scraper Api](/docs/serpstat-public-api/0b54hq7qrsbab-serpstat-serp-crawling-api)

At the core of SERP Scraper service lies an elegant three-step process flow that ensures deep SERP analysis:

### 1. Initialize

Through the API interface, you submit a request to analyze a set of keywords considering the specifics of your chosen search region. This ensures obtaining maximally relevant data for your target geolocation.

Use method [`addTask`](/docs/serpstat-public-api/fd78zl20ap9w1-add-task) to submit your keyword list to parsing. This method is suitable for tasks with one or a small number of keywords.

Use method [`addKeywordList`](/docs/serpstat-public-api/9elengxj24hwb-add-keyword-list) to add up to 10,000 keywords per top parsing task.

Both methods returns `task_id`, save it for the future, to get results.

If some of your keywords doesn't meet the common validation criteria you would receive non empty array `blocked_keywords` in response:

```json
{
  "id": "123",
  "result": {
    "task_id": "5492895",
    "blocked_keywords": [
      "*****"
    ]
  }
}
```

> **⚠️ Blocked keywords are not charged and can't be parsed by our API. They won't be included in the parsing task.**

These references help you to choose the right ones id's for:
- [language](/docs/serpstat-public-api/wuoshjguna09o-languages)
- [search region](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit?pli=1&gid=75443986#gid=75443986)
- [country code](/docs/serpstat-public-api/oerp7nc8ivqp7-countries)

### 2. Wait till it's done

Usually, top parsing takes up to 2-3 minutes depending to task size and service load.

Use method [`getTaskResult`](/docs/serpstat-public-api/50bwxkycuia8p-get-task-result) to get results. If task is not complete you will receive response like that:

```json
{
  "id": "123",
  "result": {
    "progress": "0%",
    "message": "Not all keywords have been tracked"
  }
}
```

The system provides real-time task status updates, ensuring complete transparency of the data collection process. Use method

### 3. Get results!

Use method [`getTaskResult`](/docs/serpstat-public-api/50bwxkycuia8p-get-task-result) to get results again after little while. Upon completion of the analysis, you receive structured search results data for your keywords list. Each result contains detailed information about positions, meta-data, and other key SEO parameters found in SERP like that:

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
        "keyword_id": "707207631",
        "keyword": "eat jelephones on breakfast",
        "keyword_data": {
          "top": [
            {
              "url": "https://www.reddit.com/r/ketorecipes/comments/2y1c6r/jalapeno_poppersfor_breakfast/",
              "domain": "reddit.com",
              "subdomain": "www.reddit.com",
              "title": "Jalapeno Poppers...for Breakfast! : r/ketorecipes",
              "title_length": 49,
              "snippet": "Jalapeno Popper Egg Cups. Yields 12 Egg Cups. Macros Per Egg Cup 216 Calories, 19.3g Fats, 0.9g Net Carbs, and 9.6g Protein. Perhaps the epitome of volume eating, the Balkan ...62 postsSep 23, 2024TIFU by eating too many jalapenos. - Reddit136 postsJun 3, 2013Are these Jalapeño peppers safe to eat? : r/PepperLovers28 postsDec 7, 2022I always throw out jalapeños when they get wrinkles. I ...68 postsNov 2, 2023More results from www.reddit.com Missing: jelephones Show results with: jelephones",
              "snippet_length": 497,
              "breadcrumbs": "20+ comments · 9 years ago",
              "spec_elements": [
                {
                  "type": "snip_breadcrumbs",
                  "content": "20+ comments · 9 years ago",
                  "href": null,
                  "anchor": null,
                  "sort_number": 0
                }
              ],
              "types": [
                "snip_breadcrumbs"
              ],
              "position": 1
            }
          ],
          "ads": {
            "1": [],
            "2": [],
            "3": []
          },
          "results": 51000,
          "right_spell": "ear headphones on breakfast",
          "types": [
            "pic",
            "also_asks",
            "related_search"
          ],
          "top_features_content": [
            {
              "PeopleAlsoAsk": {
                "PeopleAlsoAsk": {
                  "people_also_ask_block": [],
                  "people_also_ask_questions": [
                    "Can you eat Knafeh for breakfast?",
                    "Is it okay to eat a lot of jalapenos?",
                    "What are the benefits of eating jalapenos?",
                    "Is it okay to eat jalapeno as a snack?"
                  ]
                }
              }
            }
          ]
        },
        "target_fields": "[]"
      }
    ]
  }
}
```

In this example, we've used one keyword and shrunk the response to 1 position in SERP. Of course, you will get 99-100 positions in the real world, depending on special elements.

## More methods to up your awareness.

### Get your task history.

Method [`getList`](/docs/serpstat-public-api/2jkkku527phy7-get-list) allows getting a list of required tasks with status for the last 7 days. After 7 days all completted task will be purged.

### Get raw SERP.

The [`getKeywordSerp`](/docs/serpstat-public-api/bfwx6sfgzlioz-get-keyword-serp) method returns the raw SERP in HTML format. To get results you must use `keyword_id` parameter from method `getTaskResult` response instead of keyword in string representation.

### Control your balance.

The [`getParsingBalance`](/docs/serpstat-public-api/hx1b8q97pwu9y-get-parsing-balance) method return your balance and current price for one SERP parsing for the keyword.

```json
{
  "id": "123",
  "result": {
    "available_usd": "99999.891",    <-- your balance
    "serp_parsing_cost": "0.0004",    <-- your price for one SERP
    "volume_parsing_cost": "0.0006"
  }
}
```

> **ℹ️ Please note:** [price is always negotiable](https://data.serpstat.com/serp-api-scraper/)! :)