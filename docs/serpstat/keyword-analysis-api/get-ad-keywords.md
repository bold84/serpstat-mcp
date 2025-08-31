# getAdKeywords

The `SerpstatKeywordProcedure.getAdKeywords` returns paid keywords and ads copies that pop up for the queried keyword in paid search results.

## Credits
- **Credits**: 1 credit per row in response.
- The number of charged credits corresponds to the number of results obtained upon request.

## Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

### Security: API Key

### Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| method | string | required | Should be exact `SerpstatKeywordProcedure.getAdKeywords` |
| params | object | required |  |
| keyword | string | required | Keyword to search for |
| se | string | required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| domains | array[string] | required | Domain names list |
| minusKeywords | array[string] | optional | List of keywords to exclude from the search |
| filter | object | optional | Filters for search. Fields are combined using the **AND** logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria |
| sort | object | optional | Order of sorting the results in the format: `"field: order"` |
| page | integer | optional | Page number in response |
| size | integer | optional | Number of results per page in response |

### Search Engine Codes
- g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_cc, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw |
- bing_us |

### Responses

#### 200 - OK

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| result | object | required |  |
| data | array[object] | required |  |
| summary_info | object | required |  |

## Example Request

```bash
curl --request POST \
--url 'https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getAdKeywords' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data '{ "id": "149", "method": "SerpstatKeywordProcedure.getAdKeywords", "params": { "keyword": "iphone", "se": "g_us", "domains": [ "apple.com", "verizon.com" ], "minusKeywords": [ "iphone s16", "iphone 16" ], "filters": { "region_queries_count_from": 10 }, "sort": { "cost": "asc" }, "page": 1, "size": 3 } }'
```

## Example Response

```json
{
  "id": "148",
  "result": {
    "data": [
      {
        "keyword": "activating my new iphone verizon",
        "keyword_length": 5,
        "domain": "verizon.com",
        "subdomain": "www.verizon.com",
        "url": "https://www.verizon.com/smartphones/apple-iphone-16/",
        "title": "iPhone 16 online offer | Enjoy. It is on us. | Get yours at Verizon",
        "text": "With Unlimited Ultimate (min plan $90/mo w/Auto Pay +taxes/fees for 36 mos). Terms apply.",
        "position": 1,
        "type": "3",
        "cost": 0,
        "concurrency": 14,
        "found_results": 2080000,
        "region_queries_count": 10,
        "region_queries_count_wide": 50,
        "types": [
          "ads_bot",
          "also_asks"
        ],
        "geo_names": [],
        "difficulty": 25
      },
      {
        "keyword": "verizon iphone deals without new line",
        "keyword_length": 6,
        "domain": "verizon.com",
        "subdomain": "www.verizon.com",
        "url": "https://www.verizon.com/smartphones/apple-iphone-16/",
        "title": "iPhone 16 at Verizon | Get it on us. No trade-in deal",
        "text": "With Unlimited Ultimate (min plan $90/mo w/Auto Pay +taxes/fees for 36 mos). Terms apply.",
        "position": 1,
        "type": "3",
        "cost": 0,
        "concurrency": 52,
        "found_results": 10900000,
        "region_queries_count": 30,
        "region_queries_count_wide": 10,
        "types": [
          "pic",
          "related_search",
          "shopping_top",
          "also_asks",
          "ads_bot"
        ],
        "geo_names": [],
        "difficulty": null
      },
      {
        "keyword": "data plan for iphone verizon",
        "keyword_length": 5,
        "domain": "verizon.com",
        "subdomain": "www.verizon.com",
        "url": "https://www.verizon.com/smartphones/apple-iphone-16-pro/",
        "title": "Verizon Holiday deals & offers - Get iPhone 16 Pro on us.",
        "text": "Also, iPad & Apple Watch. All on us.Phone w/Unlimited Ultimate.Service plan for iPad/watch",
        "position": 1,
        "type": "3",
        "cost": 0,
        "concurrency": 24,
        "found_results": 4920000,
        "region_queries_count": 20,
        "region_queries_count_wide": 0,
        "types": [
          "also_asks",
          "ads_bot",
          "related_search",
          "pic"
        ],
        "geo_names": [],
        "difficulty": 59
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 197,
      "left_lines": 999219
    }
  }
}