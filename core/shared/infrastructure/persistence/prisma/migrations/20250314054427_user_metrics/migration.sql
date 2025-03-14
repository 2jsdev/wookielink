CREATE VIEW user_metrics AS
SELECT 
    a.user_id,
    COUNT(*) FILTER (WHERE a.type = 'View') AS views,
    COUNT(*) FILTER (WHERE a.type = 'Click') AS clicks,
    CASE 
        WHEN COUNT(*) FILTER (WHERE a.type = 'View') = 0 THEN 0
        ELSE COUNT(*) FILTER (WHERE a.type = 'Click')::FLOAT / NULLIF(COUNT(*) FILTER (WHERE a.type = 'View'), 0)
    END AS click_rate
FROM activities a
GROUP BY a.user_id;
