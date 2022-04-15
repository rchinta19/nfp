# -*- coding: utf-8 -*-
"""
Created on Thu Feb 17 11:03:48 2022

@author: AppsTekN16
"""

import sqlite3
from datetime import datetime
from threading import Timer

## to run the function at everyday 1:00 am
#x=datetime.today()
#y=x.replace(day=x.day+1, hour=17, minute=0, second=0, microsecond=0)
#delta_t=y-x
#
#secs=delta_t.seconds+1

db_path="E:/Bhavika/NFPC/DB_transition/MyDatabase.sqlite"

conn = sqlite3.connect(db_path)

if conn is not None:
    data=[]
    split_data=[]
    split_data1=[]
    img_name='cam1-NG-2 08-09-2021 14-17'
    
    print ("Opened database successfully")
    cur = conn.cursor()
    cur.execute("""Select * from log_defective""")
    all_data = cur.fetchall()
    print(all_data)
    sno=1
    cur.execute("CREATE TABLE IF NOT EXISTS Defect_Log(SNO INTEGER PRIMARY KEY,Time_Stamp TEXT, Defect TEXT , Defect_Type TEXT , Image TEXT , Score1 INTEGER , Mark_False_Positive INTEGER )")
    for single_data in all_data:
        print("sno-------------",sno)
        final_data=[]
#        print((single_data[0]))
#        print(single_data[1])
#        print(single_data[2])
        data=[x for x in single_data[2].split("#") if x != ""]
#        print("data",data)
        
        for i in data:
            
            final_data=[]
#            print(i)
            split_data=[x for x in i.split("~") if x != ""]
#            print(split_data)
            for j in split_data:
                split_data1=[x for x in j.split(",") if x != ""]
    #            print(split_data1)
                final_data.extend(split_data1)
            print("final-----",final_data)
            mark_FP=0
            defect_type='others'
            if not final_data:
                print("list is empty")
            elif final_data[1]!='0' :
                cur.execute("INSERT OR REPLACE INTO Defect_Log (SNO,Time_Stamp, Defect,Defect_Type,Image,Score1, Mark_False_Positive) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (sno,single_data[0],final_data[5],defect_type,img_name,int(final_data[6]),mark_FP))
                conn.commit()
            else:
                pass
            sno=sno+1
cur.execute("""Select * from Defect_Log""")
all_data = cur.fetchall()
print(len(all_data))
