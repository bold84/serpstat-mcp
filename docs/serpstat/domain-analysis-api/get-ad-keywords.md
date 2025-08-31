# getAdKeywords

The `SerpstatDomainProcedure.getAdKeywords` method searches for keywords in paid search results and advertising listings for a specific domain.

**Credits**: 1 credit per member of `data` object array in response.

**Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

The number of charged credits corresponds to the number of results obtained upon request.

## Request

### Security: API Key

### Body

#### id
- Type: string
- Required: Yes
- Description: Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### method
- Type: string
- Required: Yes
- Description: Should be exact `SerpstatDomainProcedure.getAdKeywords`

#### params
- Type: object

#### domain
- Type: string
- Required: Yes
- Description: Domain name

#### se
- Type: string
- Required: Yes
- Example: `"se":"g_us"`
- Description: Reffer to full list of search engines
- Allowed values:
  - g_af
  - g_al
  - g_dz
  - g_as
  - g_ad
  - g_ao
  - g_ai
  - g_ag
  - g_ar
  - g_am
  - g_aw
  - g_au
  - g_at
  - g_az
  - g_bh
  - g_bd
  - g_bb
  - g_by
  - g_be
  - g_bz
  - g_bj
  - g_bm
  - g_bt
  - g_bo
  - g_ba
  - g_bw
  - g_br
  - g_io
  - g_vg
  - g_bn
  - g_bg
  - g_bf
  - g_bi
  - g_kh
  - g_cm
  - g_ca
  - g_cv
  - g_ky
  - g_cf
  - g_td
  - g_cl
  - g_cn
  - g_cx
  - g_сс
  - g_co
  - g_km
  - g_ck
  - g_cr
  - g_ci
  - g_hr
  - g_cw
  - g_cy
  - g_cz
  - g_cd
  - g_dk
  - g_dj
  - g_dm
  - g_do
  - g_ec
  - g_eg
  - g_sv
  - g_gq
  - g_er
  - g_ee
  - g_et
  - g_fk
  - g_fo
  - g_fm
  - g_fj
  - g_fi
  - g_fr
  - g_gf
  - g_pf
  - g_ga
  - g_ge
  - g_de
  - g_gh
  - g_gi
  - g_gr
  - g_gl
  - g_gd
  - g_gp
  - g_gu
  - g_gt
  - g_gg
  - g_gn
  - g_gw
  - g_gy
  - g_ht
  - g_hn
  - g_hk
  - g_hu
  - g_is
  - g_in
  - g_id
  - g_iq
  - g_ie
  - g_im
  - g_il
  - g_it
  - g_jm
  - g_jp
  - g_je
  - g_jo
  - g_kz
  - g_ke
  - g_ki
  - g_kw
  - g_kg
  - g_la
  - g_lv
  - g_lb
  - g_ls
  - g_lr
  - g_ly
  - g_li
  - g_lt
  - g_lu
  - g_mo
  - g_mk
  - g_mg
  - g_mw
  - g_my
  - g_mv
  - g_ml
  - g_mt
  - g_mh
  - g_mq
  - g_mr
  - g_mu
  - g_yt
  - g_mx
  - g_md
  - g_mc
  - g_mn
  - g_me
  - g_ms
  - g_ma
  - g_mz
  - g_mm
  - g_na
  - g_nr
  - g_np
  - g_nl
  - g_nc
  - g_nz
  - g_ni
  - g_ne
  - g_ng
  - g_nu
  - g_nf
  - g_mp
  - g_no
  - g_om
  - g_pk
  - g_pw
  - g_ps
  - g_pa
  - g_pg
  - g_py
  - g_pe
  - g_ph
  - g_pn
  - g_pl
  - g_pt
  - g_pr
  - g_qa
  - g_cg
  - g_re
  - g_ro
  - g_ru
  - g_rw
  - g_sh
  - g_kn
  - g_lc
  - g_pm
  - g_vc
  - g_ws
  - g_sm
  - g_st
  - g_sa
  - g_sn
  - g_rs
  - g_sc
  - g_sl
  - g_sg
  - g_sx
  - g_sk
  - g_si
  - g_sb
  - g_so
  - g_za
  - g_kr
  - g_es
  - g_lk
  - g_sr
  - g_sz
  - g_se
  - g_ch
  - g_tw
  - g_tj
  - g_tz
  - g_th
  - g_bs
  - g_gm
  - g_tl
  - g_tg
  - g_tk
  - g_to
  - g_tt
  - g_tn
  - g_tr
  - g_tm
  - g_tc
  - g_tv
  - g_vi
  - g_ug
  - g_ua
  - g_ae
  - g_uk
  - g_us
  - g_uy
  - g_uz
  - g_vu
  - g_va
  - g_ve
  - g_vn
  - g_wf
  - g_ye
  - g_zm
  - g_zw
  - bing_us

#### url
- Type: string
- Description: Link to refine your search

#### keywords
- Type: array[string]
- Description: Array of keywords to search for

#### minusKeywords
- Type: array[string]
- Description: List of keywords to exclude from the search

#### filters
- Type: object
- Description: Filters for search. Fields are combined using the `AND` logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria

#### sort
- Type: object
- Description: "Order of sorting the results in the format: {field: order}"

#### page
- Type: integer
- Description: Page number in response
- Constraints: >= 1
- Default: "1"

#### size
- Type: integer
- Description: Number of results per page in response
- Constraints: >= 1, <= 1000
- Default: "100"

## Responses

### 200 OK

#### Body

#### id
- Type: string
- Required: Yes
- Description: Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### result
- Type: object

#### data
- Type: array[object]

#### summary_info
- Type: object

## Request Sample: Shell / cURL

```bash
curl --request POST \
 --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getAdKeywords' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/json' \
 --data '{ "id": "123", "method": "SerpstatDomainProcedure.getAdKeywords", "params": { "domain": "nike.com", "se": "g_us", "url": "https://www.nike.com/", "keywords": [ "nike", "id" ], "minusKeywords": [ "nikeid " ], "filters": { "queries_from": 10, "queries_to": 300000 }, "sort": { "cost": "desc" }, "page": 1, "size": 2 } }'
```

## Response Example

```json
{
  "id": "156",
  "result": {
    "data": [
      {
        "keyword": "nike in usa online",
        "keyword_length": 4,
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "url": "https://www.nike.com/",
        "title": "Nike® Official Site",
        "text": "Your New Favorite Nike® Gear — Shop exclusive new styles crafted with the latest Nike® technology & innovations now. Gear up with shoes & clothes designed for performance & comfort. Shop Nike® now.",
        "position": 1,
        "type": "1",
        "cost": 20.006616,
        "concurrency": 86,
        "found_results": 127000000,
        "region_queries_count": 480,
        "region_queries_count_wide": 0,
        "types": [
          "ads_top",
          "related_search"
        ],
        "geo_names": [
          "usa"
        ],
        "difficulty": 6
      },
      {
        "keyword": "nike north america",
        "keyword_length": 3,
        "domain": "nike.com",
        "subdomain": "www.nike.com",
        "url": "https://www.nike.com/",
        "title": "Free Shipping On Orders $75+",
        "text": "Your New Favorite Nike® Gear — Shop last minute gifts with Nike® - use code LASTSHOT for an extra 25% off select styles. Save up to 50% off on last minute gifts with Nike® - find the perfect gift today.",
        "position": 1,
        "type": "3",
        "cost": 6,
        "concurrency": 24,
        "found_results": 126000000,
        "region_queries_count": 40,
        "region_queries_count_wide": 0,
        "types": [
          "pic",
          "ads_bot",
          "related_search",
          "also_asks"
        ],
        "geo_names": [
          "north america"
        ],
        "difficulty": 11
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 133,
      "left_lines": 973679
    }
  }
}