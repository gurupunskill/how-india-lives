# Queries 
This file holds all the queries used to make the mySQL database.  

## Data
The data is present in CSV files [here.](census-data)

## Queries

### Create the database

We have 91 columns for [pca_total](census-data/pca_total.csv) to be added to the table. They all hold integers with a maximum of 9 digits.

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

Once, the data is successfully imported, standard mySQL commands can be used to display 

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