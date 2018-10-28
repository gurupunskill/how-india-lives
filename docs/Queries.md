# Queries 
This file holds all the queries used to make the mySQL database.  

## Data
The data is present in CSV files [here.](census-data)

## Create the database

### Primary Census Abstract
We have 91 columns for the [Primary Census Abstract](census-data/pca_total.csv) to be added to the table. They all hold integers with a maximum of 9 digits.

```sql
CREATE TABLE pca_total (
    State INT NOT NULL,
    District INT NOT NULL,
    Level VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    TRU VARCHAR(100) NOT NULL,
    TRU1 INT NOT NULL,
    No_HH INT NOT NULL,
    TOT_P INT NOT NULL,
    TOT_M INT NOT NULL,
    TOT_F INT NOT NULL,
    P_06 INT NOT NULL,
    M_06 INT NOT NULL,
    F_06 INT NOT NULL,
    P_SC INT NOT NULL,
    M_SC INT NOT NULL,
    F_SC INT NOT NULL,
    P_ST INT NOT NULL,
    M_ST INT NOT NULL,
    F_ST INT NOT NULL,
    P_LIT INT NOT NULL,
    M_LIT INT NOT NULL,
    F_LIT INT NOT NULL,
    P_ILL INT NOT NULL,
    M_ILL INT NOT NULL,
    F_ILL INT NOT NULL,
    TOT_WORK_P INT NOT NULL,
    TOT_WORK_M INT NOT NULL,
    TOT_WORK_F INT NOT NULL,
    MAINWORK_P INT NOT NULL,
    MAINWORK_M INT NOT NULL,
    MAINWORK_F INT NOT NULL,
    MAIN_CL_P INT NOT NULL,
    MAIN_CL_M INT NOT NULL,
    MAIN_CL_F INT NOT NULL,
    MAIN_AL_P INT NOT NULL,
    MAIN_AL_M INT NOT NULL,
    MAIN_AL_F INT NOT NULL,
    MAIN_HH_P INT NOT NULL,
    MAIN_HH_M INT NOT NULL,
    MAIN_HH_F INT NOT NULL,
    MAIN_OT_P INT NOT NULL,
    MAIN_OT_M INT NOT NULL,
    MAIN_OT_F INT NOT NULL,
    MARGWORK_P INT NOT NULL,
    MARGWORK_M INT NOT NULL,
    MARGWORK_F INT NOT NULL,
    MARG_CL_P INT NOT NULL,
    MARG_CL_M INT NOT NULL,
    MARG_CL_F INT NOT NULL,
    MARG_AL_P INT NOT NULL,
    MARG_AL_M INT NOT NULL,
    MARG_AL_F INT NOT NULL,
    MARG_HH_P INT NOT NULL,
    MARG_HH_M INT NOT NULL,
    MARG_HH_F INT NOT NULL,
    MARG_OT_P INT NOT NULL,
    MARG_OT_M INT NOT NULL,
    MARG_OT_F INT NOT NULL,
    MARGWORK_3_6_P INT NOT NULL,
    MARGWORK_3_6_M INT NOT NULL,
    MARGWORK_3_6_F INT NOT NULL,
    MARG_CL_3_6_P INT NOT NULL,
    MARG_CL_3_6_M INT NOT NULL,
    MARG_CL_3_6_F INT NOT NULL,
    MARG_AL_3_6_P INT NOT NULL,
    MARG_AL_3_6_M INT NOT NULL,
    MARG_AL_3_6_F INT NOT NULL,
    MARG_HH_3_6_P INT NOT NULL,
    MARG_HH_3_6_M INT NOT NULL,
    MARG_HH_3_6_F INT NOT NULL,
    MARG_OT_3_6_P INT NOT NULL,
    MARG_OT_3_6_M INT NOT NULL,
    MARG_OT_3_6_F INT NOT NULL,
    MARGWORK_0_3_P INT NOT NULL,
    MARGWORK_0_3_M INT NOT NULL,
    MARGWORK_0_3_F INT NOT NULL,
    MARG_CL_0_3_P INT NOT NULL,
    MARG_CL_0_3_M INT NOT NULL,
    MARG_CL_0_3_F INT NOT NULL,
    MARG_AL_0_3_P INT NOT NULL,
    MARG_AL_0_3_M INT NOT NULL,
    MARG_AL_0_3_F INT NOT NULL,
    MARG_HH_0_3_P INT NOT NULL,
    MARG_HH_0_3_M INT NOT NULL,
    MARG_HH_0_3_F INT NOT NULL,
    MARG_OT_0_3_P INT NOT NULL,
    MARG_OT_0_3_M INT NOT NULL,
    MARG_OT_0_3_F INT NOT NULL,
    NON_WORK_P INT NOT NULL,
    NON_WORK_M INT NOT NULL,
    NON_WORK_F INT NOT NULL,
    PRIMARY KEY (State, District)
);
```

To load the csv file into the database, we used [mysqlimport](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html). mysqlimport is a data import program provided by the mysql client. 

```bash
> mysqlimport --ignore-lines=1 --fields-terminated-by=, --local -u gurupunskill -p HIL pca_total.csv

Enter password: 
HIL.pca_total: Records: 640  Deleted: 0  Skipped: 0  Warnings: 0
```

Once the data is successfully imported, standard mySQL queries can be executed.

```sql

mysql> select STATE, DISTRICT, Name, TOT_P, TOT_M, TOT_F from pca_total LIMIT 10;
+-------+----------+-------------+---------+--------+--------+
| STATE | DISTRICT | Name        | TOT_P   | TOT_M  | TOT_F  |
+-------+----------+-------------+---------+--------+--------+
|     1 |        1 | Kupwara     |  870354 | 474190 | 396164 |
|     1 |        2 | Badgam      |  753745 | 398041 | 355704 |
|     1 |        3 | Leh(Ladakh) |  133487 |  78971 |  54516 |
|     1 |        4 | Kargil      |  140802 |  77785 |  63017 |
|     1 |        5 | Punch       |  476835 | 251899 | 224936 |
|     1 |        6 | Rajouri     |  642415 | 345351 | 297064 |
|     1 |        7 | Kathua      |  616435 | 326109 | 290326 |
|     1 |        8 | Baramula    | 1008039 | 534733 | 473306 |
|     1 |        9 | Bandipore   |  392232 | 207680 | 184552 |
|     1 |       10 | Srinagar    | 1236829 | 651124 | 585705 |
+-------+----------+-------------+---------+--------+--------+
10 rows in set (0.00 sec)

mysql> select STATE, DISTRICT, Name, TOT_P, TOT_M, TOT_F from pca_total where NAME='Chennai';
+-------+----------+---------+---------+---------+---------+
| STATE | DISTRICT | Name    | TOT_P   | TOT_M   | TOT_F   |
+-------+----------+---------+---------+---------+---------+
|    33 |      603 | Chennai | 4646732 | 2335844 | 2310888 |
+-------+----------+---------+---------+---------+---------+
1 row in set (0.00 sec)
```

The [Houselisting Primary Census Abstract](census-data/hlpca-total) has 156 Attributes.  
We created the table using the following query.  

```sql
CREATE TABLE hlpca_total (
    State_Code INT NOT NULL,
    State_Name VARCHAR(100) NOT NULL,
    District_Code INT NOT NULL,
    District_Name VARCHAR(100) NOT NULL,
    Tehsil_Code INT NOT NULL,
    Tehsil_Name VARCHAR(100) NOT NULL,
    Town_Code_or_Village_code VARCHAR(100) NOT NULL,
    Ward_No INT NOT NULL,
    Area_Name VARCHAR(100) NOT NULL,
    Rural_or_Urban VARCHAR(100) NOT NULL,
    Total_Number_of_households FLOAT,
    Total_Number_of_Good FLOAT,
    Total_Number_of_Livable FLOAT,
    Total_Number_of_Dilapidated FLOAT,
    Total_Number_of_Residence_households FLOAT,
    Total_Number_of_Residence_Good FLOAT,
    Total_Number_of_Residence_Livable FLOAT,
    Total_Number_of_Residence_Dilapidated FLOAT,
    Total_Number_of_Residence_cum_other FLOAT,
    Number_of_Residence_cum_Good FLOAT,
    Residence_cum_Livable FLOAT,
    Residence_cum_Dilapidated FLOAT,
    Material_Roof_GTBW FLOAT,
    Material_Roof_PP FLOAT,
    Material_Roof_HMT FLOAT,
    Material_Roof_MMT FLOAT,
    Material_Roof_BB FLOAT,
    Material_Roof_SS FLOAT,
    Material_Roof_GMAS FLOAT,
    Material_Roof_Concrete FLOAT,
    Material_Roof_AOM FLOAT,
    Material_Roof_GTB FLOAT,
    Material_Roof_PP1 FLOAT,
    Material_Roof_MUB FLOAT,
    Material_Roof_Wood FLOAT,
    Material_Wall_SNPWM FLOAT,
    Material_Wall_SPWM FLOAT,
    Material_Wall_GIMAS FLOAT,
    Material_Wall_Bb FLOAT,
    Material_Wall_Concrete FLOAT,
    Material_Wall_AOM FLOAT,
    Material_Floor_Mud FLOAT,
    Material_Floor_WB FLOAT,
    Material_Floor_BB FLOAT,
    Material_Floor_Stone FLOAT,
    Material_Floor_Cement FLOAT,
    Material_Floor_MF FLOAT,
    Material_Floor_AOM FLOAT,
    Dwelling_R_NER FLOAT,
    Dwelling_R_OR FLOAT,
    Dwelling_R_TR FLOAT,
    Dwelling_R_TH_R FLOAT,
    Dwelling_R_FR FLOAT,
    Dwelling_R_FI_R FLOAT,
    Dwelling_R_SRA FLOAT,
    H_size_1 FLOAT,
    H_size_2 FLOAT,
    H_size_3 FLOAT,
    H_size_4 FLOAT,
    H_size_5 FLOAT,
    H_size_6_8 FLOAT,
    H_size_9 FLOAT,
    O_status_O FLOAT,
    O_status_R FLOAT,
    O_status_AO FLOAT,
    Married_C_N FLOAT,
    Married_C_1 FLOAT,
    Married_C_2 FLOAT,
    Married_C_3 FLOAT,
    Married_C_4 FLOAT,
    Married_C_5 FLOAT,
    DW_TFTS FLOAT,
    DW_TFUS FLOAT,
    DW_CW FLOAT,
    DW_UW FLOAT,
    DW_Handpump FLOAT,
    DW_TB FLOAT,
    DW_Spring FLOAT,
    DW_RC FLOAT,
    DW_TPL FLOAT,
    DW_OS FLOAT,
    Within_premises FLOAT,
    Near_premises FLOAT,
    Away FLOAT,
    MSL_Electricty FLOAT,
    MSL_Kerosene FLOAT,
    MSL_SE FLOAT,
    MSL_OO FLOAT,
    MSL_AO FLOAT,
    MSL_NL FLOAT,
    Latrine_premise FLOAT,
    Latrine_PSS FLOAT,
    Latrine_ST FLOAT,
    Latrine_OS FLOAT,
    Pit_latrine_SVI FLOAT,
    Pit_latrine_SOP FLOAT,
    disposed_drain FLOAT,
    Service_Latrine_NRH FLOAT,
    Service_Latrine_NSA FLOAT,
    H_latrine_premoses FLOAT,
    Alternative_Source FLOAT,
    Alternative_Source_Open FLOAT,
    Households_Bathroom FLOAT,
    Households_EWR FLOAT,
    Households_No FLOAT,
    Waste_water_CD FLOAT,
    Waste_water_OD FLOAT,
    Waste_water_ND FLOAT,
    Cooking_FW FLOAT,
    Cooking_CR FLOAT,
    Cooking_CC FLOAT,
    Cooking_CLC FLOAT,
    Cooking_kerosene FLOAT,
    Cooking_LPG_PNG FLOAT,
    Cooking_Electricity FLOAT,
    Cooking_Biogas FLOAT,
    Cooking_AO FLOAT,
    Cooking_NC FLOAT,
    Total FLOAT,
    Cooking_IH FLOAT,
    Has_kitchen FLOAT,
    DNHK FLOAT,
    Cooking_OH FLOAT,
    has_kitchen1 FLOAT,
    DNH_Kitchen FLOAT,
    No_Cooking FLOAT,
    TNHAB FLOAT,
    assets_RT FLOAT,
    assets_Tel FLOAT,
    assets_CL_WI FLOAT,
    assets_CLWI FLOAT,
    assets_TM_LO FLOAT,
    assets_TM_MO FLOAT,
    assets_TM_Both FLOAT,
    assets_Bicycle FLOAT,
    assets_SMM FLOAT,
    assets_CJV FLOAT,
    Household_TV_LP FLOAT,
    None_AS FLOAT,
    Permanents FLOAT,
    Semi_Permanent FLOAT,
    Total_Temporary FLOAT,
    Serviceable FLOAT,
    Non_Serviceable FLOAT,
    Unclassifiable FLOAT,
    TC_VC FLOAT,
    Contition_T_Total FLOAT,
    Contition_T_Good FLOAT,
    Contition_T_Livable FLOAT,
    Contition_T_Dilapidated FLOAT,
    Contition_R_Total FLOAT,
    Residence_Good FLOAT,
    Residence_Livable FLOAT,
    Residence_Dilapidated FLOAT,
    Residence_cum_other FLOAT,
    Residence_cum_Good FLOAT,
    PRIMARY KEY (State_Code, District_Code)
);
```

We then imported the csv using the same commands as before.  
```bash
> mysqlimport --ignore-lines=1 --fields-terminated-by=, --local -u gurupunskill -p HIL hlpca_total.csv
```

As per our, ER Diagram, we have a State table as well. Which maps all the `SID` to the `State Names`. We made the State table using the following queries.

```sql
mysql> CREATE TABLE State (
    -> SID INT NOT NULL,
    -> NAME VARCHAR(100) NOT NULL,
    -> PRIMARY KEY (SID)
    -> );
Query OK, 0 rows affected (0.33 sec)

mysql> INSERT INTO State (SID, Name) SELECT DISTINCT State_Code, State_Name FROM hlpca_total;
Query OK, 35 rows affected (0.10 sec)
Records: 35  Duplicates: 0  Warnings: 0

mysql> select * from State;
+-----+---------------------------+
| SID | NAME                      |
+-----+---------------------------+
|   1 | JAMMU & KASHMIR           |
|   2 | HIMACHAL PRADESH          |
|   3 | PUNJAB                    |
|   4 | CHANDIGARH                |
|   5 | UTTARAKHAND               |
|   6 | HARYANA                   |
|   7 | NCT OF DELHI              |
|   8 | RAJASTHAN                 |
|   9 | UTTAR PRADESH             |
|  10 | BIHAR                     |
|  11 | SIKKIM                    |
|  12 | ARUNACHAL PRADESH         |
|  13 | NAGALAND                  |
|  14 | MANIPUR                   |
|  15 | MIZORAM                   |
|  16 | TRIPURA                   |
|  17 | MEGHALAYA                 |
|  18 | ASSAM                     |
|  19 | WEST BENGAL               |
|  20 | JHARKHAND                 |
|  21 | ODISHA                    |
|  22 | CHHATTISGARH              |
|  23 | MADHYA PRADESH            |
|  24 | GUJARAT                   |
|  25 | DAMAN & DIU               |
|  26 | DADRA & NAGAR HAVELI      |
|  27 | MAHARASHTRA               |
|  28 | ANDHRA PRADESH            |
|  29 | KARNATAKA                 |
|  30 | GOA                       |
|  31 | LAKSHADWEEP               |
|  32 | KERALA                    |
|  33 | TAMIL NADU                |
|  34 | PUDUCHERRY                |
|  35 | ANDAMAN & NICOBAR ISLANDS |
+-----+---------------------------+
35 rows in set (0.00 sec)
```

We then removed redundant columns from the other tables and added foreign key constraints.  

```sql
mysql> ALTER TABLE hlpca_total DROP State_Name;
Query OK, 0 rows affected (3.64 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE hlpca_total DROP District_Name;
Query OK, 0 rows affected (3.87 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE pca_total DROP Level;
Query OK, 0 rows affected (2.34 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE hlpca_total DROP COLUMN State_Code;
Query OK, 0 rows affected (3.91 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE pca_total ADD FOREIGN KEY (State) REFERENCES State(SID);
Query OK, 640 rows affected (1.78 sec)

```



mysql> delete from state;
ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (`heroku_7d8b3caef3dcfea`.`pca_total`, CONSTRAINT `pca_total_ibfk_1` FOREIGN KEY (`State`) REFERENCES `state` (`SID`))

mysql> show create table pca_total;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100575712
Current database: heroku_7d8b3caef3dcfea

+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| pca_total | CREATE TABLE `pca_total` (
  `State` int(11) NOT NULL,
  `District` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `TRU` varchar(100) NOT NULL,
  `TRU1` int(11) NOT NULL,
  `No_HH` int(11) NOT NULL,
  `TOT_P` int(11) NOT NULL,
  `TOT_M` int(11) NOT NULL,
  `TOT_F` int(11) NOT NULL,
  `P_06` int(11) NOT NULL,
  `M_06` int(11) NOT NULL,
  `F_06` int(11) NOT NULL,
  `P_SC` int(11) NOT NULL,
  `M_SC` int(11) NOT NULL,
  `F_SC` int(11) NOT NULL,
  `P_ST` int(11) NOT NULL,
  `M_ST` int(11) NOT NULL,
  `F_ST` int(11) NOT NULL,
  `P_LIT` int(11) NOT NULL,
  `M_LIT` int(11) NOT NULL,
  `F_LIT` int(11) NOT NULL,
  `P_ILL` int(11) NOT NULL,
  `M_ILL` int(11) NOT NULL,
  `F_ILL` int(11) NOT NULL,
  `TOT_WORK_P` int(11) NOT NULL,
  `TOT_WORK_M` int(11) NOT NULL,
  `TOT_WORK_F` int(11) NOT NULL,
  `MAINWORK_P` int(11) NOT NULL,
  `MAINWORK_M` int(11) NOT NULL,
  `MAINWORK_F` int(11) NOT NULL,
  `MAIN_CL_P` int(11) NOT NULL,
  `MAIN_CL_M` int(11) NOT NULL,
  `MAIN_CL_F` int(11) NOT NULL,
  `MAIN_AL_P` int(11) NOT NULL,
  `MAIN_AL_M` int(11) NOT NULL,
  `MAIN_AL_F` int(11) NOT NULL,
  `MAIN_HH_P` int(11) NOT NULL,
  `MAIN_HH_M` int(11) NOT NULL,
  `MAIN_HH_F` int(11) NOT NULL,
  `MAIN_OT_P` int(11) NOT NULL,
  `MAIN_OT_M` int(11) NOT NULL,
  `MAIN_OT_F` int(11) NOT NULL,
  `MARGWORK_P` int(11) NOT NULL,
  `MARGWORK_M` int(11) NOT NULL,
  `MARGWORK_F` int(11) NOT NULL,
  `MARG_CL_P` int(11) NOT NULL,
  `MARG_CL_M` int(11) NOT NULL,
  `MARG_CL_F` int(11) NOT NULL,
  `MARG_AL_P` int(11) NOT NULL,
  `MARG_AL_M` int(11) NOT NULL,
  `MARG_AL_F` int(11) NOT NULL,
  `MARG_HH_P` int(11) NOT NULL,
  `MARG_HH_M` int(11) NOT NULL,
  `MARG_HH_F` int(11) NOT NULL,
  `MARG_OT_P` int(11) NOT NULL,
  `MARG_OT_M` int(11) NOT NULL,
  `MARG_OT_F` int(11) NOT NULL,
  `MARGWORK_3_6_P` int(11) NOT NULL,
  `MARGWORK_3_6_M` int(11) NOT NULL,
  `MARGWORK_3_6_F` int(11) NOT NULL,
  `MARG_CL_3_6_P` int(11) NOT NULL,
  `MARG_CL_3_6_M` int(11) NOT NULL,
  `MARG_CL_3_6_F` int(11) NOT NULL,
  `MARG_AL_3_6_P` int(11) NOT NULL,
  `MARG_AL_3_6_M` int(11) NOT NULL,
  `MARG_AL_3_6_F` int(11) NOT NULL,
  `MARG_HH_3_6_P` int(11) NOT NULL,
  `MARG_HH_3_6_M` int(11) NOT NULL,
  `MARG_HH_3_6_F` int(11) NOT NULL,
  `MARG_OT_3_6_P` int(11) NOT NULL,
  `MARG_OT_3_6_M` int(11) NOT NULL,
  `MARG_OT_3_6_F` int(11) NOT NULL,
  `MARGWORK_0_3_P` int(11) NOT NULL,
  `MARGWORK_0_3_M` int(11) NOT NULL,
  `MARGWORK_0_3_F` int(11) NOT NULL,
  `MARG_CL_0_3_P` int(11) NOT NULL,
  `MARG_CL_0_3_M` int(11) NOT NULL,
  `MARG_CL_0_3_F` int(11) NOT NULL,
  `MARG_AL_0_3_P` int(11) NOT NULL,
  `MARG_AL_0_3_M` int(11) NOT NULL,
  `MARG_AL_0_3_F` int(11) NOT NULL,
  `MARG_HH_0_3_P` int(11) NOT NULL,
  `MARG_HH_0_3_M` int(11) NOT NULL,
  `MARG_HH_0_3_F` int(11) NOT NULL,
  `MARG_OT_0_3_P` int(11) NOT NULL,
  `MARG_OT_0_3_M` int(11) NOT NULL,
  `MARG_OT_0_3_F` int(11) NOT NULL,
  `NON_WORK_P` int(11) NOT NULL,
  `NON_WORK_M` int(11) NOT NULL,
  `NON_WORK_F` int(11) NOT NULL,
  PRIMARY KEY (`State`,`District`),
  CONSTRAINT `pca_total_ibfk_1` FOREIGN KEY (`State`) REFERENCES `state` (`SID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (5.33 sec)


mysql> ALTER TABLE pca_total DROP FOREIGN KEY pca_total_ibfk_1;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100583755
Current database: heroku_7d8b3caef3dcfea

Query OK, 640 rows affected (5.22 sec)
Records: 640  Duplicates: 0  Warnings: 0

mysql> delete from state;
Query OK, 35 rows affected (0.28 sec)

mysql> drop state;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'state' at line 1
mysql> drop table state;
Query OK, 0 rows affected (0.28 sec)

mysql> create table state( SID INT PRIMARY KEY, Tot_P INT, Tot_Sc INT, Tot_St INT, Tot_Lit INT, Tot_Ill INT, Tot_Work INT, Tot_NWork INT, Tot_AL INT);
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100587685
Current database: heroku_7d8b3caef3dcfea

Query OK, 0 rows affected (5.03 sec)

mysql> insert into state  select state,sum(TOT_P),sum(P_SC),sum(P_ST),sum(P_LIT),sum(P_ILL),sum(TOT_WORK_P),sum(NON_WORK_P),sum(MAIN_AL_P) from pca_total group by state;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100591102
Current database: heroku_7d8b3caef3dcfea

Query OK, 35 rows affected (10.65 sec)
Records: 35  Duplicates: 0  Warnings: 0

mysql> select * from state;
+-----+-----------+----------+----------+-----------+----------+----------+-----------+----------+
| SID | Tot_P     | Tot_Sc   | Tot_St   | Tot_Lit   | Tot_Ill  | Tot_Work | Tot_NWork | Tot_AL   |
+-----+-----------+----------+----------+-----------+----------+----------+-----------+----------+
|   1 |  12541302 |   924991 |  1493299 |   7067233 |  5474069 |  4322713 |   8218589 |   159519 |
|   2 |   6864602 |  1729252 |   392126 |   5039736 |  1824866 |  3559422 |   3305180 |    68668 |
|   3 |  27743338 |  8860179 |        0 |  18707137 |  9036201 |  9897362 |  17845976 |  1168021 |
|   4 |   1055450 |   199086 |        0 |    805438 |   250012 |   404136 |    651314 |     1396 |
|   5 |  10086292 |  1892516 |   291903 |   6880953 |  3205339 |  3872275 |   6214017 |   247256 |
|   6 |  25351462 |  5113615 |        0 |  16598988 |  8752474 |  8916508 |  16434954 |   891273 |
|   7 |  16787941 |  2812309 |        0 |  12737767 |  4050174 |  5587049 |  11200892 |    31474 |
|   8 |  68548437 | 12221593 |  9238534 |  38275282 | 30273155 | 29886255 |  38662182 |  2195304 |
|   9 | 199812341 | 41357608 |  1134273 | 114397555 | 85414786 | 65814715 | 133997626 |  9749915 |
|  10 | 104099452 | 16567325 |  1336573 |  52504553 | 51594899 | 34724987 |  69374465 |  9537418 |
|  11 |    610577 |    28275 |   206360 |    444952 |   165625 |   308138 |    302439 |    11582 |
|  12 |   1383727 |        0 |   951821 |    766005 |   617722 |   587657 |    796070 |    20259 |
|  13 |   1978502 |        0 |  1710973 |   1342434 |   636068 |   974122 |   1004380 |    22571 |
|  14 |   2855794 |    97328 |  1167422 |   1908476 |   947318 |  1304610 |   1551184 |    45609 |
|  15 |   1097206 |     1218 |  1036115 |    848175 |   249031 |   486705 |    610501 |    26464 |
|  16 |   3673917 |   654918 |  1166813 |   2804783 |   869134 |  1469521 |   2204396 |   201863 |
|  17 |   2966889 |    17355 |  2555861 |   1785005 |  1181884 |  1185619 |   1781270 |   114642 |
|  18 |  31205576 |  2231321 |  3884371 |  19177977 | 12027599 | 11969690 |  19235886 |   903294 |
|  19 |  91276115 | 21463270 |  5296953 |  61538281 | 29737834 | 34756355 |  56519760 |  5869498 |
|  20 |  32988134 |  3985644 |  8645042 |  18328069 | 14660065 | 13098274 |  19889860 |  1238774 |
|  21 |  41974218 |  7188463 |  9590756 |  26742595 | 15231623 | 17541589 |  24432629 |  2420540 |
|  22 |  25545198 |  3274269 |  7822902 |  15379922 | 10165276 | 12180225 |  13364973 |  2505999 |
|  23 |  72626809 | 11342320 | 15316784 |  42851169 | 29775640 | 31574133 |  41052676 |  6630821 |
|  24 |  60439692 |  4074447 |  8917174 |  41093358 | 19346334 | 24767747 |  35671945 |  4491751 |
|  25 |    243247 |     6124 |    15363 |    188406 |    54841 |   121271 |    121976 |      491 |
|  26 |    343709 |     6186 |   178564 |    223230 |   120479 |   157161 |    186548 |     6184 |
|  27 | 112374333 | 13275898 | 10510213 |  81554290 | 30820043 | 49427878 |  62946455 | 11068928 |
|  28 |  84580777 | 13878078 |  5918073 |  50556760 | 34024017 | 39422906 |  45157871 | 13201989 |
|  29 |  61095297 | 10474992 |  4248987 |  40647322 | 20447975 | 27872597 |  33222700 |  5119921 |
|  30 |   1458545 |    25449 |   149275 |   1165487 |   293058 |   577248 |    881297 |    10758 |
|  31 |     64473 |        0 |    61120 |     52553 |    11920 |    18753 |     45720 |        0 |
|  32 |  33406061 |  3039573 |   484839 |  28135824 |  5270237 | 11619063 |  21786998 |   919136 |
|  33 |  72147030 | 14438445 |   794697 |  51837507 | 20309523 | 32884681 |  39262349 |  7234101 |
|  34 |   1247953 |   196325 |        0 |    957309 |   290644 |   444968 |    802985 |    50607 |
|  35 |    380581 |        0 |    28530 |    294281 |    86300 |   152535 |    228046 |     2680 |
+-----+-----------+----------+----------+-----------+----------+----------+-----------+----------+
35 rows in set (0.29 sec)

mysql> alter table state add column Name VARCHAR(20) after SID;
Query OK, 35 rows affected (0.30 sec)
Records: 35  Duplicates: 0  Warnings: 0

mysql> update state set name="JAMMU & KASHMIR" where sid=1;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100595456
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (6.62 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="HIMACHAL PRADESH" where sid=2;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="PUNJAB" where sid=3;
Query OK, 1 row affected (2.44 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="CHANDIGARH" where sid=4;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set name="CHANDIGARH" where sid=4;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100597222
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (5.37 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="UTTARAKHAND" where sid=5;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="HARYANA" where sid=6;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="NCT OF DELHI" where sid=7;
Query OK, 1 row affected (0.82 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="RAJASTHAN" where sid=8;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="UTTAR PRADESH" where sid=9;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="BIHAR" where sid=10;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="SIKKIM" where sid=11;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="ARUNACHAL PRADESH" where sid=12;
Query OK, 1 row affected (16.69 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="NAGALAND" where sid=13;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="MANIPUR" where sid=14;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="MIZORAM" where sid=15;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="TRIPURA" where sid=16;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="MEGHALAYA" where sid=17;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="ASSAM" where sid=18;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="WEST BENGAL" where sid=19;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="JHARKHAND" where sid=20;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="ODISHA" where sid=21;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="CHHATTISGARH" where sid=22;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="MADHYA PRADESH" where sid=23;
Query OK, 1 row affected (0.32 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="GUJARAT" where sid=24;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="DAMAN & DIU" where sid=25;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="DADRA & NAGAR HAVELI" where sid=26;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="MAHARASHTRA" where sid=27;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="ANDHRA PRADESH" where sid=28;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="KARNATAKA" where sid=29;
Query OK, 1 row affected (1.08 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="GOA" where sid=30;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="LAKSHADWEEP" where sid=31;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="KERALA" where sid=32;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="TAMIL NADU" where sid=33;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="PUDUCHERRY" where sid=34;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set name="ANDAMAN & NICOBAR ISLANDS" where sid=35;
Query OK, 1 row affected, 1 warning (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 1

mysql> alter table state add column ISO_Code VARCHAR(8);
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100616691
Current database: heroku_7d8b3caef3dcfea

Query OK, 35 rows affected (5.96 sec)
Records: 35  Duplicates: 0  Warnings: 0

mysql> update state set ISO_Code="IN-AP" where SID=28;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100631136
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (4.64 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-AR" where SID=12;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-AR" where SID=12;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100642264
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (5.49 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-AS" where SID=18;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-AS" where SID=18;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100643353
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (6.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-BR" where SID=10;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-BR" where SID=10;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100648984
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (6.61 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-CT" where SID=22;
Query OK, 1 row affected (0.45 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-GA" where SID=30;
Query OK, 1 row affected (0.31 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-GJ" where SID=24;
Query OK, 1 row affected (0.31 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-HR" where SID=6;
Query OK, 1 row affected (0.32 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-HP" where SID=2;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-JK" where SID=1;
Query OK, 1 row affected (0.31 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-JH" where SID=20;
Query OK, 1 row affected (0.31 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-KA" where SID=29;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-KL" where SID=32;
Query OK, 1 row affected (0.31 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-MP" where SID=23;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-MP" where SID=23;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100653347
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (5.39 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-MH" where SID=27;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-MH" where SID=27;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100654773
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (6.75 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-MN" where SID=14;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-ML" where SID=17;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-MZ" where SID=15;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-NL" where SID=13;
ERROR 2013 (HY000): Lost connection to MySQL server during query
mysql> update state set ISO_Code="IN-NL" where SID=13;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    100686801
Current database: heroku_7d8b3caef3dcfea

Query OK, 1 row affected (6.80 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-OR" where SID=21;
Query OK, 1 row affected (0.30 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-PB" where SID=3;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-RJ" where SID=8;
Query OK, 1 row affected (0.79 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-SK" where SID=11;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-TN" where SID=33;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-TR" where SID=16;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-UT" where SID=5;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-UP" where SID=9;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-WB" where SID=19;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-AN" where SID=35;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-CH" where SID=4;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-DN" where SID=26;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-DD" where SID=25;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-DL" where SID=7;
Query OK, 1 row affected (0.78 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-LD" where SID=31;
Query OK, 1 row affected (0.29 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update state set ISO_Code="IN-PY" where SID=34;
Query OK, 1 row affected (0.28 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from state;
+-----+----------------------+-----------+----------+----------+-----------+----------+----------+-----------+----------+----------+
| SID | Name                 | Tot_P     | Tot_Sc   | Tot_St   | Tot_Lit   | Tot_Ill  | Tot_Work | Tot_NWork | Tot_AL   | ISO_Code |
+-----+----------------------+-----------+----------+----------+-----------+----------+----------+-----------+----------+----------+
|   1 | JAMMU & KASHMIR      |  12541302 |   924991 |  1493299 |   7067233 |  5474069 |  4322713 |   8218589 |   159519 | IN-JK    |
|   2 | HIMACHAL PRADESH     |   6864602 |  1729252 |   392126 |   5039736 |  1824866 |  3559422 |   3305180 |    68668 | IN-HP    |
|   3 | PUNJAB               |  27743338 |  8860179 |        0 |  18707137 |  9036201 |  9897362 |  17845976 |  1168021 | IN-PB    |
|   4 | CHANDIGARH           |   1055450 |   199086 |        0 |    805438 |   250012 |   404136 |    651314 |     1396 | IN-CH    |
|   5 | UTTARAKHAND          |  10086292 |  1892516 |   291903 |   6880953 |  3205339 |  3872275 |   6214017 |   247256 | IN-UT    |
|   6 | HARYANA              |  25351462 |  5113615 |        0 |  16598988 |  8752474 |  8916508 |  16434954 |   891273 | IN-HR    |
|   7 | NCT OF DELHI         |  16787941 |  2812309 |        0 |  12737767 |  4050174 |  5587049 |  11200892 |    31474 | IN-DL    |
|   8 | RAJASTHAN            |  68548437 | 12221593 |  9238534 |  38275282 | 30273155 | 29886255 |  38662182 |  2195304 | IN-RJ    |
|   9 | UTTAR PRADESH        | 199812341 | 41357608 |  1134273 | 114397555 | 85414786 | 65814715 | 133997626 |  9749915 | IN-UP    |
|  10 | BIHAR                | 104099452 | 16567325 |  1336573 |  52504553 | 51594899 | 34724987 |  69374465 |  9537418 | IN-BR    |
|  11 | SIKKIM               |    610577 |    28275 |   206360 |    444952 |   165625 |   308138 |    302439 |    11582 | IN-SK    |
|  12 | ARUNACHAL PRADESH    |   1383727 |        0 |   951821 |    766005 |   617722 |   587657 |    796070 |    20259 | IN-AR    |
|  13 | NAGALAND             |   1978502 |        0 |  1710973 |   1342434 |   636068 |   974122 |   1004380 |    22571 | IN-NL    |
|  14 | MANIPUR              |   2855794 |    97328 |  1167422 |   1908476 |   947318 |  1304610 |   1551184 |    45609 | IN-MN    |
|  15 | MIZORAM              |   1097206 |     1218 |  1036115 |    848175 |   249031 |   486705 |    610501 |    26464 | IN-MZ    |
|  16 | TRIPURA              |   3673917 |   654918 |  1166813 |   2804783 |   869134 |  1469521 |   2204396 |   201863 | IN-TR    |
|  17 | MEGHALAYA            |   2966889 |    17355 |  2555861 |   1785005 |  1181884 |  1185619 |   1781270 |   114642 | IN-ML    |
|  18 | ASSAM                |  31205576 |  2231321 |  3884371 |  19177977 | 12027599 | 11969690 |  19235886 |   903294 | IN-AS    |
|  19 | WEST BENGAL          |  91276115 | 21463270 |  5296953 |  61538281 | 29737834 | 34756355 |  56519760 |  5869498 | IN-WB    |
|  20 | JHARKHAND            |  32988134 |  3985644 |  8645042 |  18328069 | 14660065 | 13098274 |  19889860 |  1238774 | IN-JH    |
|  21 | ODISHA               |  41974218 |  7188463 |  9590756 |  26742595 | 15231623 | 17541589 |  24432629 |  2420540 | IN-OR    |
|  22 | CHHATTISGARH         |  25545198 |  3274269 |  7822902 |  15379922 | 10165276 | 12180225 |  13364973 |  2505999 | IN-CT    |
|  23 | MADHYA PRADESH       |  72626809 | 11342320 | 15316784 |  42851169 | 29775640 | 31574133 |  41052676 |  6630821 | IN-MP    |
|  24 | GUJARAT              |  60439692 |  4074447 |  8917174 |  41093358 | 19346334 | 24767747 |  35671945 |  4491751 | IN-GJ    |
|  25 | DAMAN & DIU          |    243247 |     6124 |    15363 |    188406 |    54841 |   121271 |    121976 |      491 | IN-DD    |
|  26 | DADRA & NAGAR HAVELI |    343709 |     6186 |   178564 |    223230 |   120479 |   157161 |    186548 |     6184 | IN-DN    |
|  27 | MAHARASHTRA          | 112374333 | 13275898 | 10510213 |  81554290 | 30820043 | 49427878 |  62946455 | 11068928 | IN-MH    |
|  28 | ANDHRA PRADESH       |  84580777 | 13878078 |  5918073 |  50556760 | 34024017 | 39422906 |  45157871 | 13201989 | IN-AP    |
|  29 | KARNATAKA            |  61095297 | 10474992 |  4248987 |  40647322 | 20447975 | 27872597 |  33222700 |  5119921 | IN-KA    |
|  30 | GOA                  |   1458545 |    25449 |   149275 |   1165487 |   293058 |   577248 |    881297 |    10758 | IN-GA    |
|  31 | LAKSHADWEEP          |     64473 |        0 |    61120 |     52553 |    11920 |    18753 |     45720 |        0 | IN-LD    |
|  32 | KERALA               |  33406061 |  3039573 |   484839 |  28135824 |  5270237 | 11619063 |  21786998 |   919136 | IN-KL    |
|  33 | TAMIL NADU           |  72147030 | 14438445 |   794697 |  51837507 | 20309523 | 32884681 |  39262349 |  7234101 | IN-TN    |
|  34 | PUDUCHERRY           |   1247953 |   196325 |        0 |    957309 |   290644 |   444968 |    802985 |    50607 | IN-PY    |
|  35 | ANDAMAN & NICOBAR IS |    380581 |        0 |    28530 |    294281 |    86300 |   152535 |    228046 |     2680 | IN-AN    |
+-----+----------------------+-----------+----------+----------+-----------+----------+----------+-----------+----------+----------+
35 rows in set (0.83 sec)

mysql>  ALTER TABLE pca_total ADD FOREIGN KEY (State) REFERENCES State(SID);
Query OK, 640 rows affected (0.31 sec)
Records: 640  Duplicates: 0  Warnings: 0

mysql> describe pca_total;
+----------------+--------------+------+-----+---------+-------+
| Field          | Type         | Null | Key | Default | Extra |
+----------------+--------------+------+-----+---------+-------+
| State          | int(11)      | NO   | PRI | NULL    |       |
| District       | int(11)      | NO   | PRI | NULL    |       |
| Name           | varchar(100) | NO   |     | NULL    |       |
| TRU            | varchar(100) | NO   |     | NULL    |       |
| TRU1           | int(11)      | NO   |     | NULL    |       |
| No_HH          | int(11)      | NO   |     | NULL    |       |
| TOT_P          | int(11)      | NO   |     | NULL    |       |
| TOT_M          | int(11)      | NO   |     | NULL    |       |
| TOT_F          | int(11)      | NO   |     | NULL    |       |
| P_06           | int(11)      | NO   |     | NULL    |       |
| M_06           | int(11)      | NO   |     | NULL    |       |
| F_06           | int(11)      | NO   |     | NULL    |       |
| P_SC           | int(11)      | NO   |     | NULL    |       |
| M_SC           | int(11)      | NO   |     | NULL    |       |
| F_SC           | int(11)      | NO   |     | NULL    |       |
| P_ST           | int(11)      | NO   |     | NULL    |       |
| M_ST           | int(11)      | NO   |     | NULL    |       |
| F_ST           | int(11)      | NO   |     | NULL    |       |
| P_LIT          | int(11)      | NO   |     | NULL    |       |
| M_LIT          | int(11)      | NO   |     | NULL    |       |
| F_LIT          | int(11)      | NO   |     | NULL    |       |
| P_ILL          | int(11)      | NO   |     | NULL    |       |
| M_ILL          | int(11)      | NO   |     | NULL    |       |
| F_ILL          | int(11)      | NO   |     | NULL    |       |
| TOT_WORK_P     | int(11)      | NO   |     | NULL    |       |
| TOT_WORK_M     | int(11)      | NO   |     | NULL    |       |
| TOT_WORK_F     | int(11)      | NO   |     | NULL    |       |
| MAINWORK_P     | int(11)      | NO   |     | NULL    |       |
| MAINWORK_M     | int(11)      | NO   |     | NULL    |       |
| MAINWORK_F     | int(11)      | NO   |     | NULL    |       |
| MAIN_CL_P      | int(11)      | NO   |     | NULL    |       |
| MAIN_CL_M      | int(11)      | NO   |     | NULL    |       |
| MAIN_CL_F      | int(11)      | NO   |     | NULL    |       |
| MAIN_AL_P      | int(11)      | NO   |     | NULL    |       |
| MAIN_AL_M      | int(11)      | NO   |     | NULL    |       |
| MAIN_AL_F      | int(11)      | NO   |     | NULL    |       |
| MAIN_HH_P      | int(11)      | NO   |     | NULL    |       |
| MAIN_HH_M      | int(11)      | NO   |     | NULL    |       |
| MAIN_HH_F      | int(11)      | NO   |     | NULL    |       |
| MAIN_OT_P      | int(11)      | NO   |     | NULL    |       |
| MAIN_OT_M      | int(11)      | NO   |     | NULL    |       |
| MAIN_OT_F      | int(11)      | NO   |     | NULL    |       |
| MARGWORK_P     | int(11)      | NO   |     | NULL    |       |
| MARGWORK_M     | int(11)      | NO   |     | NULL    |       |
| MARGWORK_F     | int(11)      | NO   |     | NULL    |       |
| MARG_CL_P      | int(11)      | NO   |     | NULL    |       |
| MARG_CL_M      | int(11)      | NO   |     | NULL    |       |
| MARG_CL_F      | int(11)      | NO   |     | NULL    |       |
| MARG_AL_P      | int(11)      | NO   |     | NULL    |       |
| MARG_AL_M      | int(11)      | NO   |     | NULL    |       |
| MARG_AL_F      | int(11)      | NO   |     | NULL    |       |
| MARG_HH_P      | int(11)      | NO   |     | NULL    |       |
| MARG_HH_M      | int(11)      | NO   |     | NULL    |       |
| MARG_HH_F      | int(11)      | NO   |     | NULL    |       |
| MARG_OT_P      | int(11)      | NO   |     | NULL    |       |
| MARG_OT_M      | int(11)      | NO   |     | NULL    |       |
| MARG_OT_F      | int(11)      | NO   |     | NULL    |       |
| MARGWORK_3_6_P | int(11)      | NO   |     | NULL    |       |
| MARGWORK_3_6_M | int(11)      | NO   |     | NULL    |       |
| MARGWORK_3_6_F | int(11)      | NO   |     | NULL    |       |
| MARG_CL_3_6_P  | int(11)      | NO   |     | NULL    |       |
| MARG_CL_3_6_M  | int(11)      | NO   |     | NULL    |       |
| MARG_CL_3_6_F  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_3_6_P  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_3_6_M  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_3_6_F  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_3_6_P  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_3_6_M  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_3_6_F  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_3_6_P  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_3_6_M  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_3_6_F  | int(11)      | NO   |     | NULL    |       |
| MARGWORK_0_3_P | int(11)      | NO   |     | NULL    |       |
| MARGWORK_0_3_M | int(11)      | NO   |     | NULL    |       |
| MARGWORK_0_3_F | int(11)      | NO   |     | NULL    |       |
| MARG_CL_0_3_P  | int(11)      | NO   |     | NULL    |       |
| MARG_CL_0_3_M  | int(11)      | NO   |     | NULL    |       |
| MARG_CL_0_3_F  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_0_3_P  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_0_3_M  | int(11)      | NO   |     | NULL    |       |
| MARG_AL_0_3_F  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_0_3_P  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_0_3_M  | int(11)      | NO   |     | NULL    |       |
| MARG_HH_0_3_F  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_0_3_P  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_0_3_M  | int(11)      | NO   |     | NULL    |       |
| MARG_OT_0_3_F  | int(11)      | NO   |     | NULL    |       |
| NON_WORK_P     | int(11)      | NO   |     | NULL    |       |
| NON_WORK_M     | int(11)      | NO   |     | NULL    |       |
| NON_WORK_F     | int(11)      | NO   |     | NULL    |       |
+----------------+--------------+------+-----+---------+-------+
90 rows in set (0.29 sec)




