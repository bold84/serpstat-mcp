# getSubElementsByCrc

**POST** `https://api.serpstat.com/v4/#AuditSite.getSubElementsByCrc`

This method provides you with a list of subelements which contains a specific errors/issues. Crc can be found in the response of `AuditSite.getErrorElements` method.

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
- **Description**: Should be exact `AuditSite.getSubElementsByCrc`

#### params
- **Type**: object

##### reportId
- **Type**: integer
- **Required**: Yes
- **Description**: The unique identifier for an audit report.

##### compareReportId
- **Type**: integer
- **Description**: Another unique identifier for an audit report from the same project to compare

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

##### mode
- **Type**: string
- **Description**: Error display mode:
- **Allowed values**:
  - all
  - new
  - solved
- **Default**: `all`

##### limit
- **Type**: integer
- **Description**: count of returned items in response
- **Default**: `30`

##### offset
- **Type**: integer
- **Description**: batch number required for pagination
- **Default**: `0`

##### crc
- **Type**: integer
- **Required**: Yes
- **Description**: URL crc

## Responses

### 200 OK

#### Body

##### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123"

##### result
- **Type**: object

##### data
- **Type**: array[string]

##### totalCount
- **Type**: integer
- **Required**: Yes
- **Description**: Total numbers of returned items

## cURL Example

```bash
curl --request POST \
 --url 'https://api.serpstat.com/v4/#AuditSite.getSubElementsByCrc' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/json' \
 --data '{ "id": "123", "method": "AuditSite.getSubElementsByCrc", "params": { "reportId": 10980505, "compareReportId": 10973646, "projectId": 1113915, "errorName": "redirects", "mode": "all", "limit": 10, "offset": 0, "crc": -1837113155 } }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      "http://qatest01.serpstat.com/redirects/301/page1.html"
    ],
    "totalCount": 1
  }
}