-include .env
export

TAG ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo latest)

.PHONY: deploy build logs url

deploy:
	gcloud builds submit \
		--project=$(GCP_PROJECT) \
		--config=cloudbuild.yaml \
		--substitutions _REGION=$(GCP_REGION),_SERVICE=$(SERVICE_NAME),_TAG=$(TAG)

logs:
	gcloud run services logs tail $(SERVICE_NAME) \
		--project=$(GCP_PROJECT) \
		--region=$(GCP_REGION)

url:
	gcloud run services describe $(SERVICE_NAME) \
		--project=$(GCP_PROJECT) \
		--region=$(GCP_REGION) \
		--format='value(status.url)'
