# getErrorElements

**POST** `https://api.serpstat.com/v4/#AuditSite.getErrorElements`

Get a list of all pages where a specific audit error was detected. This method helps you quickly identify and address problematic URLs across your entire website.

### Credits
This method doesn't spent API credits.

## Request

### Security
None

### Body

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| method | string | required | Should be exact `AuditSite.getErrorElements` |
| params | object |  |  |
| └─ reportId | integer | required | The unique identifier for an audit report. |
| └─ compareReportId | integer | required | Another unique identifier for an audit report from the same project to compare |
| └─ projectId | integer | required | The unique identifier for an audit site project. |
| └─ errorName | string | required | Error Name |
| └─ mode | string |  | Error display mode: |
| | | | Allowed values: `all`, `new`, `solved` |
| | | | Default: `all` |
| └─ limit | integer |  | count of returned items in response |
| | | | Default: `10` |
| └─ offset | integer |  | batch number required for pagination |
| | | | Default: `0` |

### Request Body
```json
{
  "id": "123",
  "method": "AuditSite.getErrorElements",
  "params": {
    "reportId": 10980505,
    "compareReportId": 10973646,
    "projectId": 1113915,
    "errorName": "redirects",
    "mode": "all"
  }
}
```

### Request Sample (Shell/cURL)
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getErrorElements' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.getErrorElements", "params": { "reportId": 10980505, "compareReportId": 10973646, "projectId": 1113915, "errorName": "redirects", "mode": "all" } }'
```

## Responses

### 200 OK

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| result | object |  |  |
| └─ data | array[object] |  |  |
| └─ totalCount | integer | required | Total number of returned results |
| └─ mode | string | required | echoed request field `mode` |

### Response Example
```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/301/redirect1.php",
        "code": 301,
        "finishUrl": "http://qatest01.serpstat.com/redirects/301/finishPage1.html",
        "count": 1,
        "startUrlCrc": -1837113155
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/302/redirect1.php",
        "code": 302,
        "finishUrl": "http://qatest01.serpstat.com/redirects/302/finishPage.html",
        "count": 1,
        "startUrlCrc": -2096985404
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/chainOfRedirects/redirect1.php",
        "code": 301,
        "finishUrl": "http://qatest01.serpstat.com/redirects/chainOfRedirects/finishPage.html",
        "count": 1,
        "startUrlCrc": -330926557
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/301/redirect3.php",
        "code": 301,
        "finishUrl": "http://qatest01.serpstat.com/redirects/301/finishPage2.html",
        "count": 1,
        "startUrlCrc": -390089763
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/301/redirect2.php",
        "code": 301,
        "finishUrl": "http://qatest01.serpstat.com/redirects/301/finishPage1.html",
        "count": 1,
        "startUrlCrc": -706766227
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/302/redirect2.php",
        "code": 302,
        "finishUrl": "http://qatest01.serpstat.com/redirects/302/finishPage.html",
        "count": 1,
        "startUrlCrc": -995954668
      },
      {
        "startUrl": "http://qatest01.serpstat.com/redirects/301/redirect4.php",
        "code": 301,
        "finishUrl": "http://qatest01.serpstat.com/redirects/301/finishPage1.html",
        "count": 1,
        "startUrlCrc": 1520398285
      }
    ],
    "totalCount": 7,
    "mode": "all"
  }
}
```

## Available Error Names

The following error names are available for use with the `errorName` parameter:

- errors_400
- errors_500
- no_desc
- no_title
- tiny_desc
- long_title
- tiny_title
- many_title
- meta_refresh
- title_dup_h1
- charset_missing
- long_desc
- h1_missing
- many_h1
- broken_image_url
- large_image_size
- image_no_alt
- many_canonical
- use_flash
- use_iframe
- less_words
- wrong_canonical
- hidden_no_index
- hidden_robots_txt
- offsite_canonical
- relative_canonical
- redirects
- many_get_params
- long_url
- many_external_links
- miss_favicon
- external_link_without_no_follow_exist
- internal_links_no_follow_exist
- https_check_domain_in_cert
- https_hsts
- https_cert_chain
- https_expired
- https_tls
- https_sslv3
- https_self_signed
- https_sitemap_with_http
- https_mixed_content
- https_link_to_http
- https_non_secure_page
- hreflang_usage
- amp_usage
- markup_schema_missing
- markup_open_graph_missing
- markup_twitter_card_missing
- markup_json_ld_missing
- OptimizeImages
- LeverageBrowserCaching
- MinimizeRenderBlockingResources
- large_page_size
- body_text_missing
- dummy_text
- hreflang_wrong_value
- hreflang_no_link
- hreflang_wrong_url
- hreflang_broken_links
- pages_title_dup
- pages_desc_dup
- pages_h1_dup
- https_status:no_redirect
- www_status:www_status