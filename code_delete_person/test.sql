INSERT INTO persons (
    id,
    workspace_id,
    first_name,
    last_name,
    name,
    email,
    country_code,
    phone,
    lifetime_value,
    stage
)
VALUES (
    '52345678-1234-1234-1234-123456789abc',
    '28765432-1234-1234-1234-123456789abc',
    'John',
    'Doe',
    'John Doe',
    'john.doe@example.com',
    '1',
    '1234567890',
    1000,
    'lead'
);

INSERT INTO visitors (person_id, user_agent, ip_address, country_code, device, workspace_id)
VALUES
  ('52345678-1234-1234-1234-123456789abc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.1', 'US', 'Macintosh', '28765432-1234-1234-1234-123456789abc'),
  ('52345678-1234-1234-1234-123456789abc', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36', '192.168.0.2', 'US', 'Windows', '28765432-1234-1234-1234-123456789abc'),
  ('52345678-1234-1234-1234-123456789abc', 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Mobile Safari/537.36', '192.168.0.3', 'US', 'Android', '28765432-1234-1234-1234-123456789abc');
