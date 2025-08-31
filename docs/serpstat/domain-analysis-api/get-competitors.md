# getCompetitors | Serpstat Public API

## Overview

The `SerpstatDomainProcedure.getCompetitors` method brings in the list of domain competitors in top 20 Google search results. The data set is similar to the [Competitors report](https://serpstat.com/domains/competitors/?query=&se=g_us&search_type=subdomains) of the domain.

### ⚠️ **DEPRECATED**
This method is deprecated from 2023-03-01

### Credits Information
- **Credits**: 1 credit per one `result` array member in `data` object in response.

### Important Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

### Security: API Key

### Body

#### Request Body Content Type
- `application/json`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `method` | string | Required | should be exact `SerpstatDomainProcedure.getCompetitors` |
| | | | **Example:** `SerpstatDomainProcedure.getCompetitors` |
| `params` | object | Required | Method parameters |

#### Parameters Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string<hostname> | Required | domain name |
| | | | **Example:** `serpstat.com` |
| `se` | string | Required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| **Allowed values:** | | | |
| g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us |
| `filters` | object | - | Filters for search. Fields are combined using the **AND** logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria |
| `sort` | object | - | Optional. With this sorting options, you can sort by one of response parameters. Default sorting is `"relevance":"desc"` |
| `size` | integer | - | Size of report, by default - 100, you can specify lower value - 5 |
| | | | >= 1 |
| | | | <= 1000 |
| | | | **Default:** `100` |
| | | | **Example:** `100` |

## Responses

### 200 OK

#### Response Body Content Type
- `application/json`

#### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `result` | object | Required | Main response object |
| `data` | array[object] | Required | Data object, contained main response data. |
| `summary_info` | object | Required | Object contains data about API credits and paginations |

### Data Object Structure

Each object in the `data` array contains:

| Field | Type | Description |
|-------|------|-------------|
| `domain` | string | The domain name |
| `visible` | number | Visibility metric |
| `keywords` | integer | Number of keywords |
| `traff` | integer | Traffic data |
| `visible_dynamic` | number | Dynamic visibility change |
| `keywords_dynamic` | integer | Dynamic keyword change |
| `traff_dynamic` | integer | Dynamic traffic change |
| `ads_dynamic` | integer | Dynamic ads change |
| `new_keywords` | integer | Number of new keywords |
| `out_keywords` | integer | Number of lost keywords |
| `rised_keywords` | integer | Number of improved keywords |
| `down_keywords` | integer | Number of declined keywords |
| `ad_keywords` | integer | Number of ad keywords |
| `ads` | integer | Number of ads |
| `intersected` | integer | Number of intersected keywords |
| `common` | integer | Number of common keywords |
| `not_intersected` | integer | Number of non-intersected keywords |
| `missing` | integer | Number of missing keywords |
| `relevance` | number | Relevance score |
| `new_relevance` | number | New relevance score |
| `our_relevance` | number | Our relevance score |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getCompetitors' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "123",
  "method": "SerpstatDomainProcedure.getCompetitors",
  "params": {
    "domain": "serpstat.com",
    "se": "g_us",
    "sort": {
      "relevance": "desc"
    },
    "size": "5"
  }
}'
```

## Response Example

```json
{
  "id": "129",
  "result": {
    "data": [
      {
        "domain": "serpstat.com",
        "visible": 0.02182,
        "keywords": 22317,
        "traff": 54069,
        "visible_dynamic": -0.0037599999999999995,
        "keywords_dynamic": -105,
        "traff_dynamic": 6066,
        "ads_dynamic": 0,
        "new_keywords": 470,
        "out_keywords": 575,
        "rised_keywords": 744,
        "down_keywords": 846,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 22317,
        "common": 22317,
        "relevance": 100,
        "new_relevance": 100,
        "our_relevance": 100,
        "missing": 0
      },
      {
        "domain": "seoreviewtools.com",
        "visible": 1.14398,
        "keywords": 17358,
        "traff": 226207,
        "visible_dynamic": -0.026680000000000037,
        "keywords_dynamic": 173,
        "traff_dynamic": 676,
        "ads_dynamic": 0,
        "new_keywords": 485,
        "out_keywords": 312,
        "rised_keywords": 788,
        "down_keywords": 1018,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 5853,
        "common": 5853,
        "not_intersected": 11505,
        "missing": 11505,
        "relevance": 33.72,
        "new_relevance": 17.31,
        "our_relevance": 26.23
      },
      {
        "domain": "seomator.com",
        "visible": 0.28061,
        "keywords": 20662,
        "traff": 99707,
        "visible_dynamic": 0.018950000000000022,
        "keywords_dynamic": 56,
        "traff_dynamic": 12319,
        "ads_dynamic": 0,
        "new_keywords": 437,
        "out_keywords": 381,
        "rised_keywords": 1027,
        "down_keywords": 997,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 5253,
        "common": 5253,
        "not_intersected": 15409,
        "missing": 15409,
        "relevance": 25.42,
        "new_relevance": 13.92,
        "our_relevance": 23.54
      },
      {
        "domain": "spyfu.com",
        "visible": 0.24865,
        "keywords": 25604,
        "traff": 90396,
        "visible_dynamic": 0.0004200000000000037,
        "keywords_dynamic": 424,
        "traff_dynamic": 4069,
        "ads_dynamic": 0,
        "new_keywords": 1018,
        "out_keywords": 594,
        "rised_keywords": 1120,
        "down_keywords": 759,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 5484,
        "common": 5484,
        "not_intersected": 20120,
        "missing": 20120,
        "relevance": 21.42,
        "new_relevance": 12.92,
        "our_relevance": 24.57
      },
      {
        "domain": "link-assistant.com",
        "visible": 0.63261,
        "keywords": 36849,
        "traff": 155650,
        "visible_dynamic": -0.009789999999999965,
        "keywords_dynamic": 92,
        "traff_dynamic": 26891,
        "ads_dynamic": 0,
        "new_keywords": 758,
        "out_keywords": 666,
        "rised_keywords": 1688,
        "down_keywords": 1230,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 7611,
        "common": 7611,
        "not_intersected": 29238,
        "missing": 29238,
        "relevance": 20.65,
        "new_relevance": 14.76,
        "our_relevance": 34.1
      }
    ],
    "summary_info": {
      "page": 1,
      "left_lines": 9999913
    }
  }
}