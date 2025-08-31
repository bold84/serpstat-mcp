# getCompetitors

The `SerpstatKeywordProcedure.getCompetitors` method lists the domains that rank for the given keyword in Google top-20 results.

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
| method | string | required | Should be exact `SerpstatKeywordProcedure.getCompetitors` |
| params | object | required |  |
| keyword | string | required | Keyword to search for |
| se | string | required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| filters | object | optional | Filters for search. Fields are combined using the **AND** logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria |
| sort | object | optional | Order of sorting the results in the format: `"field: order"` |
| size | integer | optional | Number of results per page in response |
| | | | `>= 1` |
| | | | `<= 1000` |

### Search Engine Codes
- g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_cc, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw |
- bing_us |

### Responses

#### 200 - OK

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| result | object | required |  |
| data | dictionary[string, object] | required | Detailed information for each domain |
| summary_info | object | required |  |

## Example Request

```bash
curl --request POST \
--url 'https://api.serpstat.com/v4/?token=123#SerpstatKeywordProcedure.getCompetitors' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data '{ "id": "147", "method": "SerpstatKeywordProcedure.getCompetitors", "params": { "keyword": "pizza", "se": "g_us", "filters": { "traff_from": 124548909 }, "sort": { "visible": "desc" }, "size": 10 } }'
```

## Example Response

```json
{
  "id": "144",
  "result": {
    "data": {
      "reddit.com": {
        "domain": "reddit.com",
        "visible": 13716.62849,
        "keywords": 176168560,
        "traff": 3774678506,
        "visible_dynamic": -1394.9746000000014,
        "keywords_dynamic": -627143,
        "traff_dynamic": -310984782,
        "ads_dynamic": -5,
        "new_keywords": 3608250,
        "out_keywords": 4235393,
        "rised_keywords": 8437575,
        "down_keywords": 10831946,
        "ad_keywords": 5,
        "ads": 5,
        "intersected": 320670,
        "relevance": 0.18,
        "our_relevance": 10.04
      },
      "tripadvisor.com": {
        "domain": "tripadvisor.com",
        "visible": 9913.94417,
        "keywords": 37159364,
        "traff": 3033793834,
        "visible_dynamic": 73.95514000000003,
        "keywords_dynamic": -246205,
        "traff_dynamic": 44217818,
        "ads_dynamic": 24,
        "new_keywords": 707738,
        "out_keywords": 953943,
        "rised_keywords": 2207635,
        "down_keywords": 1763582,
        "ad_keywords": 3063,
        "ads": 2994,
        "intersected": 344659,
        "relevance": 0.93,
        "our_relevance": 10.79
      },
      "yelp.com": {
        "domain": "yelp.com",
        "visible": 5204.33312,
        "keywords": 54375734,
        "traff": 2113042151,
        "visible_dynamic": 268.87859000000026,
        "keywords_dynamic": -371900,
        "traff_dynamic": 52874120,
        "ads_dynamic": -1,
        "new_keywords": 688923,
        "out_keywords": 1060823,
        "rised_keywords": 3060498,
        "down_keywords": 2893024,
        "ad_keywords": 2,
        "ads": 2,
        "intersected": 351504,
        "relevance": 0.65,
        "our_relevance": 11
      },
      "allrecipes.com": {
        "domain": "allrecipes.com",
        "visible": 2314.56321,
        "keywords": 6768364,
        "traff": 406513024,
        "visible_dynamic": 185.38419999999996,
        "keywords_dynamic": 139529,
        "traff_dynamic": 31088721,
        "ads_dynamic": 0,
        "new_keywords": 337675,
        "out_keywords": 198146,
        "rised_keywords": 461452,
        "down_keywords": 358300,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 63648,
        "relevance": 0.94,
        "our_relevance": 1.99
      },
      "thekitchn.com": {
        "domain": "thekitchn.com",
        "visible": 727.47238,
        "keywords": 4366541,
        "traff": 124548909,
        "visible_dynamic": 0,
        "keywords_dynamic": 0,
        "traff_dynamic": 0,
        "ads_dynamic": 0,
        "new_keywords": 244000,
        "out_keywords": 174698,
        "rised_keywords": 326965,
        "down_keywords": 265687,
        "ad_keywords": 0,
        "ads": 0,
        "intersected": 37674,
        "relevance": 0.86,
        "our_relevance": 1.18
      }
    },
    "summary_info": {
      "page": 1,
      "left_lines": 999228
    }
  }
}