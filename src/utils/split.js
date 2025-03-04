export const splitByKeywords = (targetString, searchStrings) => {
	const regex = new RegExp(`(${searchStrings.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
	return targetString.split(regex).filter(part => part !== '')
}
