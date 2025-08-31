# exportPositions

Export a complete report of a domain's keyword positions in the search results. This is ideal for large-scale analysis and tracking of organic search performance. Method `SerpstatDomainProcedure.exportPositions` returns domains positions, urls and keywords in `CSV` format.

**Credits**: 1 credit per row in response.

**Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

**Note**: This method retuns data in CSV format.

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
- Description: Should be exact `SerpstatDomainProcedure.exportPositions`

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

#### filters
- Type: object
- Description: Filters for search. Fields are combined using the `AND` logic. Numeric range fields (`_from` and `_to`) allow specifying minimum and maximum values. List fields (`_contain` and `_not_contain`) specify inclusion or exclusion criteria

#### sort
- Type: object
- Description: "Order of sorting the results in the format: {field: order}"

#### page
- Type: integer
- Description: Page number in response

#### size
- Type: integer
- Description: Number of results per page in response
- Constraints: >= 1, <= 60000

## Responses

### 200 OK

Returns data in `.csv` format.

Columns: `"Domain","Keyword","Position","Position dynamic","Keyword volume","CPC","Competition in PPC","Keyword length","URL","Snippets","Results found","Approximate traffic"`

#### Body

#### responses
- Type: string
- Description: responses/200

## Request Sample: Shell / cURL

```bash
curl --request POST \
 --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.exportPositions' \
 --header 'Accept: text/plain' \
 --header 'Content-Type: application/json' \
 --data '{ "id": "168", "method": "SerpstatDomainProcedure.exportPositions", "params": { "domain": "serpstat.com", "se": "g_us", "filters": { "position_from": 1 }, "sort": { "position": "asc" }, "page": 1, "size": 10 } }'