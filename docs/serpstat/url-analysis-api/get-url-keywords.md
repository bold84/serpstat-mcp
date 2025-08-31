# getUrlKeywords

The `SerpstatUrlProcedure.getUrlKeywords` method returns a list of keywords for which the specified URL ranks in the top-100 Google and top-50 Bing search results. It provides insights into the organic search performance of a page and is ideal for keyword research, content optimization, and competitor analysis. The data set is similar to the URL analysis — SEO research — Keywords report.

## Important Notes

**Credits**: the number of charged credits corresponds to the number of results obtained upon request (items in `data` section of response).

**Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

**Note**: You can get no more than 60 000 results per a query. For more data - use the export option in the UI of Domain Analysis, Keyword Analysis, or URL Analysis sections, or contact the manager for a personal upload of the results.

## Use Case

- **Analyze a Competitor** - Identify a relevant competitor's page.
- **Extract Keywords** - Use `SerpstatUrlProcedure.getUrlKeywords` to extract keywords.
- **Filter for Quality** - Apply filters to select the best keywords.
- **Expand Your List** - Incorporate these keywords into your existing list.

## Request

**POST** `https://api.serpstat.com/v4`

### Security: API Key

### Body

```json
{
  "id": "123",
  "method": "SerpstatUrlProcedure.getUrlKeywords",
  "params": {
    "se": "g_us",
    "url": "https://www.nike.com/men",
    "withIntents": true,
    "sort": {
      "position": "asc"
    },
    "filters": {
      "cost_from": 1,
      "cost_to": 1000,
      "intents_contain": ["commercial"],
      "intents_not_contain": ["navigational"]
    },
    "page": 1,
    "size": 2
  }
}
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| **id** | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| **method** | string | required | Should be exact `SerpstatUrlProcedure.getUrlKeywords` |
| **params** | object | required |  |
| **se** | string | required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| **url** | string\<uri\> | required | Analyzed page URL |
| | | | **Example:** `https://www.nike.com` |
| **withIntents** | boolean | optional | Keyword intent |
| **sort** | object | optional | Order of sorting the results |
| **filters** | object | optional | Filters for search. Fields are combined using the "AND" logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria |
| **page** | integer | optional | Page number in response |
| | | | `>= 1` |
| | | | **Default:** `1` |
| **size** | integer | optional | Number of results per page in response |
| | | | `>= 1` |
| | | | `<= 1000` |
| | | | **Default:** `100` |

**Allowed values for `se`:**
- g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us |

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "keyword": "nike men usa",
        "keyword_length": 3,
        "url": "https://www.nike.com/men",
        "position": 1,
        "types": [
          "related_search",
          "pic",
          "ads_top",
          "snip_breadcrumbs",
          "snip_image_thumbnail"
        ],
        "found_results": 102000000,
        "cost": 2.32,
        "concurrency": 100,
        "region_queries_count": 90,
        "region_queries_count_wide": null,
        "geo_names": [
          "usa"
        ],
        "traff": 13,
        "difficulty": 75,
        "dynamic": 0,
        "intents": [
          "commercial"
        ]
      },
      {
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "keyword": "purchase nike shoes online",
        "keyword_length": 4,
        "url": "https://www.nike.com/men",
        "position": 1,
        "types": [
          "pic",
          "related_search",
          "snip_breadcrumbs",
          "snip_image_thumbnail"
        ],
        "found_results": 34000000,
        "cost": 1.36,
        "concurrency": 51,
        "region_queries_count": 1600,
        "region_queries_count_wide": null,
        "geo_names": [],
        "traff": 239,
        "difficulty": 34,
        "dynamic": 0,
        "intents": [
          "commercial"
        ]
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 50,
      "left_lines": 971441
    }
  }
}
```

### Response Schema

| Name | Type | Description |
|------|------|-------------|
| **id** | string | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| **result** | object |  |
| **data** | array\[object\] | Array of keyword data |
| **summary_info** | object | Pagination and summary information |

### Data Object

| Name | Type | Description |
|------|------|-------------|
| **domain** | string | Domain name |
| **subdomain** | string | Subdomain name |
| **keyword** | string | Keyword phrase |
| **keyword_length** | integer | Number of words in the keyword |
| **url** | string | URL where the keyword ranks |
| **position** | integer | Search position (1-100 for Google, 1-50 for Bing) |
| **types** | array\[string\] | SERP feature types present for this keyword |
| **found_results** | integer | Total number of search results for this keyword |
| **cost** | number | CPC (cost per click) in USD |
| **concurrency** | integer | Concurrency score |
| **region_queries_count** | integer | Number of regional queries |
| **region_queries_count_wide** | null | Wide regional queries count (deprecated) |
| **geo_names** | array\[string\] | Geographic regions |
| **traff** | integer | Traffic estimate |
| **difficulty** | integer | SEO difficulty score (0-100) |
| **dynamic** | integer | Dynamic flag (0 = static) |
| **intents** | array\[string\] | Keyword intent classifications |

### Summary Info Object

| Name | Type | Description |
|------|------|-------------|
| **page** | integer | Current page number |
| **total** | integer | Total number of results |
| **left_lines** | integer | Remaining lines/pages |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatUrlProcedure.getUrlKeywords' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatUrlProcedure.getUrlKeywords",
    "params": {
      "se": "g_us",
      "url": "https://www.nike.com/men",
      "withIntents": true,
      "sort": {
        "position": "asc"
      },
      "filters": {
        "cost_from": 1,
        "cost_to": 1000,
        "intents_contain": ["commercial"],
        "intents_not_contain": ["navigational"]
      },
      "page": 1,
      "size": 2
    }
  }'