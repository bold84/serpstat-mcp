# getTopUrls

The `SerpstatKeywordProcedure.getTopUrls` method returns website pages that rank for the largest amount of the analyzed keyword variations and have the highest traffic.

## Credits

- **Credits**: 1 credit per request.

## Note

- Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

**POST** `https://api.serpstat.com/v4`

### Security: API Key

### Body

```json
{
  "id": "153",
  "method": "SerpstatKeywordProcedure.getTopUrls",
  "params": {
    "keyword": "laptop",
    "se": "g_us",
    "sort": "keywords",
    "order": "desc",
    "page": 1,
    "page_size": 10
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Should be exact `SerpstatKeywordProcedure.getTopUrls` |
| `params` | object | Yes | Request parameters |
| `params.keyword` | string | Yes | Keyword to search for |
| `params.se` | string | Yes | Search engine short name. Example `"se":"g_us"`. Refer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |

### Search Engine Codes

Allowed values:
- Google: g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw
- Bing: bing_us

### Optional Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `params.sort` | string | No | Sorting by parameters (Any field in `urls` section of response) |
| `params.order` | string | No | Sorting order |
| `params.page` | integer | No | Page number |
| `params.page_size` | integer | No | Number of results per page |

### Sorting Options

| Parameter | Allowed Values | Default |
|-----------|----------------|---------|
| `params.order` | `asc`, `desc` | `desc` |

## Responses

### 200 OK

```json
{
  "id": "152",
  "result": {
    "urls": [
      {
        "url": "https://www.omen.com/us/en/laptops.html",
        "keywords": 26678,
        "traff": 83093,
        "fbShares": 1017
      },
      {
        "url": "https://www.microsoft.com/en-us/surface/devices/surface-laptop-7th-edition",
        "keywords": 20771,
        "traff": 176188,
        "fbShares": 62
      },
      {
        "url": "https://www.nytimes.com/wirecutter/reviews/best-laptops/",
        "keywords": 19835,
        "traff": 253459,
        "fbShares": 432
      },
      {
        "url": "https://www.amazon.com/Notebooks-Laptop-Computers/b?ie=UTF8&node=565108",
        "keywords": 18521,
        "traff": 1151607,
        "fbShares": 1807
      },
      {
        "url": "https://www.samsclub.com/b/laptops/1117",
        "keywords": 15897,
        "traff": 81120,
        "fbShares": 124
      },
      {
        "url": "https://en.wikipedia.org/wiki/Laptop",
        "keywords": 13806,
        "traff": 88313,
        "fbShares": 196
      },
      {
        "url": "https://www.razer.com/pc/gaming-laptops",
        "keywords": 13282,
        "traff": 107704,
        "fbShares": 523
      },
      {
        "url": "https://www.pcworld.com/article/436674/the-best-pc-laptops-of-the-year.html",
        "keywords": 11238,
        "traff": 397942,
        "fbShares": 303
      },
      {
        "url": "https://www.costco.com/laptops.html",
        "keywords": 10999,
        "traff": 403275,
        "fbShares": 276
      },
      {
        "url": "https://www.pcgamer.com/best-gaming-laptop/",
        "keywords": 10751,
        "traff": 564917,
        "fbShares": 1098
      }
    ],
    "summary_info": {
      "left_lines": 999203,
      "keyword": "laptop",
      "se": "g_us",
      "page": 1,
      "page_size": 10,
      "sort": "keywords",
      "order": "desc",
      "total_urls": 3036977
    }
  }
}
```

### Response Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request / response identifier, provided from your side, will be mirrored from request to `id` in response |
| `result` | object | Response data |
| `result.urls` | array[object] | Array of URL results |
| `result.summary_info` | object | Pagination and summary information |

### Response Data Fields

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | The URL of the webpage |
| `keywords` | integer | Number of keywords this URL ranks for |
| `traff` | integer | Estimated traffic for this URL |
| `fbShares` | integer | Number of Facebook shares |

### Summary Info Fields

| Field | Type | Description |
|-------|------|-------------|
| `left_lines` | integer | Number of remaining results |
| `keyword` | string | Search keyword |
| `se` | string | Search engine used |
| `page` | integer | Current page number |
| `page_size` | integer | Number of results per page |
| `sort` | string | Sorting field used |
| `order` | string | Sorting order used |
| `total_urls` | integer | Total number of URLs available |

## Example Request

### cURL

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getTopUrls' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "153",
    "method": "SerpstatKeywordProcedure.getTopUrls",
    "params": {
      "keyword": "laptop",
      "se": "g_us",
      "sort": "keywords",
      "order": "desc",
      "page": 1,
      "page_size": 10
    }
  }'
```

### JSON Request

```json
{
  "id": "153",
  "method": "SerpstatKeywordProcedure.getTopUrls",
  "params": {
    "keyword": "laptop",
    "se": "g_us",
    "sort": "keywords",
    "order": "desc",
    "page": 1,
    "page_size": 10
  }
}
```

## Example Response

```json
{
  "id": "152",
  "result": {
    "urls": [
      {
        "url": "https://www.omen.com/us/en/laptops.html",
        "keywords": 26678,
        "traff": 83093,
        "fbShares": 1017
      },
      {
        "url": "https://www.microsoft.com/en-us/surface/devices/surface-laptop-7th-edition",
        "keywords": 20771,
        "traff": 176188,
        "fbShares": 62
      },
      {
        "url": "https://www.nytimes.com/wirecutter/reviews/best-laptops/",
        "keywords": 19835,
        "traff": 253459,
        "fbShares": 432
      },
      {
        "url": "https://www.amazon.com/Notebooks-Laptop-Computers/b?ie=UTF8&node=565108",
        "keywords": 18521,
        "traff": 1151607,
        "fbShares": 1807
      },
      {
        "url": "https://www.samsclub.com/b/laptops/1117",
        "keywords": 15897,
        "traff": 81120,
        "fbShares": 124
      },
      {
        "url": "https://en.wikipedia.org/wiki/Laptop",
        "keywords": 13806,
        "traff": 88313,
        "fbShares": 196
      },
      {
        "url": "https://www.razer.com/pc/gaming-laptops",
        "keywords": 13282,
        "traff": 107704,
        "fbShares": 523
      },
      {
        "url": "https://www.pcworld.com/article/436674/the-best-pc-laptops-of-the-year.html",
        "keywords": 11238,
        "traff": 397942,
        "fbShares": 303
      },
      {
        "url": "https://www.costco.com/laptops.html",
        "keywords": 10999,
        "traff": 403275,
        "fbShares": 276
      },
      {
        "url": "https://www.pcgamer.com/best-gaming-laptop/",
        "keywords": 10751,
        "traff": 564917,
        "fbShares": 1098
      }
    ],
    "summary_info": {
      "left_lines": 999203,
      "keyword": "laptop",
      "se": "g_us",
      "page": 1,
      "page_size": 10,
      "sort": "keywords",
      "order": "desc",
      "total_urls": 3036977
    }
  }
}
```

## Response Explanation

The response contains an array of URLs that rank for the analyzed keyword variations, sorted by the specified criteria:

- **url**: The webpage URL that ranks for the keyword
- **keywords**: Number of keyword variations this URL ranks for
- **traff**: Estimated monthly traffic for this URL
- **fbShares**: Number of Facebook shares for this URL

The `summary_info` object provides:
- **left_lines**: Number of additional results available beyond the current page
- **keyword**: The search keyword used
- **se**: The search engine used
- **page**: Current page number
- **page_size**: Number of results per page
- **sort**: Field used for sorting
- **order**: Sorting direction
- **total_urls**: Total number of URLs available for this query

This API is useful for identifying the most authoritative and high-traffic pages that compete for your target keywords.