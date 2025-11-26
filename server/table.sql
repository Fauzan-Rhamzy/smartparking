CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    sensor_name VARCHAR(50) UNIQUE NOT NULL,   -- contoh: S1, A1, B10, dll
    status VARCHAR(20) NOT NULL DEFAULT 'inactive',  -- empty | occupied | inactive
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO sensors (
sensor_name, status
) VALUES (
    'cikol', 'empty'
),(
    'soba', 'empty'
),(
    'ramboy', 'occupied'
)

select * from sensors;