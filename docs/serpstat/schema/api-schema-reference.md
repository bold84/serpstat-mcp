
# Intents Contain Filter

## Description
Include keywords that contain one or several of the specified search intents. This filter allows you to target keywords based on user search behavior and intent classification.

## Allowed Values
informational, navigational, commercial, transactional

## Example
```json
["informational"]
```
# Intents Not Contain Filter

## Description
Exclude keywords that contain any of the specified search intents. This filter helps you remove unwanted intent categories from your keyword results.

## Allowed Values
informational, navigational, commercial, transactional

## Example
```json
["informational"]
```
# Keyword Contains Filter

## Description
Keywords must contain ALL specified terms (exact word matching). Only keywords that include every term from the array will be returned. You can specify 1 to 100 search terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```
# Keyword Not Contains Filter

## Description
Keywords must NOT contain ANY of the specified terms (exact word matching). Keywords containing any term from the array will be excluded. You can specify 1 to 100 exclusion terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```
# Keyword Contains One Of Filter

## Description
Keywords must contain AT LEAST ONE of the specified terms (exact word matching). Keywords that include any term from the array will be returned. You can specify 1 to 100 search terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```
# Keyword Contains Broad Match Filter

## Description
Keywords must contain ALL specified terms (broad matching including morphological forms). More flexible matching compared to exact matching. You can specify 1 to 100 search terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```

# Keyword Contains One Of Broad Match Filter

## Description
Keywords must contain AT LEAST ONE of the specified terms (broad matching including morphological forms). You can specify 1 to 100 search terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```

# Team Management API

## Description
Manage your Serpstat team members via the API. Easily add, activate, deactivate, or remove users to simplify account and access management.

## Version
v4.0

## Base URL
https://api.serpstat.com/v4

## Security
An API key is a token that you provide when making API calls. Include the token in a query parameter called `token`.

Example: `?token=123`

## Additional Information
- [Contact Support](https://serpstat.com)
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [Terms of Service](https://serpstat.com/users/license-agreement/)

# Keyword Not Contains Broad Match Filter

## Description
Keywords must NOT contain ANY of the specified terms (broad matching including morphological forms). Excludes keywords with broad matches. You can specify 1 to 100 exclusion terms.

## Type
array[string]

## Example
```json
["seo","optimize"]
```

# Search Engines Short Names

## Description
This field represents the search engine identifier. Example: `"se":"g_us"`. Refer to full list of search engines.

## Type
string

## Allowed Values
g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us

## Example
```json
{"se":"g_us"}
```

# Type Results

## Description
Type of Google results and SERP parsing mode

## Type
string

## Allowed Values
regular, local, regular_aio

## Default
regular

## Example
```json
regular_aio
```


# Task ID

## Description
Crawling identifier

## Type
integer

## Example
```json
0
```

# Type ID

## Description
Device type identifier

## Type
integer

## Allowed Values
>= 1, <= 2

## Default
1

## Example
```json
{"typeId": 1}
```
# Lang ID

## Description
Language identifier. Reffer to full list of lang ids

## Type
integer

## Allowed Values
>= 1, <= 48

## Default
1

## Example
```json
{"langId": 1}
```
# Region ID

## Description
Region or city identifier. Reffer to full list of region ids

## Type
integer

## Allowed Values

## Default Value

## Example
```json
1
```
# Country ID

## Description
Country identifier. Reffer to full list of county ids

## Type
integer

## Allowed Values
>= 1, <= 247

## Example
```json
1
```

# SE ID

## Description
Search engine identifier

## Type
any

## Allowed Value
1

## Default
1

## Example
```json
1
```

# Task Status

## Description
Task status

## Type
integer

## Allowed Values
1, 2, 3

## Example
```json
1
```

# Search Type

## Description
Search modes for analysis

## Type
string

## Allowed Values
domain, domain_with_subdomains

## Default
domain_with_subdomains

## Example
domain_with_subdomains


# Domain Query

## Description
The domain name of the analyzed site

## Type
string

## Example
facebook.com

## projectId

**Type:** integer

**Description:** The unique identifier for an audit site project.

**Example:** 10

## pageId

**Type:** integer

**Description:** The unique identifier for an audit page.

**Constraints:** >= 0

**Example:** 10

## reportId

**Type:** integer

**Description:** The unique identifier for an audit report.

**Example:** 10

## userAgent

**Type:** integer

**Description:** An identifier that references a specific user agent.

**User Agent Options:**
- 0 - Chrome (Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36)
- 1 - Serpstat (Serpstatbot)
- 2 - Google (Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html))
- 3 - Yandex (Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots))
- 4 - Firefox (Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0)
- 5 - IE (Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko)

**Allowed values:** 0, 1, 2, 3, 4, 5

**Example:** 10

## categoriesPage

**Type:** array

**Description:** Issue Category array. Refer to detail list of audit errors

**Schema:** Array of objects with the following properties:

- **key** (string): Issue category name
  - **Allowed values:** pages_status, meta_tags, headings, content, multimedia, indexation, redirects, links, https, hreflang, amp, markup, pagespeed_desktop, pagespeed_mobile, server_params

- **errors** (array[object]): Error details
  - **key** (string): Error Name
    - **Allowed values:** errors_400, errors_500, no_desc, no_title, tiny_desc, long_title, tiny_title, many_title, meta_refresh, title_dup_h1, charset_missing, long_desc, h1_missing, many_h1, broken_image_url, large_image_size, image_no_alt, many_canonical, use_flash, use_iframe, less_words, wrong_canonical, hidden_no_index, hidden_robots_txt, offsite_canonical, relative_canonical, redirects, many_get_params, long_url, many_external_links, miss_favicon, external_link_without_no_follow_exist, internal_links_no_follow_exist, https_check_domain_in_cert, https_hsts, https_cert_chain, https_expired, https_tls, https_sslv3, https_self_signed, https_sitemap_with_http, https_mixed_content, https_link_to_http, https_non_secure_page, hreflang_usage, amp_usage, markup_schema_missing, markup_open_graph_missing, markup_twitter_card_missing, markup_json_ld_missing, OptimizeImages, LeverageBrowserCaching, MinimizeRenderBlockingResources, large_page_size, body_text_missing, dummy_text, hreflang_wrong_value, hreflang_no_link, hreflang_wrong_url, hreflang_broken_links, pages_title_dup, pages_desc_dup, pages_h1_dup, https_status:no_redirect, www_status:www_status
  - **priority** (string): Issue priority
    - **Allowed values:** high, medium, low, information, solved
  - **countAll** (integer): Total number of all found errors or information messages
  - **countNew** (integer): Number of new found errors or information messages with report identified by compareReportId if occurs
  - **countFixed** (integer): Number of fixed errors or information messages in comparison with report identified by compareReportId
  - **viewType** (string)
  - **hasAdditionRows** (boolean): Has detail info rows, can be get with AuditOnePage.getErrorRows

**Example:**
```json
[
  {
    "key": "pages_status",
    "errors": [{}]
  }
]
```

## size

**Type:** integer

**Description:** Number of results per page in response

**Constraints:** >= 1

**Example:**
```json
1
```

## page

**Type:** integer

**Description:** page number for pagination

**Constraints:** >= 1

**Example:**
```json
1
```

## reportInfo

**Type:** object

**Description:** Audit report information

**Schema:** Object with the following properties:

- **id** (integer): The unique identifier for an audit report.
- **auditDate** (string, required): Date of audit in format YYYY-MM-DD HH:MM:SS
- **status** (integer, required)
- **sdo** (integer, required): Serpstat Domain Optimization Score (SDO score)
- **high** (integer, required): Total number of high priority issues
- **medium** (integer, required): Total number of medium priority issues
- **low** (integer, required): Total number of low priority issues
- **information** (integer, required): Total number of information priority issues
- **viruses** (integer, required): Total number of pages with viruses
- **progress** (integer, required): Audit progress in percents. 100 for finished audit

**Example:**
```json
{
  "id": 28428,
  "auditDate": "2020-11-14 16:30:34",
  "status": 4,
  "sdo": 77,
  "high": 0,
  "medium": 10,
  "low": 3,
  "information": 4,
  "viruses": 0,
  "progress": 100
}
```

## settings

**Type:** object

**Description:** Audit settings configuration

**Schema:** Object with the following properties:

- **userAgent** (integer): An identifier that references a specific user agent:
  - **0** - Chrome (Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36)
  - **1** - Serpstat (Serpstatbot)
  - **2** - Google (Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html))
  - **3** - Yandex (Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots))
  - **4** - Firefox (Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0)
  - **5** - IE (Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko)
  - **Allowed values:** 0, 1, 2, 3, 4, 5

- **httpAuthLogin** (string): Login for Basic HTTP authentication, returns "" if was not given

- **httpAuthPassword** (string): Password for Basic HTTP authentication, returns "" if was not given

**Example:**
```json
{
  "userAgent": "0",
  "httpAuthLogin": "",
  "httpAuthPassword": ""
}
```

## categoryName

**Type:** string

**Description:** Issue category name

**Allowed values:** pages_status, meta_tags, headings, content, multimedia, indexation, redirects, links, https, hreflang, amp, markup, pagespeed_desktop, pagespeed_mobile, server_params

**Example:**
```json
pages_status
```

## errorName

**Type:** string

**Description:** Error Name

**Allowed values:**
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

**Example:**
```json
{
  "errorName": "errors_400"
}
```

## errorPriority

**Type:** string

**Description:** Issue priority

**Allowed values:**
- high
- medium
- low
- information
- solved

**Example:**
```json
{
  "errorPriority": "high"
}
```

## compareReportId

**Type:** integer

**Description:** Another unique identifier for an audit report from the same project to compare

**Example:**
```json
{
  "compareReportId": 0
}
```

## intervalId

**Type:** integer

**Description:** Interval id of trigger mailing:

**Allowed values:**
- 0
- 1
- 2
- 3
- 4
- 5

**Example:**
```json
{
  "intervalId": 0
}
```

## scheduleRepeatId

**Type:** integer

**Description:** Interval id to repeat scan:

**Allowed values:**
- 0
- 1
- 2
- 3
- 4
- 5

**Example:**
```json
{
  "scheduleRepeatId": 0
}
```
# Basic Filters

## Description
Optional combinations of filters applied to your request. In most cases one filter is enough. Filter combinations have AND logic.

## Type
object

## Properties
- **traff** (integer): filter results match exact given traffic value
- **traff_from** (integer): filters results that exceed given traffic value
- **traff_to** (integer): filter results that bellow given traffic value
- **visible** (integer): exact visibility value match
- **visible_from** (integer): filter results that exceed given visibility value
- **visible_to** (integer): filter results that bellow given visibility value

## Example
```json
{
  "traff": 0,
  "traff_from": 0,
  "traff_to": 0,
  "visible": 0,
  "visible_from": 0,
  "visible_to": 0
}
```