//
// Utility Functions
//

export function clampNumber(value: number, minimum: number, maximum: number)
{
	return Math.min(Math.max(value, minimum), maximum);
}

export function getRandomInteger(minimum: number, maximum: number)
{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor((Math.random() * (maximum - minimum)) + minimum);
}

export function roundNumberDownToNearest(value: number, nearest: number)
{
	return Math.floor(value / nearest) * nearest;
}

export function roundNumberToNearest(value: number, nearest: number)
{
	return Math.round(value / nearest) * nearest;
}

export function roundNumberUpToNearest(value: number, nearest: number)
{
	return Math.ceil(value / nearest) * nearest;
}