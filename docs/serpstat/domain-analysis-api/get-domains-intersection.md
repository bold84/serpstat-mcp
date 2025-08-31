# getDomainsIntersection | Serpstat Public API

The `SerpstatDomainProcedure.getDomainsIntersection` method returns common keywords of up to 3 domains. The data set is similar to the Domain vs domain report.

**Credits**: 1 credit per one result array member in data object in response.

**Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

**Security**: API Key

**Body**

```json
{
  "id": "123",
  "method": "SerpstatDomainProcedure.getDomainsIntersection",
  "params": {
    "se": "g_us",
    "domains": [
      "nike.com",
      "adidas.com",
      "puma.com"
    ],
    "page": 1,
    "size": 10
  }
}
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| **id** | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to id in response. Example "id":"123" |
| **method** | string | required | Should be exact `SerpstatDomainProcedure.getDomainsIntersection` |
| **params** | object | required |  |
| **params.se** | string | required | Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names) |
| **params.se** | string | required | Allowed values: g_af, g_al, g_dz, g_as, g_ad, g_ao, g_ai, g_ag, g_ar, g_am, g_aw, g_au, g_at, g_az, g_bh, g_bd, g_bb, g_by, g_be, g_bz, g_bj, g_bm, g_bt, g_bo, g_ba, g_bw, g_br, g_io, g_vg, g_bn, g_bg, g_bf, g_bi, g_kh, g_cm, g_ca, g_cv, g_ky, g_cf, g_td, g_cl, g_cn, g_cx, g_сс, g_co, g_km, g_ck, g_cr, g_ci, g_hr, g_cw, g_cy, g_cz, g_cd, g_dk, g_dj, g_dm, g_do, g_ec, g_eg, g_sv, g_gq, g_er, g_ee, g_et, g_fk, g_fo, g_fm, g_fj, g_fi, g_fr, g_gf, g_pf, g_ga, g_ge, g_de, g_gh, g_gi, g_gr, g_gl, g_gd, g_gp, g_gu, g_gt, g_gg, g_gn, g_gw, g_gy, g_ht, g_hn, g_hk, g_hu, g_is, g_in, g_id, g_iq, g_ie, g_im, g_il, g_it, g_jm, g_jp, g_je, g_jo, g_kz, g_ke, g_ki, g_kw, g_kg, g_la, g_lv, g_lb, g_ls, g_lr, g_ly, g_li, g_lt, g_lu, g_mo, g_mk, g_mg, g_mw, g_my, g_mv, g_ml, g_mt, g_mh, g_mq, g_mr, g_mu, g_yt, g_mx, g_md, g_mc, g_mn, g_me, g_ms, g_ma, g_mz, g_mm, g_na, g_nr, g_np, g_nl, g_nc, g_nz, g_ni, g_ne, g_ng, g_nu, g_nf, g_mp, g_no, g_om, g_pk, g_pw, g_ps, g_pa, g_pg, g_py, g_pe, g_ph, g_pn, g_pl, g_pt, g_pr, g_qa, g_cg, g_re, g_ro, g_ru, g_rw, g_sh, g_kn, g_lc, g_pm, g_vc, g_ws, g_sm, g_st, g_sa, g_sn, g_rs, g_sc, g_sl, g_sg, g_sx, g_sk, g_si, g_sb, g_so, g_za, g_kr, g_es, g_lk, g_sr, g_sz, g_se, g_ch, g_tw, g_tj, g_tz, g_th, g_bs, g_gm, g_tl, g_tg, g_tk, g_to, g_tt, g_tn, g_tr, g_tm, g_tc, g_tv, g_vi, g_ug, g_ua, g_ae, g_uk, g_us, g_uy, g_uz, g_vu, g_va, g_ve, g_vn, g_wf, g_ye, g_zm, g_zw, bing_us |
| **params.domains** | array[string] | required | Array of domain names, minimum 2, maximum 3 |
| | | | >= 2 items |
| | | | <= 3 items |
| **params.filters** | object | optional | Filters for search. Fields are combined using the **AND** logic. Numeric range fields ( _from and _to ) allow specifying minimum and maximum values. List fields ( _contain and _not_contain ) specify inclusion or exclusion criteria |
| **params.page** | integer | optional | Page number in response |
| | | | Example: `1` |
| **params.size** | integer | optional | Number of results per page in response |
| | | | >= 1 |
| | | | <= 1000 |
| | | | Default: `100` |
| | | | Example: `10` |

## Responses

### 200

**Body**

```json
{
  "id": "163",
  "result": {
    "data": [
      {
        "keyword": "puma shoes basketball shoes",
        "keyword_length": 4,
        "types": [
          "related_search",
          "pic",
          "also_asks",
          "snip_breadcrumbs"
        ],
        "found_results": 294,
        "cost": 0.32,
        "concurrency": 100,
        "region_queries_count": 27100,
        "region_queries_count_wide": 20,
        "geo_names": [],
        "traff": 0,
        "domain3": "puma.com",
        "subdomain3": "us.puma.com",
        "url3": "https://us.puma.com/us/en/men/shoes/basketball",
        "position3": 1,
        "dynamic3": 79,
        "domain1": "nike.com",
        "subdomain1": "www.nike.com",
        "url1": "https://www.nike.com/w/dunk-shoes-90aohzy7ok",
        "position1": 80,
        "dynamic1": -6,
        "domain2": "adidas.com",
        "subdomain2": "www.adidas.com",
        "url2": "https://www.adidas.com/us/anthony_edwards",
        "position2": 70,
        "dynamic2": 10
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 238285,
      "left_lines": 973385
    }
  }
}
```

#### Schema

| Name | Type | Required | Description |
|------|------|----------|-------------|
| **id** | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to id in response. Example "id":"123" |
| **result** | object | required |  |
| **result.data** | array[object] | required |  |
| **result.data.0** | object | required |  |
| **result.data.0.keyword** | string | required |  |
| **result.data.0.keyword_length** | integer | required |  |
| **result.data.0.types** | array[string] | required |  |
| **result.data.0.types.0** | string | required |  |
| **result.data.0.types.1** | string | required |  |
| **result.data.0.types.2** | string | required |  |
| **result.data.0.types.3** | string | required |  |
| **result.data.0.found_results** | integer | required |  |
| **result.data.0.cost** | number | required |  |
| **result.data.0.concurrency** | integer | required |  |
| **result.data.0.region_queries_count** | integer | required |  |
| **result.data.0.region_queries_count_wide** | integer | required |  |
| **result.data.0.geo_names** | array | required |  |
| **result.data.0.traff** | integer | required |  |
| **result.data.0.domain3** | string | required |  |
| **result.data.0.subdomain3** | string | required |  |
| **result.data.0.url3** | string | required |  |
| **result.data.0.position3** | integer | required |  |
| **result.data.0.dynamic3** | integer | required |  |
| **result.data.0.domain1** | string | required |  |
| **result.data.0.subdomain1** | string | required |  |
| **result.data.0.url1** | string | required |  |
| **result.data.0.position1** | integer | required |  |
| **result.data.0.dynamic1** | integer | required |  |
| **result.data.0.domain2** | string | required |  |
| **result.data.0.subdomain2** | string | required |  |
| **result.data.0.url2** | string | required |  |
| **result.data.0.position2** | integer | required |  |
| **result.data.0.dynamic2** | integer | required |  |
| **result.summary_info** | object | required |  |
| **result.summary_info.page** | integer | required |  |
| **result.summary_info.total** | integer | required |  |
| **result.summary_info.left_lines** | integer | required |  |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getDomainsIntersection' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "123",
  "method": "SerpstatDomainProcedure.getDomainsIntersection",
  "params": {
    "se": "g_us",
    "domains": [
      "nike.com",
      "adidas.com",
      "puma.com"
    ],
    "page": 1,
    "size": 10
  }
}'