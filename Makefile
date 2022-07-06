process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


build:
	@npm run build


codegen:
	@npx squid-typeorm-codegen


typegen: moonbeamVersions.json
	@npx squid-substrate-typegen typegen.json


moonbeamVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://wss.api.moonriver.moonbeam.network \
		--archive https://moonriver-beta.indexer.gc.subsquid.io/v4/graphql \
		--out moonbeamVersions.json


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve start codegen migration migrate up down
