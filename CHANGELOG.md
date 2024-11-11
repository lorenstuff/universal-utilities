# Changelog
## 3.3.0
Added new functions:

* NetworkLib
	* `isEmptyBodyStatusCode`
	* `isRedirectStatusCode`
* StringLib
	* `encodeHTML`

## 3.2.0
Added new functions:

* NumberLib
	* `format`

## 3.1.1
Added missing `CountryLib` export.

## 3.1.0
Added new functions:

* CountryLib (NEW)
	* `isEurope`
* StringLib
	* `formatBytes`
	* `formatSeconds`
* UrlLib
	* `getFontAwesomeIconName`


## 3.0.0
Rewrote the package into several categorized libraries and moved all the existing functions into these libraries:

* ArrayLib
	* `splitArrayIntoChunks` -> `splitIntoChunks`
* CurrencyLib
	* `formatCentsAsUsd`
	* `formatDollarsAsUsd`
* NetworkLib
	* `heartbeat`
	* `isLocalIpAddress` -> `isLocal`
* NumberLib
	* `clampNumber` -> `clamp`
	* `generateRandomInteger` -> `randomInteger`
	* `roundNumberDownToNearest` -> `roundDownToNearest`
	* `roundNumberToNearest` -> `roundToNearest`
	* `roundNumberUpToNearest` -> `roundUpToNearest`
* SqlLib
	* `escapeSqlLikeString` -> `escapeLikeString`
* StringLib
	* `padStringWithNull` -> `padNull`
	* `generateRandomString` -> `randomString`
	* `splitStringIntoChunks` -> `splitIntoChunks`
	* `trimNullFromString` -> `trimNull`
* UrlLib
	* `getUrlLocationHeader` -> `getLocationHeader`
	* `getUrlRedirectChain` -> `getRedirectChain`

The following functions were also removed entirely:

* `isValidUrl`
* `stringReplaceAllAsync`

## 2.3.1
Fixing `splitArrayIntoChunks` export.

## 2.3.0

* Updated TypeScript.
* Replaced TypeScript config with @donutteam/typescript-config
* Added `splitArrayIntoChunks` function.

## 2.2.2
Fixed `clampNumber` being named incorrectly.

## 2.2.1
Fixed `getUrlRedirectChain` being named incorrectly.

## 2.2.0

* Added `isValidUrl` function.
* Added `noHeadRequestDomains` array.
* Added `getUrlLocationHeader` function.
* Added `getUrlRedirectChain` function.

## 2.1.0

* Added `usdFormatter` instance.
* Added `formatCentsAsUsd` function.
* Added `formatDollarsAsUsd` function.
* Added `clampNumber` function.
* Added `generateRandomInteger` function.
* Added `roundNumberDownToNearest` function.
* Added `roundNumberToNearest` function.
* Added `roundNumberUpToNearest` function.

## 2.0.0

* **[Breaking Change]** Changed `heartbeatUrl` to `url` in the `HeartbeatOptions` interface.

## 1.2.0

* Added `heartbeat` function.
* Added `HeartbeatOptions` interface.

## 1.1.0

* Added `splitStringIntoChunks` function.
* Added `localIpRanges` array.
* Added `isLocalIpAddress` function.
* Added `padStringWithNull` function.
* Added `randomStringCharacters` array.
* Added `generateRandomString` function.
* Added `stringReplaceAllAsync` function.

## 1.0.0
Initial release.