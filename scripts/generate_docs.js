const { exec } = require('child_process');
const fs = require('fs');

// Database connection details
const dbConfig = {
  host: process.env.SUPABASE_HOST,
  database: process.env.SUPABASE_DB,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
};

// SQL query to generate documentation
const sqlQuery = `
WITH table_docs AS (
  SELECT 
    'Table: ' || c.relname || E'\n' ||
    'Columns:\\n' || 
    (SELECT string_agg(
        '  - ' || a.attname || ' (' || 
        pg_catalog.format_type(a.atttypid, a.atttypmod) || ') ' ||
        CASE WHEN a.attnotnull THEN 'NOT NULL' ELSE '' END, E'\n'
     ) 
     FROM pg_catalog.pg_attribute a 
     WHERE a.attnum > 0 AND a.attrelid = c.oid
    ) || E'\n\n' as definition
  FROM pg_catalog.pg_class c
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relkind = 'r' AND n.nspname = 'public'
),
policy_docs AS (
  SELECT
    'Policy: ' || polname || E'\n' ||
    'ON ' || relname || E'\n' ||
    'USING: ' || pg_get_expr(polqual, polrelid) || E'\n' ||
    'WITH CHECK: ' || pg_get_expr(polwithcheck, polrelid) || E'\n\n' as policies
  FROM pg_policy
  JOIN pg_class ON pg_class.oid = pg_policy.polrelid
),
foreign_keys AS (
  SELECT
    'Constraint: ' || conname || E'\n' ||
    'Type: ' || contype::text || E'\n' ||
    'From: ' || conrelid::regclass || '(' || 
    (SELECT array_agg(attname) 
     FROM pg_attribute 
     WHERE attrelid = conrelid AND attnum = ANY(conkey)) || ')\\n' ||
    'To: ' || confrelid::regclass || '(' || 
    (SELECT array_agg(attname) 
     FROM pg_attribute 
     WHERE attrelid = confrelid AND attnum = ANY(confkey)) || ')\\n\\n' as fk_info
  FROM pg_constraint
  WHERE contype = 'f'
)
SELECT 
  '-- TABLES --\\n' || 
  (SELECT string_agg(definition, '') FROM table_docs) ||
  '\\n-- POLICIES --\\n' || 
  (SELECT string_agg(policies, '') FROM policy_docs) ||
  '\\n-- FOREIGN KEYS --\\n' || 
  (SELECT string_agg(fk_info, '') FROM foreign_keys) 
AS project_documentation;
`;

// Execute the SQL query using psql
exec(`psql postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database} -c "${sqlQuery}"`, (err, stdout, stderr) => {
  if (err) {
    console.error('Error generating documentation:', stderr);
    return;
  }

  // Save the output to a markdown file
  fs.writeFileSync('database_docs.md', stdout);
  console.log('Documentation generated successfully!');
});