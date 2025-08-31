# getDomainKeywords | Serpstat Public API

## Overview

The `SerpstatDomainProcedure.getDomainKeywords` method return keywords which the analyzed domain ranks for in Google top-100 search results. The data set is similar to the Domain analysis — SEO research — Keywords report. You can get up to 60 000 results in this report.

### Credits Information
- **Credits**: 1 credit per member of `data` object array in response.

### Important Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### New Feature: SERP Special Elements Filtering
This method now supports filtering by SERP special elements using `types_contain` and `types_not_contain` filters. These filters allow you to:
- **Include keywords** that rank in search results containing specific SERP features (like local pack, featured snippets, etc.)
- **Exclude keywords** that rank in search results with unwanted SERP features (like ads, shopping results, etc.)

For the complete list of available special elements, refer to the [SERP Features Reference](/docs/serpstat-public-api/3vs2ueyhe5j08-serp-features-and-snippets-reference).

The number of charged credits corresponds to the number of results obtained upon request.

With the Serpstat API, you can only get the first 60,000 results, regardless of the number and size of the queries themselves. For more data - use the export option in the Domain Analysis, Keyword Analysis, or URL Analysis sections, or contact the manager for a personal upload of the results.

## Request

### Security: API Key

### Body

#### Request Body Content Type
- `application/json`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `method` | string | Required | Should be exact `SerpstatDomainProcedure.getDomainKeywords` |
| `params` | object | Required | Method parameters |

#### Parameters Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | Required | Domain name |
| `se` | string | Required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| **Allowed values:** | | | |
| g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us |
| `withSubdomains` | boolean | - | Search type: with/without subdomains |
| `withIntents` | boolean | - | Keyword intent. This parameter works for `g_ua` and `g_us` database only |
| `url` | string<uri> | - | Link to refine your search |
| `keywords` | array[string] | - | Array of keywords to search for |
| `minusKeywords` | array[string] | - | List of keywords to exclude from the search |
| `filters` | object | - | Filter parameters (expandable) |
| `sort` | object | - | Order of sorting the results in the format: {field: order} |
| `page` | integer | - | Page number in response |
| | | | >= 1 |
| | | | **Default:** `1` |
| `size` | integer | - | Number of results per page in response |
| | | | >= 1 |
| | | | <= 1000 |
| | | | **Default:** `100` |

## Responses

### 200 OK

#### Response Body Content Type
- `application/json`

#### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `result` | object | - | Response result object |
| `data` | array[object] | - | Array of keyword data objects |
| `summary_info` | object | - | Summary information about the results |

### Data Object Structure

Each object in the `data` array contains:

| Field | Type | Description |
|-------|------|-------------|
| `domain` | string | The domain name |
| `subdomain` | string | The subdomain |
| `keyword` | string | The keyword phrase |
| `keyword_length` | integer | Length of the keyword |
| `url` | string | The URL where the keyword ranks |
| `position` | integer | Position in search results |
| `types` | array | Array of SERP feature types |
| `found_results` | integer | Number of found results for the keyword |
| `cost` | number | Cost associated with the keyword |
| `concurrency` | integer | Concurrency metric |
| `region_queries_count` | integer | Region queries count |
| `region_queries_count_wide` | integer | Wide region queries count |
| `geo_names` | array | Geographic names |
| `traff` | integer | Traffic data |
| `difficulty` | integer | Keyword difficulty |
| `dynamic` | integer | Dynamic metric |
| `intents` | array | Keyword intents |

### Summary Info Object

| Field | Type | Description |
|-------|------|-------------|
| `page` | integer | Current page number |
| `total` | integer | Total number of results |
| `left_lines` | integer | Remaining lines/pages |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getDomainKeywords' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "1",
  "method": "SerpstatDomainProcedure.getDomainKeywords",
  "params": {
    "domain": "nike.com",
    "se": "g_us",
    "withSubdomains": true,
    "withIntents": true,
    "sort": {
      "position": "asc"
    },
    "url": "https://www.nike.com/soccer",
    "keywords": [
      "shop",
      "nike"
    ],
    "minusKeywords": [
      "nikes",
      "nke"
    ],
    "page": 1,
    "size": 10,
    "filters": {
      "right_spelling": false,
      "intents_contain": [
        "commercial"
      ],
      "intents_not_contain": [
        "navigational"
      ]
    }
  }
}'
```

## Response Example

```json
{
  "id": "1",
  "result": {
    "data": [
      {
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "keyword": "nike soccer near me",
        "keyword_length": 4,
        "url": "https://www.nike.com/soccer",
        "position": 1,
        "types": [
          "related_search",
          "also_asks",
          "local_pack",
          "pic",
          "snip_breadcrumbs",
          "snip_image_thumbnail"
        ],
        "found_results": 46400000,
        "cost": 0,
        "concurrency": 74,
        "region_queries_count": 40,
        "region_queries_count_wide": 0,
        "geo_names": [],
        "traff": 5,
        "difficulty": 51,
        "dynamic": 0,
        "intents": [
          "commercial"
        ]
      },
      {
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "keyword": "soccer cleats nike store",
        "keyword_length": 4,
        "url": "https://www.nike.com/soccer",
        "position": 2,
        "types": [
          "local_pack",
          "related_search",
          "pic",
          "snip_breadcrumbs",
          "snip_image_thumbnail"
        ],
        "found_results": 196,
        "cost": 0.2,
        "concurrency": 100,
        "region_queries_count": 110000,
        "region_queries_count_wide": 0,
        "geo_names": [],
        "traff": 15997,
        "difficulty": 55,
        "dynamic": 0,
        "intents": [
          "commercial"
        ]
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 205,
      "left_lines": 973412
    }
  }
}