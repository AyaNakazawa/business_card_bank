#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

objCgi = CGI.new
_id = objCgi["id"]
_password = objCgi["password"]

query = "SELECT name FROM User WHERE name = '#{_id}';"

db = SQLite3::Database.new("../db/bcb.sqlite3")

result = db.execute(query)

if result.length > 0 then
  return
end

db.execute("INSERT INTO User(name, password) VALUES('#{_id}', '#{_password}');")

puts _id
