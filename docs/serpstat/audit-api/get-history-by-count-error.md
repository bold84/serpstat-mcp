# getHistoryByCountError

**POST** `https://api.serpstat.com/v4/#AuditSite.getHistoryByCountError`

This method displays the number of changed errors and information messages for each issue category across all reports within a project. It enables tracking of issue resolution progress over time.

> **Credits**: This method doesn't spent API credits.

## Request

### Security
None

### Body

#### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123"

#### method
- **Type**: string
- **Required**: Yes
- **Description**: Should be exact `AuditSite.getHistoryByCountError`

#### params
- **Type**: object

##### projectId
- **Type**: integer
- **Required**: Yes
- **Description**: The unique identifier for an audit site project.

##### errorName
- **Type**: string
- **Required**: Yes
- **Description**: Error Name
- **Allowed values**:
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

##### limit
- **Type**: integer
- **Required**: Yes
- **Description**: count of returned items in response
- **Default**: `30`

##### offset
- **Type**: integer
- **Required**: Yes
- **Description**: batch number required for pagination
- **Default**: `0`

## Responses

### 200 OK

#### Body

##### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123"

##### result
- **Type**: object

##### errorCounts
- **Type**: array[object]

## cURL Example

```bash
curl --request POST \
 --url 'https://api.serpstat.com/v4/#AuditSite.getHistoryByCountError' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/json' \
 --data '{ "id": "123", "method": "AuditSite.getHistoryByCountError", "params": { "projectId": 1113915, "errorName": "h1_missing", "limit": 10, "offset": 0 } }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "errorCounts": [
      {
        "reportId": "10980505",
        "date": "2025-01-06 17:25:34",
        "count": "87"
      },
      {
        "reportId": "10973646",
        "date": "2024-12-25 09:41:50",
        "count": "93"
      },
      {
        "reportId": "10973632",
        "date": "2024-12-25 08:58:15",
        "count": "93"
      },
      {
        "reportId": "10935615",
        "date": "2024-10-28 22:11:46",
        "count": "93"
      },
      {
        "reportId": "10864232",
        "date": "2024-07-04 13:48:10",
        "count": "94"
      },
      {
        "reportId": "10840180",
        "date": "2024-05-29 10:12:21",
        "count": "94"
      },
      {
        "reportId": "10836991",
        "date": "2024-05-24 20:02:36",
        "count": "93"
      },
      {
        "reportId": "10836930",
        "date": "2024-05-24 15:56:33",
        "count": "93"
      },
      {
        "reportId": "10836906",
        "date": "2024-05-24 14:28:04",
        "count": "93"
      },
      {
        "reportId": "10836904",
        "date": "2024-05-24 14:18:36",
        "count": "94"
      }
    ]
  }
}