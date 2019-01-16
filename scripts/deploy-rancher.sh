#!/bin/bash
yarn global add @base-cms/travis-rancher-deployer

deploy-to-rancher "nginx:alpine" manage-nginx
deploy-to-rancher "basecms/parcel-plug:${TRAVIS_TAG}" manage

deploy-to-rancher "basecms/parcel-plug:${TRAVIS_TAG}" graphql
deploy-to-rancher "basecms/parcel-plug:${TRAVIS_TAG}" delivery
