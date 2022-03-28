package db

import (
	"fmt"

	"github.com/Backend-UdonMeet/utils"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
)

var db *sqlx.DB
var err error

func Start() {
	var dbConfig map[string]string
	dbConfig, _ = godotenv.Read()

	mysqlCredentials := fmt.Sprintf(
		"%s:%s@%s(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbConfig["MYSQL_USER"],
		dbConfig["MYSQL_PASSWORD"],
		dbConfig["MYSQL_PROTOCOL"],
		dbConfig["MYSQL_HOST"],
		dbConfig["MYSQL_PORT"],
		dbConfig["MYSQL_DBNAME"],
	)
	db, err = sqlx.Connect("mysql", mysqlCredentials)
	utils.HandlePanic(err)
}

func GetDB() *sqlx.DB {
	return db
}

func CloseDB() {
	db.Close()
}
