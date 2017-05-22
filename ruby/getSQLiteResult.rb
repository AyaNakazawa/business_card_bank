#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'
require 'json'

objCgi = CGI.new
_query = objCgi["query"] + ';'

result = {}

# データベースを開く
db = SQLite3::Database.new("../db/payday2.sqlite3")

# ハッシュで返るようにする
db.results_as_hash = true
# SQL実行
db.execute(_query) do |row|
  result[row['name']] = row
end

# JSONで返す
print result.to_json
