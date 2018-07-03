CREATE TABLE "user" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"wins" int NOT NULL DEFAULT '0',
	"losses" int NOT NULL DEFAULT '0',
	"ships_sunk" int NOT NULL DEFAULT '0',
	"accuracy" DECIMAL NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "game" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"status" char(1),
	"user_board_state" varchar,
	"comp_board_state" varchar,
	"num_turns" int NOT NULL DEFAULT '0',
	"num_hits" int NOT NULL DEFAULT '0',
	"num_ships_user_sunk" int NOT NULL DEFAULT '0',
	"num_ships_comp_sunk" int NOT NULL DEFAULT '0',
	"date_created" DATE NOT NULL,
	CONSTRAINT game_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "game" ADD CONSTRAINT "game_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

