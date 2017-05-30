#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

objCgi = CGI.new

_type = objCgi['type'].strip

_userName = objCgi['userName'].strip
_password = objCgi['password'].strip

db = SQLite3::Database.new("../db/bcb.sqlite3")

if _type == 'delete' then
  _id = objCgi['id'].strip
  query = "DELETE FROM Card WHERE id = #{_id};"
  db.execute(query)
  puts 'delete'
  exit
  
else
  if _type == 'update' then
    _id = objCgi['id'].strip
    
  end
  _address1 = objCgi['address1'].strip
  _address2 = objCgi['address2'].strip
  _cellphone = objCgi['cellphone'].strip
  _companyName = objCgi['companyName'].strip
  _companyNameKana = objCgi['companyNameKana'].strip
  _department = objCgi['department'].strip
  _fax = objCgi['fax'].strip
  _mail = objCgi['mail'].strip
  _name = objCgi['name'].strip
  _nameKana = objCgi['nameKana'].strip
  _note = objCgi['note'].strip
  _post = objCgi['post'].strip
  _telephone = objCgi['telephone'].strip
  _registerDate = objCgi['registerDate'].strip
  _updateDate = objCgi['updateDate'].strip
  _url = objCgi['url'].strip
  _zipCode = objCgi['zipCode'].strip
end

result = ''

query = "SELECT id FROM User WHERE name = '#{_userName}' AND password = '#{_password}';"

userId = db.execute(query)

if userId.length > 0 then
  
  if _type == 'update' then
    query = "UPDATE Card SET address1 = '#{_address1}', address2 = '#{_address2}', cellphone = '#{_cellphone}', companyName = '#{_companyName}', companyNameKana = '#{_companyNameKana}', department = '#{_department}', fax = '#{_fax}', mail = '#{_mail}', name = '#{_name}', nameKana = '#{_nameKana}', note = '#{_note}', post = '#{_post}', telephone = '#{_telephone}', updateDate = '#{_updateDate}', url = '#{_url}', zipCode = '#{_zipCode}' WHERE id = #{_id};"
  elsif _type == 'add' then
    query = "INSERT INTO Card( address1, address2, cellphone, companyName, companyNameKana, department, fax, mail, name, nameKana, note, post, registerDate, telephone, updateDate, url, userId, zipCode) VALUES( '#{_address1}', '#{_address2}', '#{_cellphone}', '#{_companyName}', '#{_companyNameKana}', '#{_department}', '#{_fax}', '#{_mail}', '#{_name}', '#{_nameKana}', '#{_note}', '#{_post}', '#{_registerDate}', '#{_telephone}', '#{_updateDate}', '#{_url}', #{userId[0][0]}, '#{_zipCode}');"
  end
  
  db.execute(query)

  result = 'true'
  
end

puts result