#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'
require 'json'

objCgi = CGI.new
_id = objCgi["id"]
_password = objCgi["password"]

result = {}

db = SQLite3::Database.new("../db/bcb.sqlite3")

query = "SELECT id FROM User WHERE name = '#{_id}' AND password = '#{_password}';"

userId = db.execute(query)

if userId.length == 0 then
  exit!
end

query = "SELECT * FROM Card WHERE userId = #{userId};"

db.results_as_hash = true
db.execute(query) do |row|
  result[row['id']] = row
end

puts result.to_json
