# getOrganicCompetitorsPage

The `SerpstatDomainProcedure.getOrganicCompetitorsPage` method brings in the list of domain competitors in top 20 Google search results. The data set is similar to the Competitors report of the domain.

## Credits

- **Credits**: 1 credit per one `result` array member in `data` object in response.

## Note

- **Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

### Security: API Key
- **Type**: API Key
- **In**: header
- **Name**: token

### Body

#### id (string, required)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### method (string, required)
Should be exact `SerpstatDomainProcedure.getOrganicCompetitorsPage`

#### params (object)

##### domain (string, required)
Domain name
- **Example**: allo.ua

##### se (string, required)
Example `"se":"g_us"`. Reffer to full list of [search engines](../serpstat-public-api/ba97ni814ao9p-search-engine-short-names)

**Allowed values:**
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
- g_сc
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

#### sort (object)
Order of sorting the results in the format: `{field: order}`

#### page (integer, default: 1)
Page number in response
- `>= 1`

#### size (integer, default: 100)
Number of results per page in response
- `>= 10`
- `<= 500`

## Responses

### 200 OK

#### Body

##### id (string, required)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

##### result (object)

###### data (array[object])

###### summary_info (object)

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getOrganicCompetitorsPage' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatDomainProcedure.getOrganicCompetitorsPage",
    "params": {
      "domain": "allo.ua",
      "se": "g_ua",
      "sort": {
        "common": "asc"
      },
      "page": 1,
      "size": 10
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
        "domain": "allo.ua",
        "favicon": "https://www.google.com/s2/favicons?domain=allo.ua",
        "all": {
          "currentValue": 26463570,
          "dynamicValue": -14204
        },
        "common": {
          "currentValue": 26441178,
          "dynamicValue": 100
        },
        "visibility": {
          "currentValue": 1082.57402,
          "dynamicValue": 46.43733999999995
        },
        "missing": 0,
        "relevance": 100
      },
      {
        "domain": "lifehacker.ru",
        "favicon": "https://www.google.com/s2/favicons?domain=lifehacker.ru",
        "all": {
          "currentValue": 16803175,
          "dynamicValue": -5299
        },
        "common": {
          "currentValue": 1423647,
          "dynamicValue": 5.38
        },
        "visibility": {
          "currentValue": 1124.0285,
          "dynamicValue": -27.683550000000196
        },
        "missing": 15379528,
        "relevance": 8.47
      },
      {
        "domain": "vseplus.com",
        "favicon": "https://www.google.com/s2/favicons?domain=vseplus.com",
        "all": {
          "currentValue": 2177611,
          "dynamicValue": -1791
        },
        "common": {
          "currentValue": 1428832,
          "dynamicValue": 5.4
        },
        "visibility": {
          "currentValue": 10.75041,
          "dynamicValue": -0.7569299999999988
        },
        "missing": 748779,
        "relevance": 65.61
      },
      {
        "domain": "ukr.net",
        "favicon": "https://www.google.com/s2/favicons?domain=ukr.net",
        "all": {
          "currentValue": 20282100,
          "dynamicValue": 6044
        },
        "common": {
          "currentValue": 1430336,
          "dynamicValue": 5.41
        },
        "visibility": {
          "currentValue": 2351.53326,
          "dynamicValue": 32.015229999999974
        },
        "missing": 18851764,
        "relevance": 7.05
      },
      {
        "domain": "kimovil.com",
        "favicon": "https://www.google.com/s2/favicons?domain=kimovil.com",
        "all": {
          "currentValue": 1810891,
          "dynamicValue": -971
        },
        "common": {
          "currentValue": 1451472,
          "dynamicValue": 5.49
        },
        "visibility": {
          "currentValue": 5.74161,
          "dynamicValue": 0.27364999999999995
        },
        "missing": 359419,
        "relevance": 80.15
      },
      {
        "domain": "zoom.cnews.ru",
        "favicon": "https://www.google.com/s2/favicons?domain=zoom.cnews.ru",
        "all": {
          "currentValue": 3302922,
          "dynamicValue": -1117
        },
        "common": {
          "currentValue": 1461525,
          "dynamicValue": 5.53
        },
        "visibility": {
          "currentValue": 2.77443,
          "dynamicValue": 0.12383000000000033
        },
        "missing": 1841397,
        "relevance": 44.25
      },
      {
        "domain": "skay.ua",
        "favicon": "https://www.google.com/s2/favicons?domain=skay.ua",
        "all": {
          "currentValue": 1967095,
          "dynamicValue": -2757
        },
        "common": {
          "currentValue": 1492494,
          "dynamicValue": 5.64
        },
        "visibility": {
          "currentValue": 12.02291,
          "dynamicValue": 3.66423
        },
        "missing": 474601,
        "relevance": 75.87
      },
      {
        "domain": "ogolosha.ua",
        "favicon": "https://www.google.com/s2/favicons?domain=ogolosha.ua",
        "all": {
          "currentValue": 9080349,
          "dynamicValue": -2574
        },
        "common": {
          "currentValue": 1503159,
          "dynamicValue": 5.68
        },
        "visibility": {
          "currentValue": 75.20256,
          "dynamicValue": 3.0151500000000055
        },
        "missing": 7577190,
        "relevance": 16.55
      },
      {
        "domain": "mta.ua",
        "favicon": "https://www.google.com/s2/favicons?domain=mta.ua",
        "all": {
          "currentValue": 2044333,
          "dynamicValue": -208
        },
        "common": {
          "currentValue": 1505541,
          "dynamicValue": 5.69
        },
        "visibility": {
          "currentValue": 33.76362,
          "dynamicValue": 9.283710000000003
        },
        "missing": 538792,
        "relevance": 73.64
      },
      {
        "domain": "antoshka.ua",
        "favicon": "https://www.google.com/s2/favicons?domain=antoshka.ua",
        "all": {
          "currentValue": 3497326,
          "dynamicValue": -1745
        },
        "common": {
          "currentValue": 1513842,
          "dynamicValue": 5.73
        },
        "visibility": {
          "currentValue": 193.25305,
          "dynamicValue": 13.025769999999994
        },
        "missing": 1983484,
        "relevance": 43.29
      }
    ],
    "summary_info": {
      "page": 1,
      "left_lines": 973353
    }
  }
}