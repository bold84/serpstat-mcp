# getDomainsHistory

Method `SerpstatDomainProcedure.getDomainsHistory` provides you with the historical data on a domain's number of keywords and visibility.

## Credits
- 1 credit per member of `data` object array in response.

## Note
- Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Error Response
If no data found you will receive error:
```json
{
  "id": "1",
  "error": {
    "code": 32017,
    "message": "Data not found",
    "data": null
  }
}
```

## Request

### Security
- API Key

### Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| method | string | required | must be exact `SerpstatDomainProcedure.getDomainsHistory` |
| params | object | required |  |
| domain | string | required | domain name, example `"gogler.com"` |
| se | string | required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |

### Allowed values for `se`:
g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us |

### Optional Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| during_all_time | boolean | History period: if `true` - get information on All time, `false` - get information on year to date |
| filters | object | basic filters with date. Optional combinations of filters applied to your request. In most cases one filter is enough. Filter combinations have `AND` logic. |
| sort | object | Order of sorting the results in the format: {field: order} |
| size | integer | Number of results per page in response |
| | | `>= 1` |
| | | `<= 1000` |
| | | `Default:` `100` |

## Responses

### 200 - OK

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| result | object |  |
| data | array[object] | Contains 2-4 week data points for given domain |
| summary_info | object | Credits and info object |

### Response Example

```json
{
  "id": "100501",
  "result": {
    "data": [
      {
        "domain": "nike.com",
        "keywords": 3164090,
        "traff": 171700098,
        "visible": 376.81473,
        "visible_static": 376.81473,
        "new_keywords": 97474,
        "out_keywords": 125533,
        "rised_keywords": 111684,
        "down_keywords": 150290,
        "ad_keywords": 288,
        "ads": 222,
        "date": "2025-06-02"
      },
      {
        "domain": "www.nike.com",
        "keywords": 2953815,
        "traff": 175740898,
        "visible": 404.83169,
        "visible_static": 404.83169,
        "new_keywords": 133024,
        "out_keywords": 143086,
        "rised_keywords": 155965,
        "down_keywords": 181128,
        "ad_keywords": 327,
        "ads": 244,
        "date": "2025-05-21"
      },
      {
        "domain": "nike.com",
        "keywords": 3192149,
        "traff": 179250655,
        "visible": 407.14943,
        "visible_static": 407.14943,
        "new_keywords": 167811,
        "out_keywords": 167433,
        "rised_keywords": 190782,
        "down_keywords": 212159,
        "ad_keywords": 339,
        "ads": 246,
        "date": "2025-05-18"
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 3,
      "left_lines": 9999979
    }
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getDomainsHistory' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "100501", "method": "SerpstatDomainProcedure.getDomainsHistory", "params": { "domain": "nike.com", "se": "g_us", "sort": { "date": "desc" }, "filters": { "date_from": "2025-05-15", "date_to": "2025-06-04" }, "size": 5, "during_all_time": false } }'