import MySQLdb

conn = MySQLdb.connect(
    host="neurotrade-db.c7guwwegufm.ap-northeast-2.rds.amazonaws.com",
    user="admin",
    passwd="your_password",
    db="neurotrade_db"
)

print("Connected to MySQL:", conn)
conn.close()