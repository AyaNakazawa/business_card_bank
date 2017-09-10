#!ruby
print "Content-type: text/html\n\n";

require "cgi"

objCgi = CGI.new

file = objCgi["file"]
dir = "../image/"

fileIo = open(dir + file.original_filename ,"w")
fileIo.binmode
fileIo.write(file.read)

puts 'Uploaded: ' + file.original_filename
