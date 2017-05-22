#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

objCgi = CGI.new
_query = objCgi["query"]

db = SQLite3::Database.new("../db/payday2.sqlite3")
db.execute(_query)
