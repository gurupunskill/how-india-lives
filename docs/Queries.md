# Queries 
This file holds all the queries used to make the mySQL database.  

## Data
The data is present in CSV files [here.](census-data)

## Create the database

### Primary Census Abstract
We have 91 columns for the [Primary Census Abstract](census-data/pca_total.csv) to be added to the table. They all hold integers with a maximum of 9 digits.

```sql
CREATE TABLE pca_full (
    State INT NOT NULL,
    District INT NOT NULL,
    Level VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    TRU VARCHAR(100) NOT NULL,
    TRU1 INT,
    No_HH INT,
    TOT_P INT,
    TOT_M INT,
    TOT_F INT,
    P_06 INT,
    M_06 INT,
    F_06 INT,
    P_SC INT,
    M_SC INT,
    F_SC INT,
    P_ST INT,
    M_ST INT,
    F_ST INT,
    P_LIT INT,
    M_LIT INT,
    F_LIT INT,
    P_ILL INT,
    M_ILL INT,
    F_ILL INT,
    TOT_WORK_P INT,
    TOT_WORK_M INT,
    TOT_WORK_F INT,
    MAINWORK_P INT,
    MAINWORK_M INT,
    MAINWORK_F INT,
    MAIN_CL_P INT,
    MAIN_CL_M INT,
    MAIN_CL_F INT,
    MAIN_AL_P INT,
    MAIN_AL_M INT,
    MAIN_AL_F INT,
    MAIN_HH_P INT,
    MAIN_HH_M INT,
    MAIN_HH_F INT,
    MAIN_OT_P INT,
    MAIN_OT_M INT,
    MAIN_OT_F INT,
    MARGWORK_P INT,
    MARGWORK_M INT,
    MARGWORK_F INT,
    MARG_CL_P INT,
    MARG_CL_M INT,
    MARG_CL_F INT,
    MARG_AL_P INT,
    MARG_AL_M INT,
    MARG_AL_F INT,
    MARG_HH_P INT,
    MARG_HH_M INT,
    MARG_HH_F INT,
    MARG_OT_P INT,
    MARG_OT_M INT,
    MARG_OT_F INT,
    MARGWORK_3_6_P INT,
    MARGWORK_3_6_M INT,
    MARGWORK_3_6_F INT,
    MARG_CL_3_6_P INT,
    MARG_CL_3_6_M INT,
    MARG_CL_3_6_F INT,
    MARG_AL_3_6_P INT,
    MARG_AL_3_6_M INT,
    MARG_AL_3_6_F INT,
    MARG_HH_3_6_P INT,
    MARG_HH_3_6_M INT,
    MARG_HH_3_6_F INT,
    MARG_OT_3_6_P INT,
    MARG_OT_3_6_M INT,
    MARG_OT_3_6_F INT,
    MARGWORK_0_3_P INT,
    MARGWORK_0_3_M INT,
    MARGWORK_0_3_F INT,
    MARG_CL_0_3_P INT,
    MARG_CL_0_3_M INT,
    MARG_CL_0_3_F INT,
    MARG_AL_0_3_P INT,
    MARG_AL_0_3_M INT,
    MARG_AL_0_3_F INT,
    MARG_HH_0_3_P INT,
    MARG_HH_0_3_M INT,
    MARG_HH_0_3_F INT,
    MARG_OT_0_3_P INT,
    MARG_OT_0_3_M INT,
    MARG_OT_0_3_F INT,
    NON_WORK_P INT,
    NON_WORK_M INT,
    NON_WORK_F INT,
    PRIMARY KEY (State, District)
);
```

To load the csv file into the database, we used [mysqlimport](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html). mysqlimport is a data import program provided by the mysql client. 

```bash
> mysqlimport --ignore-lines=1 --fields-terminated-by=, --local -u gurupunskill -p HIL pca_full.csv

Enter password: 
HIL.pca_total: Records: 640  Deleted: 0  Skipped: 0  Warnings: 0
```

Once the data is successfully imported, standard mySQL queries can be executed.

```sql

mysql> select STATE, DISTRICT, Name, TOT_P, TOT_M, TOT_F from pca_full where TRU='Total' LIMIT 10 ;
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

mysql> select STATE, DISTRICT, Name, TOT_P, TOT_M, TOT_F from pca_total where NAME='Chennai' AND TRU='Total';
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
CREATE TABLE hlpca_full (
    State_Code INT NOT NULL,
    State_Name VARCHAR(100) NOT NULL,
    District_Code INT NOT NULL,
    District_Name VARCHAR(100) NOT NULL,
    Tehsil_Code INT,
    Tehsil_Name VARCHAR(100),
    Town_Code_or_Village_code VARCHAR(100),
    Ward_No INT,
    Area_Name VARCHAR(100),
    Rural_or_Urban VARCHAR(100),
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
> mysqlimport --ignore-lines=1 --fields-terminated-by=, --local -u gurupunskill -p HIL hlpca_full.csv
```

As per our, ER Diagram, we have a State table as well. Which maps all the `SID` to the `State Names`. We made the State table using the following queries.

```sql
mysql> CREATE TABLE State (
    -> SID INT,
    -> NAME VARCHAR(100),
    -> PRIMARY KEY (SID)
    -> );
Query OK, 0 rows affected (0.33 sec)

mysql> INSERT INTO State (SID, Name) SELECT DISTINCT State_Code, State_Name FROM hlpca_full;
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
mysql> ALTER TABLE hlpca_full DROP State_Name;
Query OK, 0 rows affected (3.64 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE hlpca_full DROP District_Name;
Query OK, 0 rows affected (3.87 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE pca_full DROP Level;
Query OK, 0 rows affected (2.34 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE hlpca_full DROP COLUMN State_Code;
Query OK, 0 rows affected (3.91 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> ALTER TABLE pca_full ADD FOREIGN KEY (State) REFERENCES State(SID);
Query OK, 640 rows affected (1.78 sec)

```