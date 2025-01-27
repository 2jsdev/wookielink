SELECT
  u.id AS user_id,
  count(DISTINCT pv.id) AS views,
  count(DISTINCT li.id) AS clicks,
  CASE
    WHEN (count(DISTINCT pv.id) > 0) THEN round(
      (
        ((count(DISTINCT li.id)) :: numeric * 100.0) / (count(DISTINCT pv.id)) :: numeric
      ),
      2
    )
    ELSE (0) :: numeric
  END AS click_rate
FROM
  (
    (
      users u
      LEFT JOIN page_views pv ON ((u.id = pv."userId"))
    )
    LEFT JOIN link_interactions li ON ((u.id = li."userId"))
  )
GROUP BY
  u.id;