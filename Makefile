all:
	tsc -t 'ES2016' footnotes.ts
	parcel build main.js --no-source-maps
