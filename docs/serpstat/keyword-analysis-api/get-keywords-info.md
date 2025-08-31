# getKeywordsInfo | Serpstat Public API

## Overview

The `SerpstatKeywordProcedure.getKeywordsInfo` method provides you with the keyword overview showing its volume, CPC, level of competition, etc.

### Credits
- **Credits**: The number of charged credits corresponds to the number of results obtained upon request. You can get no more than 1000 results per a query.
- **Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Endpoint

- **Method**: POST
- **URL**: `https://api.serpstat.com/v4/#SerpstatKeywordProcedure.getKeywordsInfo`
- **Path**: `/v4`

## Authentication

Security: API Key

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **id** | string | ✅ | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| **method** | string | ✅ | Should be exact `SerpstatKeywordProcedure.getKeywordsInfo` |
| **params** | object | ✅ | Object containing query parameters |

#### params Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **keywords** | array[string] | ✅ | Array with keywords to search for |
| **se** | string | ✅ | Search engine code. Example `"se":"g_us"`. Refer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |

#### Allowed Search Engine Codes
- `g_af`, `g_al`, `g_dz`, `g_as`, `g_ad`, `g_ao`, `g_ai`, `g_ag`, `g_ar`, `g_am`, `g_aw`, `g_au`, `g_at`, `g_az`, `g_bh`, `g_bd`, `g_bb`, `g_by`, `g_be`, `g_bz`, `g_bj`, `g_bm`, `g_bt`, `g_bo`, `g_ba`, `g_bw`, `g_br`, `g_io`, `g_vg`, `g_bn`, `g_bg`, `g_bf`, `g_bi`, `g_kh`, `g_cm`, `g_ca`, `g_cv`, `g_ky`, `g_cf`, `g_td`, `g_cl`, `g_cn`, `g_cx`, `g_cc`, `g_co`, `g_km`, `g_ck`, `g_cr`, `g_ci`, `g_hr`, `g_cw`, `g_cy`, `g_cz`, `g_cd`, `g_dk`, `g_dj`, `g_dm`, `g_do`, `g_ec`, `g_eg`, `g_sv`, `g_gq`, `g_er`, `g_ee`, `g_et`, `g_fk`, `g_fo`, `g_fm`, `g_fj`, `g_fi`, `g_fr`, `g_gf`, `g_pf`, `g_ga`, `g_ge`, `g_de`, `g_gh`, `g_gi`, `g_gr`, `g_gl`, `g_gd`, `g_gp`, `g_gu`, `g_gt`, `g_gg`, `g_gn`, `g_gw`, `g_gy`, `g_ht`, `g_hn`, `g_hk`, `g_hu`, `g_is`, `g_in`, `g_id`, `g_iq`, `g_ie`, `g_im`, `g_il`, `g_it`, `g_jm`, `g_jp`, `g_je`, `g_jo`, `g_kz`, `g_ke`, `g_ki`, `g_kw`, `g_kg`, `g_la`, `g_lv`, `g_lb`, `g_ls`, `g_lr`, `g_ly`, `g_li`, `g_lt`, `g_lu`, `g_mo`, `g_mk`, `g_mg`, `g_mw`, `g_my`, `g_mv`, `g_ml`, `g_mt`, `g_mh`, `g_mq`, `g_mr`, `g_mu`, `g_yt`, `g_mx`, `g_md`, `g_mc`, `g_mn`, `g_me`, `g_ms`, `g_ma`, `g_mz`, `g_mm`, `g_na`, `g_nr`, `g_np`, `g_nl`, `g_nc`, `g_nz`, `g_ni`, `g_ne`, `g_ng`, `g_nu`, `g_nf`, `g_mp`, `g_no`, `g_om`, `g_pk`, `g_pw`, `g_ps`, `g_pa`, `g_pg`, `g_py`, `g_pe`, `g_ph`, `g_pn`, `g_pl`, `g_pt`, `g_pr`, `g_qa`, `g_cg`, `g_re`, `g_ro`, `g_ru`, `g_rw`, `g_sh`, `g_kn`, `g_lc`, `g_pm`, `g_vc`, `g_ws`, `g_sm`, `g_st`, `g_sa`, `g_sn`, `g_rs`, `g_sc`, `g_sl`, `g_sg`, `g_sx`, `g_sk`, `g_si`, `g_sb`, `g_so`, `g_za`, `g_kr`, `g_es`, `g_lk`, `g_sr`, `g_sz`, `g_se`, `g_ch`, `g_tw`, `g_tj`, `g_tz`, `g_th`, `g_bs`, `g_gm`, `g_tl`, `g_tg`, `g_tk`, `g_to`, `g_tt`, `g_tn`, `g_tr`, `g_tm`, `g_tc`, `g_tv`, `g_vi`, `g_ug`, `g_ua`, `g_ae`, `g_uk`, `g_us`, `g_uy`, `g_uz`, `g_vu`, `g_va`, `g_ve`, `g_vn`, `g_wf`, `g_ye`, `g_zm`, `g_zw`, `bing_us`

#### Optional Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **withIntents** | boolean | ❌ | Keyword intent. This parameter works for `g_ua` and `g_us` database only |
| **sort** | object | ❌ | Order of sorting the results in the format: `"field: order"` |
| **filters** | object | ❌ | Filters for search. Fields are combined using the AND logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria. |

#### filters Example
```json
{
  "cost_from": 1,
  "concurrency_from": 1,
  "found_results_from": 300,
  "minus_keywords": ["case", "red"]
}
```

## Response

### 200 OK

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **id** | string | ✅ | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| **result** | object | ✅ | Response object |
| **result.data** | array[object] | ✅ | Array of keyword data |
| **result.summary_info** | object | ✅ | Summary information |

#### result.data Object

| Field | Type | Description |
|-------|------|-------------|
| **keyword** | string | The keyword |
| **cost** | number | CPC (Cost Per Click) |
| **concurrency** | number | Competition level |
| **found_results** | number | Number of search results |
| **region_queries_count** | number | Regional query count |
| **region_queries_count_wide** | number | Wide regional query count |
| **types** | array | Array of keyword types (e.g., "also_asks", "kn_graph_card", "related_search") |
| **geo_names** | array | Geographic names |
| **social_domains** | array | Social media domains (e.g., "youtube", "instagram", "amazon", "wikipedia", "reddit") |
| **right_spelling** | string|null | Correct spelling suggestion |
| **lang** | string | Language code |
| **difficulty** | number | SEO difficulty score |
| **suggestions_count** | number | Number of suggestions |
| **keywords_count** | number | Number of related keywords |
| **intents** | array | Keyword intents (e.g., "informational", "navigational", "transactional") |

#### result.summary_info Object

| Field | Type | Description |
|-------|------|-------------|
| **page** | number | Current page number |
| **left_lines** | number | Number of remaining results |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getKeywordsInfo' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "138",
    "method": "SerpstatKeywordProcedure.getKeywordsInfo",
    "params": {
      "keywords": ["iphone", "iphone 11"],
      "se": "g_us",
      "withIntents": true,
      "sort": {
        "found_results": "asc"
      },
      "filters": {
        "found_results_from": 100
      }
    }
  }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "keyword": "iphone 11",
        "cost": 0.27,
        "concurrency": 100,
        "found_results": 6350000000,
        "region_queries_count": 450000,
        "region_queries_count_wide": 0,
        "types": ["also_asks", "kn_graph_card", "related_search"],
        "geo_names": [],
        "social_domains": ["youtube", "instagram", "amazon", "wikipedia", "reddit"],
        "right_spelling": null,
        "lang": "en",
        "difficulty": 39,
        "suggestions_count": 0,
        "keywords_count": 21431,
        "intents": ["informational"]
      },
      {
        "region_queries_count": 10,
        "region_queries_count_wide": 1000000,
        "cost": 0,
        "concurrency": 100,
        "keyword": "iphone",
        "found_results": 8540000000,
        "types": ["related_search", "shopping_top", "pic"],
        "geo_names": [],
        "social_domains": ["amazon", "wikipedia", "youtube", "reddit"],
        "right_spelling": null,
        "difficulty": 76,
        "lang": "en",
        "suggestions_count": 0,
        "keywords_count": 1068805,
        "intents": ["navigational", "transactional"]
      }
    ],
    "summary_info": {
      "page": 1,
      "left_lines": 999988
    }
  }
}
```

## Usage Notes

1. **Credit Consumption**: This endpoint consumes API credits based on the number of results returned
2. **Rate Limiting**: Maximum 1000 results per query
3. **Search Engines**: Supports a wide range of search engines with specific country codes
4. **Intent Analysis**: The `withIntents` parameter provides keyword intent analysis for US and Ukraine databases
5. **Filtering**: Advanced filtering capabilities for cost, competition, and result count
6. **Sorting**: Custom sorting options for result ordering
7. **Regional Data**: Provides both regional and wide regional query counts
8. **Social Media Integration**: Includes social domain analysis for major platforms