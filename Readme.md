# Malanka [![Build Status](https://travis-ci.org/malankajs/malanka.svg?branch=master)](https://travis-ci.org/malankajs/malanka)

## Install

    npm install --save malanka

## Quick start

To quick start you can use [Malanka Skeleton](https://github.com/malankajs/malanka-skeleton). 
It is already configured to server side rendering

## Basics

Malanka is full stack framework with [handlebars](https://github.com/wycats/handlebars.js/) like template engine.
It is compile into virtual dom with output to string or DOM tree. Data model pretty
like to [backbone](https://github.com/jashkenas/backbone), but with data streams like in
[baconjs](https://github.com/baconjs/bacon.js).

Then main goal of framework is to create universal components, which must render on server and client
and provide easy way to restore their state to continue work.
