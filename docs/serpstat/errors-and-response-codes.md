# Errors and Response Codes

This page lists all possible status codes and errors returned by Serpstat Public API. Use this reference when debugging requests or handling API responses.

---

## 400 – Bad Request

- **Query required**: The query parameter (domain, URL) was not specified.
- **SE database parameter not set**: Add `{required_se}` to your query. The SE parameter was not specified.
- **Wrong search engine**: Invalid search engine.
- **Missing token**: Query token is missing.
- **Json schema validation error**: Not a valid JSON query schema.

---

## 402 – Payment Required / Plan Limitations

- **Plan credit exceeded**: Your pricing plan has run out of credits.
- **Pricing plan credits exceeded**: Credits exhausted for the current billing period.
- **To get more than {max_sort_size}**: Use export report methods. Maximum allowable credit for sorting exceeded.

---

## 403 – Forbidden

- **Problems with authorization**: Invalid token, forbidden method or user blocked.
- **Selected SE is limited**: Search engine is not available for your account.
- **Forbidden query**: Query access denied.
- **Invalid token**: Invalid query token.
- **Invalid user**: Not a valid user.
- **Not enough credits**: Not enough credits for this query.
- **API not allowed for your plan**: This method is unavailable for your plan.
- **Method forbidden**: Access to the procedure is prohibited.
- **Not access to functional**: Invalid request method or access denied for this procedure.

---

## 404 – Not Found

- **Empty result**: No results returned.
- **Wrong API query**: Use API domain subdomain; Invalid API query.

---

## 429 – Too Many Requests

- **Query frequency exceeded**: Increase the interval between queries.
- **Too many queries**: You've exceeded the query limit.

---

## 500 – Internal Server Error

- **Undefined server error**: Something went wrong on our side.

---

## 32xxx – Custom Application-Level Errors

- **32012 – Credits exceeded**: Credits are over.
- **32018 – Wrong search engine provided**: Invalid search engine specified.
- **32016 – Large query domains not supported**: Large domains are not available for query.
- **32116 – Procedure name not allowed exact count**: Used when getting the exact number of available rows.
- **32116 – Method not supported by provider**: This method or query is not supported by the selected provider.

---

## 32015 / 32017 – No Data Found

> **Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

- **32015 – No data found for requested domain**: No info found for the specified domain.
- **32017 – No data found for requested domain**: No info found for the specified domain or the error message text can simply be "Data not found".

---

## 32117 – Filtering and Parameter Errors

- **Not allowed field: {field}**: The field for the filter is incorrect or not supported.
- **Invalid crawl date**: The date in the filter is incorrect.
- **Not allowed method {method} for field {field}**: Filtering method not supported.
- **Not allowed values for between method**: Invalid values in `between`.
- **Field compareType is required**: `compareType` filtering method not specified.
- **Field value is required**: Filter field is not set.
- **Not allowed params for filter**: Invalid filter parameters.